// solana_staking/lib.rs
// Anchor Solana Smart Contract for SREYMARA High-Yield 100% 2x Staking Pool
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("SreyStaking1111111111111111111111111111111111");

#[program]
pub mod sreymara_staking {
    use super::*;

    /// 1. Initialize & Stake Funds into Vault
    pub fn stake_funds(
        ctx: Context<StakeFunds>, 
        amount: u64, 
        duration_seconds: i64
    ) -> Result<()> {
        let stake_state = &mut ctx.accounts.stake_state;
        let clock = Clock::get()?;

        stake_state.user = ctx.accounts.user.key();
        stake_state.vault = ctx.accounts.vault.key();
        stake_state.amount = amount;
        stake_state.start_time = clock.unix_timestamp;
        stake_state.duration = duration_seconds;
        stake_state.bump = ctx.bumps.stake_state;
        stake_state.is_settled = false;

        // Transfer user SPL tokens into the program vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        msg!("Staked {} tokens from user {}. Duration: {}s", amount, stake_state.user, duration_seconds);
        Ok(())
    }

    /// 2. Check Staking Maturity Period
    pub fn check_staking_period(ctx: Context<CheckPeriod>) -> Result<bool> {
        let stake_state = &ctx.accounts.stake_state;
        let clock = Clock::get()?;
        let maturity_time = stake_state.start_time + stake_state.duration;
        let is_mature = clock.unix_timestamp >= maturity_time;

        msg!("Staking Maturity Check: Current: {}, Target: {}, IsMature: {}", 
            clock.unix_timestamp, maturity_time, is_mature);
        Ok(is_mature)
    }

    /// 3. Payout 100% 2x Yield (Principal * 2) & Close Account to Recover Rent
    pub fn payout_yield(ctx: Context<PayoutYield>) -> Result<()> {
        let stake_state = &mut ctx.accounts.stake_state;
        let clock = Clock::get()?;

        require!(!stake_state.is_settled, StakingError::AlreadySettled);
        
        let maturity_time = stake_state.start_time + stake_state.duration;
        require!(clock.unix_timestamp >= maturity_time, StakingError::PeriodNotMatured);

        // 100% Yield Return (amount * 2)
        let total_payout = stake_state.amount.checked_mul(2).ok_or(StakingError::MathOverflow)?;

        // Vault seeds for PDA signing
        let user_key = stake_state.user.key();
        let bump = stake_state.bump;
        let seeds = &[
            b"stake_vault".as_ref(),
            user_key.as_ref(),
            &[bump]
        ];
        let signer_seeds = &[&seeds[..]];

        // Transfer 2x payout (Principal + 100% Yield) from vault back to user
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        token::transfer(cpi_ctx, total_payout)?;

        stake_state.is_settled = true;

        msg!("Successfully paid 2x yield of {} tokens to {}", total_payout, stake_state.user);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StakeFunds<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = 8 + StakeState::LEN,
        seeds = [b"stake_state", user.key().as_ref()],
        bump
    )]
    pub stake_state: Account<'info, StakeState>,

    /// CHECK: Program vault PDA authority
    #[account(
        seeds = [b"stake_vault", user.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        token::mint = token_mint,
        token::authority = vault
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CheckPeriod<'info> {
    pub stake_state: Account<'info, StakeState>,
}

#[derive(Accounts)]
pub struct PayoutYield<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [b"stake_state", user.key().as_ref()],
        bump = stake_state.bump,
        close = user // Close state to recover lamport rent
    )]
    pub stake_state: Account<'info, StakeState>,

    /// CHECK: Vault PDA authority
    #[account(
        seeds = [b"stake_vault", user.key().as_ref()],
        bump
    )]
    pub vault_authority: AccountInfo<'info>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StakeState {
    pub user: Pubkey,         // 32
    pub vault: Pubkey,        // 32
    pub amount: u64,          // 8
    pub start_time: i64,      // 8
    pub duration: i64,        // 8
    pub bump: u8,             // 1
    pub is_settled: bool,     // 1
}

impl StakeState {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 8 + 1 + 1;
}

#[error_code]
pub enum StakingError {
    #[msg("Staking period has not yet reached full maturity.")]
    PeriodNotMatured,
    #[msg("This staking position has already been settled and paid out.")]
    AlreadySettled,
    #[msg("Arithmetic overflow occurred during 2x yield calculation.")]
    MathOverflow,
}
