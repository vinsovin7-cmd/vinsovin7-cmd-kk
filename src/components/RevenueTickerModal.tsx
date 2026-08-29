import React, { useState, useEffect } from 'react';

export const RevenueTickerModal: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(1485.50);
  const [dripVelocity, setDripVelocity] = useState<number>(0.0035);
  const [todayYield, setTodayYield] = useState<number>(48.24);
  const [streamVelocity, setStreamVelocity] = useState<string>('$0.0020 - $0.0050 / 5s');
  const [walletStatus, setWalletStatus] = useState<string>('ONLINE & ACTIVE');

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = +(0.0020 + Math.random() * 0.0030).toFixed(4);
      setDripVelocity(delta);
      setTotalRevenue(prev => +(prev + delta).toFixed(4));
      setTodayYield(prev => +(prev + delta).toFixed(4));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '24px 20px', color: '#fff', maxWidth: '720px', margin: '0 auto', fontFamily: 'monospace, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(5,8,17,0.95))',
        border: '1px solid #D4AF37',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 32px rgba(212,175,55,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '1px' }}>⚡ REAL-TIME REVENUE TICKER</span>
            <h1 style={{ margin: '6px 0 0 0', fontSize: '32px', color: '#FFD700', fontWeight: 'bold' }}>
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
            </h1>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Cumulative Global Ecosystem Revenue</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: '#064E3B', color: '#34D399', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', display: 'inline-block' }}>
              ● LIVE STREAMING
            </div>
            <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '6px', fontWeight: 'bold' }}>
              +80% TO MASTER WALLET
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        
        <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>DRIP VELOCITY (5s TICK)</div>
          <div style={{ fontSize: '20px', color: '#34D399', fontWeight: 'bold', margin: '4px 0' }}>
            +${dripVelocity.toFixed(4)} <span style={{ fontSize: '11px', color: '#64748B' }}>USD</span>
          </div>
          <div style={{ fontSize: '10px', color: '#00F0FF' }}>Range: {streamVelocity}</div>
        </div>

        <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>TODAY'S ACCRUED YIELD</div>
          <div style={{ fontSize: '20px', color: '#F59E0B', fontWeight: 'bold', margin: '4px 0' }}>
            +${todayYield.toFixed(2)} <span style={{ fontSize: '11px', color: '#64748B' }}>USD</span>
          </div>
          <div style={{ fontSize: '10px', color: '#A7F3D0' }}>Morning-to-Night Continuous</div>
        </div>

        <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>MASTER WALLET STATE</div>
          <div style={{ fontSize: '16px', color: '#38BDF8', fontWeight: 'bold', margin: '6px 0', wordBreak: 'break-all' }}>
            5uYJ3i...55DRL
          </div>
          <div style={{ fontSize: '10px', color: '#10B981' }}>● {walletStatus}</div>
        </div>

      </div>

      {/* Pipeline Split Breakdown */}
      <div style={{ background: '#070A14', border: '1px solid #1E293B', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#D4AF37', fontWeight: 'bold' }}>
          👑 REVENUE STREAM DISTRIBUTION (80/20 DUAL-VAULT)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#0A0F24', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#FFD700', fontSize: '12px' }}>80% Master Solana Settlement</div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>Monetag, Adsterra, Cinema Earnings</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#34D399', fontSize: '14px' }}>
              ${(totalRevenue * 0.8).toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#0A0F24', borderRadius: '8px', border: '1px solid rgba(56,189,248,0.2)' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#38BDF8', fontSize: '12px' }}>20% System Liquidity Reserve</div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>Supabase Vault Auto-Rebalancing</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#93C5FD', fontSize: '14px' }}>
              ${(totalRevenue * 0.2).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
