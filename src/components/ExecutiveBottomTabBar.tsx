import React, { useState, useEffect } from 'react';

interface ExecutiveBottomTabBarProps {
  currentTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const ExecutiveBottomTabBar: React.FC<ExecutiveBottomTabBarProps> = ({ currentTab = 'dashboard', onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(currentTab);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  useEffect(() => {
    // Force full-screen Telegram Mini App viewport expansion
    try {
      if ((window as any).Telegram?.WebApp) {
        (window as any).Telegram.WebApp.ready();
        (window as any).Telegram.WebApp.expand();
      }
    } catch (e) {
      console.warn('Telegram WebApp expansion exception:', e);
    }
  }, []);

  const navigateToTab = (tabId: string, path: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
    window.location.hash = path;
  };

  const navItems = [
    { id: 'dashboard', label: 'HUB', icon: '👑', color: '#D4AF37', path: '#/' },
    { id: 'browser', label: 'BROWSER', icon: '🛡️', color: '#10B981', path: '#/browser' },
    { id: 'staking', label: 'STAKE 2X', icon: '💎', color: '#00F0FF', path: '#/staking' },
    { id: 'cinema', label: 'CINEMA', icon: '🎬', color: '#FFD700', path: '#/cinema' },
    { id: 'safepot', label: 'SAFE POT', icon: '💎', color: '#00F0FF', path: '#/safepot' },
    { id: 'ticker', label: 'TICKER', icon: '📈', color: '#FFD700', path: '#/ticker' },
    { id: 'balance_sync', label: 'SYNC', icon: '🔄', color: '#00F0FF', path: '#/balance-sync' },
    { id: 'yield_drip', label: 'DRIP', icon: '💧', color: '#10B981', path: '#/yield-drip' },
    { id: 'tx_logs', label: 'TX LOGS', icon: '📜', color: '#A78BFA', path: '#/tx-logs' },
    { id: 'wallet', label: 'PAYOUT', icon: '💳', color: '#10B981', path: '#/wallet' },
    { id: 'suite', label: 'SUITE', icon: '💬', color: '#FF007F', path: '#/tg' },
    { id: 'sirimira', label: 'SIRIMIRA', icon: '🌸', color: '#EC4899', path: '#/sirimira' },
    { id: 'shorts', label: 'SHORTS', icon: '📱', color: '#F43F5E', path: '#/shorts' },
    { id: 'profile', label: 'PROFILE', icon: '👤', color: '#38BDF8', path: '#/profile' },
    { id: 'settings', label: 'KEYS', icon: '🔑', color: '#EAB308', path: '#/settings' },
    { id: 'admin', label: 'COMMAND', icon: '⚡', color: '#00FF00', path: '#/admin/command-center' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70px',
      background: 'rgba(5, 5, 8, 0.98)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(212, 175, 55, 0.4)',
      zIndex: 99999,
      paddingBottom: 'env(safe-area-inset-bottom)',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
      
      <div className="horizontal-scroll-container" style={{
        display: 'flex',
        minWidth: '100%',
        alignItems: 'center',
        padding: '0 10px',
        gap: '6px'
      }}>
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateToTab(item.id, item.path)}
              style={{
                background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                border: isSelected ? `1px solid ${item.color}44` : '1px solid transparent',
                borderRadius: '8px',
                padding: '4px 8px',
                color: isSelected ? item.color : '#888',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                minWidth: '60px',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '18px', transform: isSelected ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.2s' }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: '8.5px',
                fontWeight: 'bold',
                marginTop: '2px',
                color: isSelected ? item.color : '#777',
                letterSpacing: '0.5px'
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
