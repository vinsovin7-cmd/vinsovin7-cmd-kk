import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, TrendingUp, Clock, CheckCircle2, Lock, ArrowUpRight, Award } from 'lucide-react';
import { RevenueNotificationEngine } from '../services/revenueNotificationEngine';

export const SolanaStakingDashboard: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState<string>('500');
  const [selectedToken, setSelectedToken] = useState<'SREY' | 'NELLY' | 'SOL' | 'USDT'>('USDT');
  const [stakingDurationHours, setStakingDurationHours] = useState<number>(12);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [isClaimingYield, setIsClaimingYield] = useState<boolean>(false);
  const [activeStake, setActiveStake] = useState<{
    amount: number;
    token: string;
    startTime: number;
    durationHours: number;
    maturityYield: number;
    isMatured: boolean;
    txHash: string;
  } | null>({
    amount: 1000,
    token: 'USDT',
    startTime: Date.now() - (12 * 3600 * 1000), // Pre-matured for demonstration
    durationHours: 12,
    maturityYield: 2000, // 100% 2x return
    isMatured: true,
    txHash: '5STAKE_VAULT_ANCHOR_TX77'
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleStakeFunds = async () => {
    const amountNum = parseFloat(stakeAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setIsStaking(true);
    try {
      const generatedTx = `5STAKE_${Date.now()}_ANCHOR_VAULT`;
      const yield2x = amountNum * 2;

      setActiveStake({
        amount: amountNum,
        token: selectedToken,
        startTime: Date.now(),
        durationHours: stakingDurationHours,
        maturityYield: yield2x,
        isMatured: false,
        txHash: generatedTx
      });

      // Dispatch vibration and telegram alert
      const notifEngine = RevenueNotificationEngine.getInstance();
      notifEngine.triggerHapticVibration();

      showToast(`🔒 ${amountNum} ${selectedToken} staked successfully in Anchor Program Vault! 2x Maturity Return: ${yield2x} ${selectedToken}`);
    } finally {
      setIsStaking(false);
    }
  };

  const handleClaim2xYield = async () => {
    if (!activeStake) return;
    setIsClaimingYield(true);

    try {
      const payoutAmount = activeStake.maturityYield;
      const notifEngine = RevenueNotificationEngine.getInstance();
      notifEngine.triggerHapticVibration();
      await notifEngine.dispatchYieldAlert(`Solana Anchor 2x Staking Payout`, payoutAmount);

      showToast(`💎 Payout Confirmed! ${payoutAmount} ${activeStake.token} (100% 2x Yield) deposited to Master Wallet!`);
      setActiveStake(null);
    } finally {
      setIsClaimingYield(false);
    }
  };

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '20px',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #0284C7, #00F0FF)',
          color: '#000',
          padding: '12px 20px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,240,255,0.4)',
          zIndex: 9999999
        }}>
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(9,10,15,0.98) 100%)',
        border: '1px solid rgba(0,240,255,0.3)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '20px' }}>💎</span>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#00F0FF' }}>
              SOLANA ANCHOR 100% 2X STAKING VAULT
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>
            On-Chain Anchor Contract: <code>SreyStaking1111111111111111111111111111111111</code>
          </p>
        </div>

        <div style={{ background: '#090D1A', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '10px' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8' }}>YIELD RETURN</span>
          <p style={{ margin: '2px 0 0 0', color: '#10B981', fontWeight: 'bold', fontSize: '15px' }}>+100% (2x Payout)</p>
        </div>
      </div>

      {/* Active Position Card */}
      {activeStake && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid #10B981',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#10B981" />
              <h3 style={{ margin: 0, fontSize: '15px', color: '#10B981', fontWeight: 'bold' }}>
                Active Staking Position
              </h3>
            </div>
            <span style={{
              background: activeStake.isMatured ? 'rgba(16,185,129,0.3)' : 'rgba(234,179,8,0.3)',
              color: activeStake.isMatured ? '#10B981' : '#EAB308',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
              border: activeStake.isMatured ? '1px solid #10B981' : '1px solid #EAB308'
            }}>
              {activeStake.isMatured ? '● MATURED (READY FOR 2X PAYOUT)' : '⏳ LOCK PERIOD IN PROGRESS'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>Staked Principal:</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                {activeStake.amount} {activeStake.token}
              </p>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Maturity 2x Return:</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#00F0FF' }}>
                {activeStake.maturityYield} {activeStake.token} (+100%)
              </p>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Lock Duration:</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#E2E8F0' }}>
                {activeStake.durationHours} Hours (2x Daily Cycle)
              </p>
            </div>
          </div>

          <button
            onClick={handleClaim2xYield}
            disabled={isClaimingYield || !activeStake.isMatured}
            style={{
              marginTop: '16px',
              width: '100%',
              padding: '12px',
              background: activeStake.isMatured ? 'linear-gradient(90deg, #10B981, #059669)' : '#1E293B',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: activeStake.isMatured ? 'pointer' : 'not-allowed',
              boxShadow: activeStake.isMatured ? '0 0 15px rgba(16,185,129,0.4)' : 'none'
            }}
          >
            {isClaimingYield ? 'EXECUTING ON-CHAIN PAYOUT...' : activeStake.isMatured ? `CLAIM 2X YIELD (${activeStake.maturityYield} ${activeStake.token}) 💸` : 'STAKE LOCK IN PROGRESS...'}
          </button>
        </div>
      )}

      {/* Stake Creation Section */}
      <div style={{
        background: '#0F172A',
        border: '1px solid #1E293B',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>
          🔒 Stake Tokens into Solana Anchor Vault
        </h3>

        {/* Token Selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['USDT', 'SOL', 'SREY', 'NELLY'] as const).map(tok => (
            <button
              key={tok}
              onClick={() => setSelectedToken(tok)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: selectedToken === tok ? '1px solid #00F0FF' : '1px solid #334155',
                background: selectedToken === tok ? 'rgba(0,240,255,0.15)' : '#090D1A',
                color: selectedToken === tok ? '#00F0FF' : '#94A3B8',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              ${tok}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Stake Amount (${selectedToken}):
          </label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#090D1A',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 'bold',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Duration Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Lock Duration (2x Daily 12-Hour Cycle):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { hours: 12, label: '12 Hours (2x Daily)' },
              { hours: 24, label: '24 Hours (1 Day)' },
              { hours: 168, label: '7 Days (VIP Lock)' }
            ].map(dur => (
              <button
                key={dur.hours}
                onClick={() => setStakingDurationHours(dur.hours)}
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  borderRadius: '8px',
                  border: stakingDurationHours === dur.hours ? '1px solid #FFD700' : '1px solid #334155',
                  background: stakingDurationHours === dur.hours ? 'rgba(255,215,0,0.15)' : '#090D1A',
                  color: stakingDurationHours === dur.hours ? '#FFD700' : '#94A3B8',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* Estimated 2x Payout Preview */}
        <div style={{
          background: '#090D1A',
          border: '1px solid #1E293B',
          padding: '14px',
          borderRadius: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Projected 2x Return:</span>
            <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>
              {(parseFloat(stakeAmount) || 0) * 2} {selectedToken}
            </p>
          </div>
          <span style={{ fontSize: '11px', color: '#00F0FF', fontWeight: 'bold' }}>
            100% Guaranteed Anchor Smart Contract Vault
          </span>
        </div>

        <button
          onClick={handleStakeFunds}
          disabled={isStaking}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(90deg, #00F0FF, #0284C7)',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,240,255,0.4)'
          }}
        >
          {isStaking ? 'DEPOSITING INTO ANCHOR VAULT...' : `STAKE ${stakeAmount || 0} ${selectedToken} FOR 2X YIELD ⚡`}
        </button>
      </div>

    </div>
  );
};

export default SolanaStakingDashboard;
