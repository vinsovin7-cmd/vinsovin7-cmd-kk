import React, { useState, useEffect } from 'react';
import { RevenueNotificationEngine } from '../services/revenueNotificationEngine';

interface FloatingAirdropGiftBoxProps {
  onClaim?: (amountUsdt: number) => void;
}

export const FloatingAirdropGiftBox: React.FC<FloatingAirdropGiftBoxProps> = ({ onClaim }) => {
  const [posX, setPosX] = useState<number>(20);
  const [posY, setPosY] = useState<number>(20);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [claimedReward, setClaimedReward] = useState<number | null>(null);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Orbit / Move around the screen continuously in a dynamic pattern
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.05;
      setRotationAngle((prev) => (prev + 4) % 360);

      // Orbital ellipse trajectory that stays within screen bounds
      if (typeof window !== 'undefined') {
        const screenW = Math.max(300, window.innerWidth - 90);
        const screenH = Math.max(400, window.innerHeight - 150);

        const newX = (Math.sin(angle) * 0.4 + 0.5) * screenW;
        const newY = (Math.cos(angle * 1.3) * 0.35 + 0.5) * screenH;

        setPosX(Math.max(15, Math.min(screenW, newX)));
        setPosY(Math.max(80, Math.min(screenH, newY)));
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleTapBox = async () => {
    if (isClaiming) return;
    setIsClaiming(true);

    // Random USDT reward between $0.50 and $2.50
    const rewardUsdt = +(Math.random() * 2 + 0.50).toFixed(2);

    // Trigger device vibration
    const notifEngine = RevenueNotificationEngine.getInstance();
    notifEngine.triggerHapticVibration();
    await notifEngine.dispatchYieldAlert(`🎁 Floating Airdrop Gift Box Tap`, rewardUsdt);

    setClaimedReward(rewardUsdt);
    if (onClaim) {
      onClaim(rewardUsdt);
    }

    // Webhook dispatch to Telegram & S2S
    try {
      await fetch('/api/cinema/yield-tick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: 999,
          channelName: 'Floating Airdrop Gift Box Tap',
          grossUsd: rewardUsdt,
          masterNetUsd: rewardUsdt * 0.8,
          masterSolAddress: '5uYJ3iVSCnCTVA7Nfr25JTCmE8LPyaAziCNGi1P55DRL',
          telegramId: '7683177085'
        })
      });
    } catch (e) {
      // silent
    }

    setTimeout(() => {
      setClaimedReward(null);
      setIsClaiming(false);
    }, 2500);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleTapBox}
      style={{
        position: 'fixed',
        left: `${posX}px`,
        top: `${posY}px`,
        zIndex: 999998,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.1s ease-out',
        filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))',
        transform: `scale(${isClaiming ? 1.3 : 1})`
      }}
    >
      {/* Moving Gift Box Body */}
      <div style={{
        width: '62px',
        height: '62px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #FFD700 0%, #FF9900 50%, #EF4444 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #FFFFFF',
        boxShadow: '0 0 20px #FFD700',
        animation: 'bounce 2s infinite ease-in-out',
        position: 'relative'
      }}>
        <span style={{ fontSize: '26px' }}>🎁</span>
        <span style={{
          fontSize: '9px',
          fontWeight: '900',
          color: '#000',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '1px 4px',
          borderRadius: '4px',
          marginTop: '-2px'
        }}>
          USDT
        </span>

        {/* Orbiting Ring */}
        <div style={{
          position: 'absolute',
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          border: '2px dashed rgba(0, 240, 255, 0.8)',
          transform: `rotate(${rotationAngle}deg)`,
          pointerEvents: 'none'
        }} />
      </div>

      {/* Claimed Bubble Popup */}
      {claimedReward && (
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#10B981',
          color: '#000',
          fontWeight: '900',
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.6)',
          animation: 'bounce 0.4s ease'
        }}>
          +${claimedReward.toFixed(2)} USDT AIRDROP!
        </div>
      )}
    </div>
  );
};

export default FloatingAirdropGiftBox;
