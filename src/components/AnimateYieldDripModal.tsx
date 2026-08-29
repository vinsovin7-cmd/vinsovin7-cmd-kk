import React, { useState, useEffect } from 'react';

export const AnimateYieldDripModal: React.FC = () => {
  const [pulseCount, setPulseCount] = useState<number>(1);
  const [lastTickAmount, setLastTickAmount] = useState<number>(0.0034);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [cumulativeSession, setCumulativeSession] = useState<number>(0.0842);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = +(0.0020 + Math.random() * 0.0030).toFixed(4);
      setLastTickAmount(delta);
      setCumulativeSession(prev => +(prev + delta).toFixed(4));
      setPulseCount(c => c + 1);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '24px 20px', color: '#fff', maxWidth: '720px', margin: '0 auto', fontFamily: 'monospace, sans-serif' }}>
      
      {/* Animated Glowing Orb & Counter */}
      <div style={{
        background: 'radial-gradient(circle at center, rgba(16,185,129,0.2) 0%, rgba(5,8,17,0.95) 70%)',
        border: isPulsing ? '2px solid #FFD700' : '1px solid #10B981',
        borderRadius: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: isPulsing ? '0 0 50px rgba(255,215,0,0.5)' : '0 0 25px rgba(16,185,129,0.2)',
        transition: 'all 0.4s ease'
      }}>
        
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 16px auto',
          borderRadius: '50%',
          background: isPulsing ? 'radial-gradient(circle, #FFD700 0%, #10B981 100%)' : 'radial-gradient(circle, #10B981 0%, #064E3B 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isPulsing ? '0 0 40px #FFD700' : '0 0 20px #10B981',
          transform: isPulsing ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <span style={{ fontSize: '48px' }}>💧</span>
        </div>

        <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
          5-SECOND YIELD DRIP CYCLE
        </div>

        <div style={{ fontSize: '36px', fontWeight: 'bold', color: isPulsing ? '#FFD700' : '#34D399', margin: '8px 0', transition: 'color 0.3s ease' }}>
          +${lastTickAmount.toFixed(4)} <span style={{ fontSize: '14px', color: '#94A3B8' }}>USD</span>
        </div>

        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
          Next Yield Tick In: <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{countdown}s</span> | Completed Ticks: <span style={{ color: '#00F0FF', fontWeight: 'bold' }}>#{pulseCount}</span>
        </div>
      </div>

      {/* Real-time Session Accumulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        
        <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>SESSION ACCUMULATED</div>
          <div style={{ fontSize: '22px', color: '#FFD700', fontWeight: 'bold', marginTop: '4px' }}>
            +${cumulativeSession.toFixed(4)}
          </div>
          <div style={{ fontSize: '10px', color: '#10B981', marginTop: '2px' }}>Live in this view</div>
        </div>

        <div style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>AUTO SPLIT EXECUTION</div>
          <div style={{ fontSize: '14px', color: '#38BDF8', fontWeight: 'bold', marginTop: '6px' }}>
            80% Master / 20% Reserve
          </div>
          <div style={{ fontSize: '10px', color: '#A7F3D0', marginTop: '2px' }}>Dispatched without gas delay</div>
        </div>

      </div>

    </div>
  );
};
