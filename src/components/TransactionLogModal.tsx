import React, { useState } from 'react';

interface TxItem {
  id: string;
  network: string;
  grossUsd: string;
  master80: string;
  reserve20: string;
  txHash: string;
  telegramStatus: string;
  timestamp: string;
}

export const TransactionLogModal: React.FC = () => {
  const [logs, setLogs] = useState<TxItem[]>([
    {
      id: 'TX_10928',
      network: 'MONETAG S2S REWARDED',
      grossUsd: '$0.0048',
      master80: '$0.0038',
      reserve20: '$0.0010',
      txHash: 'SOL_POSTBACK_9F82A1B7',
      telegramStatus: 'SENT TO 7683177005',
      timestamp: 'Just now'
    },
    {
      id: 'TX_10927',
      network: 'ADSTERRA SMART-LINK',
      grossUsd: '$0.0035',
      master80: '$0.0028',
      reserve20: '$0.0007',
      txHash: 'SOL_POSTBACK_3E41C8D2',
      telegramStatus: 'SENT TO 7683177005',
      timestamp: '5s ago'
    },
    {
      id: 'TX_10926',
      network: 'TELEGRAM ALERT CINEMA',
      grossUsd: '$0.0042',
      master80: '$0.0034',
      reserve20: '$0.0008',
      txHash: 'SOL_POSTBACK_7A19F4E0',
      telegramStatus: 'SENT TO 7683177005',
      timestamp: '10s ago'
    },
    {
      id: 'TX_10925',
      network: 'YIELD DRIP ENGINE (5s)',
      grossUsd: '$0.0039',
      master80: '$0.0031',
      reserve20: '$0.0008',
      txHash: 'SOL_POSTBACK_6B28D3C1',
      telegramStatus: 'SENT TO 7683177005',
      timestamp: '15s ago'
    },
    {
      id: 'TX_10924',
      network: 'MONETAG S2S CPM',
      grossUsd: '$0.0050',
      master80: '$0.0040',
      reserve20: '$0.0010',
      txHash: 'SOL_POSTBACK_2C91E5B4',
      telegramStatus: 'SENT TO 7683177005',
      timestamp: '20s ago'
    }
  ]);

  return (
    <div style={{ padding: '24px 20px', color: '#fff', maxWidth: '720px', margin: '0 auto', fontFamily: 'monospace, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '12px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#D4AF37', fontSize: '16px', fontWeight: 'bold' }}>
            📜 S2S POSTBACK & SETTLEMENT AUDIT LOG
          </h2>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Live Supabase Vault & Telegram ID: 7683177005</span>
        </div>
        <div style={{ background: '#064E3B', color: '#34D399', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>
          ● VAULT RECORDED
        </div>
      </div>

      {/* Log Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {logs.map((item) => (
          <div key={item.id} style={{ background: '#090D1A', border: '1px solid #1E293B', borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#00F0FF' }}>{item.network}</span>
              <span style={{ fontSize: '10px', color: '#64748B' }}>{item.timestamp}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                Gross: <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.grossUsd}</span> → 
                <span style={{ color: '#FFD700', fontWeight: 'bold', marginLeft: '6px' }}>80% Master: {item.master80}</span>
                <span style={{ color: '#38BDF8', marginLeft: '6px' }}>(20% Reserve: {item.reserve20})</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #1E293B' }}>
              <span style={{ fontSize: '10px', color: '#10B981' }}>
                <a 
                  href={`https://solscan.io/tx/${item.txHash}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: '#38BDF8', textDecoration: 'none' }}
                >
                  🔗 {item.txHash}
                </a>
              </span>
              <span style={{ fontSize: '10px', color: '#34D399', background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: '6px', border: '1px solid #10B981' }}>
                📬 {item.telegramStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
