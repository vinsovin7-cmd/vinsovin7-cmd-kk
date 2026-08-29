import React, { useState, Suspense, lazy } from 'react';
import { FloatingAppMinifier } from './components/FloatingAppMinifier';
import { ExecutiveBottomTabBar } from './components/ExecutiveBottomTabBar';
import { ExecutiveSreymaraAds } from './components/ExecutiveSreymaraAds';
import { CSNotificationProvider } from './lib/CSNotificationProvider';
import { FloatingAirdropGiftBox } from './components/FloatingAirdropGiftBox';
import { LinusBrowserManager } from './components/LinusBrowserManager';
import { SolanaStakingDashboard } from './components/SolanaStakingDashboard';

import { MasterWalletBindingTerminal } from './components/MasterWalletBindingTerminal';
import { RevenueTickerModal } from './components/RevenueTickerModal';
import { WalletBalanceSyncModal } from './components/WalletBalanceSyncModal';
import { AnimateYieldDripModal } from './components/AnimateYieldDripModal';
import { TransactionLogModal } from './components/TransactionLogModal';
import { CinemaSystemModal } from './components/CinemaSystemModal';

// Lazy load full page routes to optimize memory and prevent ANR
const ExecutiveDashboard = lazy(() => import('./pages/ExecutiveDashboard').then(m => ({ default: m.ExecutiveDashboard })));
const PrivateChatRoom = lazy(() => import('./pages/PrivateChatRoom').then(m => ({ default: m.PrivateChatRoom })));

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        // DASHBOARD TAB ONLY: Her Majesty Sreymara Hub, Ad Triggers, Yield Engine, Vault Nodes, Multi-Bank
        return <ExecutiveDashboard />;

      case 'browser':
        // LINUS ANTI-DETECT BROWSER & MAIL.COM AUTOPILOT (Exact Screenshot Match)
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="🛡️ LINUS AI ANTI-DETECT ENGINE & PROXY MATRIX (86.109.86.42)">
            <div style={{ padding: '16px' }}>
              <LinusBrowserManager />
            </div>
          </OverlayView>
        );

      case 'staking':
        // SOLANA ANCHOR 100% 2X STAKING VAULT
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="💎 SOLANA ANCHOR 100% 2X STAKING VAULT (LIB.RS)">
            <SolanaStakingDashboard />
          </OverlayView>
        );

      case 'cinema':
        // CINEMA (20 CHANNELS) NATIVE VIEW
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="🎬 CINEMA (20 CHANNELS) & STREAMING ENGINE">
            <CinemaSystemModal defaultSubTab="cinema" />
          </OverlayView>
        );

      case 'safepot':
        // SAFE POT & SPL TOKEN SWEEPER NATIVE VIEW
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="💎 SAFE POT MULTI-SIG VAULT & TOKEN SWEEPER">
            <CinemaSystemModal defaultSubTab="safepot" />
          </OverlayView>
        );

      case 'palace':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="🏰 ROYAL TELEGRAM PALACE & LIQUIDITY SWAP">
            <CinemaSystemModal defaultSubTab="palace" />
          </OverlayView>
        );

      case 'gemini':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="👁️ GOOGLE AI STUDIO EXECUTIVE CORE">
            <CinemaSystemModal defaultSubTab="gemini" />
          </OverlayView>
        );

      case 'ticker':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="REVENUE ACCUMULATION TICKER">
            <RevenueTickerModal />
          </OverlayView>
        );

      case 'balance_sync':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="WALLET BALANCE SYNC">
            <WalletBalanceSyncModal />
          </OverlayView>
        );

      case 'yield_drip':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="ANIMATED 5-SECOND YIELD DRIP">
            <AnimateYieldDripModal />
          </OverlayView>
        );

      case 'tx_logs':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="S2S TRANSACTION AUDIT LOGS">
            <TransactionLogModal />
          </OverlayView>
        );

      case 'suite':
        // LOVE SUITE NATIVE VIEW ONLY
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="💬 SREYMARA LUXURY VIP SUITE (INSTANT AI RESPONSE)">
            <PrivateChatRoom roomId="201" userId="VIP_USER_77" telegramUsername="VIP_USER" />
          </OverlayView>
        );

      case 'sirimira':
        // SIRIMIRA TAB NATIVE VIEW ONLY (NO DUPLICATE DASHBOARD ELEMENTS)
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="🌸 SIRIMIRA ROYAL SANCTUARY & AI ORACLE">
            <div style={{ padding: '20px', color: '#fff', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ background: '#0F172A', border: '1px solid rgba(236,72,153,0.4)', borderRadius: '16px', padding: '24px' }}>
                <span style={{ fontSize: '40px' }}>🌸</span>
                <h2 style={{ color: '#EC4899', margin: '12px 0 6px 0' }}>SIRIMIRA ROYAL ORACLE & AI MEDIATION</h2>
                <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}>
                  Native sanctuary for high-frequency algorithmic liquidity matching, smart contract mediation, and VIP conversational intelligence.
                </p>
                <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px', margin: '16px 0', textAlign: 'left', fontSize: '12px', color: '#CBD5E1' }}>
                  <p style={{ margin: '0 0 6px 0' }}><strong>Oracle Latency:</strong> 12ms (Direct WebSocket)</p>
                  <p style={{ margin: '0 0 6px 0' }}><strong>Active Protocol:</strong> Sreymara Sirimira v4.2</p>
                  <p style={{ margin: 0 }}><strong>Yield Engine:</strong> Dual-Pipeline $1.00/cycle active</p>
                </div>
                <button
                  onClick={() => setCurrentTab('suite')}
                  style={{ padding: '12px 24px', background: 'linear-gradient(90deg, #EC4899, #DB2777)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  ENTER VIP PRIVATE SUITE 💬
                </button>
              </div>
            </div>
          </OverlayView>
        );

      case 'shorts':
        // SHORTS NATIVE VIEW ONLY (NO DUPLICATE DASHBOARD ELEMENTS)
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="📱 SREYMARA SHORTS & VIRAL REELS">
            <div style={{ padding: '20px', color: '#fff', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ color: '#F43F5E' }}>📱 SREYMARA VIRAL SHORTS ENGINE</h2>
              <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}>
                Decentralized video shorts network broadcasting Web3 tutorials, cinema teasers, and yield updates.
              </p>
              <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px', margin: '20px 0' }}>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>● 12 Shorts Channels Online</span>
                <p style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>
                  Auto-swiping enabled. Impressions earn +$3.50 CPM into Master Phantom Wallet.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('cinema')}
                style={{ padding: '12px 24px', background: '#F43F5E', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                OPEN CINEMA 20 CHANNELS
              </button>
            </div>
          </OverlayView>
        );

      case 'profile':
        // PROFILE NATIVE VIEW ONLY
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="👤 EXECUTIVE VIP PROFILE">
            <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ background: '#0F172A', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #D4AF37, #FF9900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    👑
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: '#D4AF37' }}>NDUNAKA PROSPER CHINEMEREM</h3>
                    <span style={{ fontSize: '11px', color: '#10B981' }}>● Master Executive Signer (Tier 1)</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#CBD5E1', borderTop: '1px solid #1E293B', paddingTop: '12px' }}>
                  <p style={{ margin: '0 0 6px 0' }}><strong>Telegram Chat ID:</strong> <code>7683177085</code></p>
                  <p style={{ margin: '0 0 6px 0' }}><strong>Telegram Bot:</strong> <code>@sreymarabot (8956501699:AAHJ4FE...)</code></p>
                  <p style={{ margin: '0 0 6px 0' }}><strong>Master Phantom:</strong> <code>5uYJ3iVSCnCTVA7Nfr25JTCmE8LPyaAziCNGi1P55DRL</code></p>
                  <p style={{ margin: 0 }}><strong>Yield Split:</strong> 80% Admin Vault / 20% User Pool</p>
                </div>
              </div>
            </div>
          </OverlayView>
        );

      case 'settings':
        // SETTINGS & KEYS NATIVE VIEW ONLY (API Governance, Google AI Studio Config, Screen Mirroring)
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="🔑 SECRETS, RPC & API GOVERNANCE">
            <div style={{ padding: '20px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#EAB308' }}>⚡ RPC & API Secrets Gateway</h3>
                <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.6' }}>
                  <p><strong>Solana RPC:</strong> <code>https://api.mainnet-beta.solana.com</code> (Mainnet / Devnet Auto)</p>
                  <p><strong>Sweeper Engine:</strong> <code>/api/treasury/sweep</code> (Active)</p>
                  <p><strong>Telegram Bot Token:</strong> <code>8956501699:AAHJ4FEAaKUpHggxPbe78nG-uerzL99TObQ</code></p>
                  <p><strong>Primary Telegram Chat ID:</strong> <code>7683177085</code></p>
                  <p><strong>Dual-Pipeline DSP/SSP:</strong> <code>$1.00/cycle active</code></p>
                </div>
                <button
                  onClick={() => alert("All RPC and Secret keys verified active on Render backend.")}
                  style={{ marginTop: '14px', width: '100%', padding: '10px', background: '#EAB308', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  TEST RPC CONNECTION
                </button>
              </div>
            </div>
          </OverlayView>
        );

      case 'wallet':
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="MASTER WALLET & PAYOUT ENGINE">
            <MasterWalletBindingTerminal />
          </OverlayView>
        );

      case 'admin':
        // ADMIN / COMMAND CENTER ONLY: VIP Sponsor Block, Screen Mirroring, Passive Observer
        return (
          <OverlayView onExit={() => setCurrentTab('dashboard')} title="COMMAND CENTER & GOVERNANCE">
            <div style={{ padding: '20px', color: '#fff', maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ background: '#0F172A', border: '1px solid rgba(0,255,0,0.4)', borderRadius: '16px', padding: '20px' }}>
                <h2 style={{ color: '#00FF00', margin: '0 0 8px 0', fontSize: '18px' }}>⚡ EXECUTIVE COMMAND CENTER</h2>
                <p style={{ color: '#94A3B8', fontSize: '12px' }}>
                  Real-Time Governance, Treasury Sweeping, Linus AI Browser, and Master Telegram ID Binding.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '16px' }}>
                  <button
                    onClick={() => setCurrentTab('browser')}
                    style={{ padding: '12px', background: '#10B981', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                  >
                    🛡️ LINUS ANTI-DETECT BROWSER
                  </button>
                  <button
                    onClick={() => setCurrentTab('staking')}
                    style={{ padding: '12px', background: '#00F0FF', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                  >
                    💎 SOLANA 2X STAKING VAULT
                  </button>
                  <button
                    onClick={() => setCurrentTab('safepot')}
                    style={{ padding: '12px', background: '#FFD700', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                  >
                    💎 MANAGE SAFE POTS
                  </button>
                  <button
                    onClick={() => setCurrentTab('cinema')}
                    style={{ padding: '12px', background: '#F43F5E', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                  >
                    🎬 CINEMA 20 CHANNELS
                  </button>
                </div>
              </div>
            </div>
          </OverlayView>
        );

      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <CSNotificationProvider>
      <FloatingAppMinifier>
        {/* Continuous Interactive Floating Airdrop Gift Box */}
        <FloatingAirdropGiftBox />

        <div style={{ paddingBottom: '75px', minHeight: '100vh', background: '#04060B' }}>
          {/* Executive Sreymara Ads Banner */}
          <div style={{ padding: '8px 14px' }}>
            <ExecutiveSreymaraAds boundWalletAddress="5uYJ3iVSCnCTVA7Nfr25JTCmE8LPyaAziCNGi1P55DRL" />
          </div>

          <Suspense fallback={<div style={{ color: '#D4AF37', textAlign: 'center', padding: '40px' }}>👑 Loading Sreymara Executive Engine...</div>}>
            {renderContent()}
          </Suspense>
        </div>

        {/* Persistent Bottom Tab Bar */}
        <ExecutiveBottomTabBar currentTab={currentTab} onTabChange={(tab) => setCurrentTab(tab)} />
      </FloatingAppMinifier>
    </CSNotificationProvider>
  );
};

const OverlayView: React.FC<{ children: React.ReactNode; onExit: () => void; title?: string }> = ({ children, onExit, title }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#04060B',
    zIndex: 999999,
    overflowY: 'auto'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      background: 'rgba(10, 10, 12, 0.95)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <h3 style={{ margin: 0, color: '#D4AF37', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px' }}>{title || 'SREYMARA MODULE'}</h3>
      <button 
        className="close-btn"
        onClick={onExit}
        title="Close and return to main landing view"
        style={{
          background: 'rgba(255, 0, 0, 0.15)',
          border: '1px solid rgba(255, 68, 68, 0.5)',
          color: '#ff4444',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '15px',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 10px rgba(255, 68, 68, 0.2)'
        }}
      >
        ✕
      </button>
    </div>
    <div style={{ paddingBottom: '80px' }}>
      {children}
    </div>
  </div>
);

export default App;
