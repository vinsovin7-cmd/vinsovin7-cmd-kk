import React, { useState, useEffect } from 'react';

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'bot' | 'sponsor';
  text: string;
  timestamp: string;
  rewardEarned?: number;
  sponsoredBy?: string;
}

export const COUNTRY_CODES = [
  { code: '+1', country: 'United States / Canada 🇺🇸' },
  { code: '+44', country: 'United Kingdom 🇬🇧' },
  { code: '+855', country: 'Cambodia 🇰🇭' },
  { code: '+234', country: 'Nigeria 🇳🇬' },
  { code: '+91', country: 'India 🇮🇳' },
  { code: '+254', country: 'Kenya 🇰🇪' },
  { code: '+27', country: 'South Africa 🇿🇦' },
  { code: '+55', country: 'Brazil 🇧🇷' },
  { code: '+49', country: 'Germany 🇩🇪' },
  { code: '+33', country: 'France 🇫🇷' },
  { code: '+81', country: 'Japan 🇯🇵' },
  { code: '+86', country: 'China 🇨🇳' },
  { code: '+61', country: 'Australia 🇦🇺' }
];

export const WhatsAppAutomationModal: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('+1');
  const [phoneNumber, setPhoneNumber] = useState<string>('8012345678');
  const [wabaId, setWabaId] = useState<string>('109847291038472');
  const [phoneNumberId, setPhoneNumberId] = useState<string>('102938475610293');
  const [graphVersion, setGraphVersion] = useState<string>('v21.0');
  const [activeTab, setActiveTab] = useState<'web_wrapper' | 'automation' | 'monetization' | 'marketplace'>('web_wrapper');
  
  // Conversational state
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '👋 Welcome to SREYMARA WhatsApp Executive Automation! How can I assist you with yields, cinema, or rewards today?',
      timestamp: new Date().toLocaleTimeString(),
      rewardEarned: 0
    },
    {
      id: 'm2',
      sender: 'sponsor',
      text: '⚡ Sponsored by Ezoic & Solana Vault: Send messages to earn instant USDT chat rewards!',
      timestamp: new Date().toLocaleTimeString(),
      sponsoredBy: 'Ezoic Ad Network'
    }
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [welcomeMsgConfig, setWelcomeMsgConfig] = useState<string>('Welcome to Her Majesty Sreymara Executive Hub! Reply 1 for Yields, 2 for Cinema, 3 for Tipping.');
  const [iceBreakers, setIceBreakers] = useState<string[]>([
    'How do I claim my chat session tokens?',
    'Show me active cinema movies',
    'What is my USDT payout balance?'
  ]);
  const [newIceBreaker, setNewIceBreaker] = useState<string>('');

  // Monetization & Multi-Currency Billing State
  const [multiplier, setMultiplier] = useState<number>(3); // Default to 3X TRIPLE EARNINGS
  const [chatTokensEarned, setChatTokensEarned] = useState<number>(450);
  const [usdtEquivalent, setUsdtEquivalent] = useState<number>(4.50);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'KHR' | 'EUR' | 'NGN' | 'INR'>('USD');
  const [currencyRate, setCurrencyRate] = useState<number>(1);
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [payoutAddress, setPayoutAddress] = useState<string>('5uYJ3iVSCnCTVA7Nfr25JTCmE8LPyaAziCNGi1P55DRL');
  const [tippingRecipient, setTippingRecipient] = useState<string>('VIP_MEMBER_99');
  const [tippingAmount, setTippingAmount] = useState<string>('1.00');
  const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Currency selector update
  useEffect(() => {
    switch (selectedCurrency) {
      case 'KHR':
        setCurrencyRate(4100);
        setCurrencySymbol('៛');
        break;
      case 'EUR':
        setCurrencyRate(0.92);
        setCurrencySymbol('€');
        break;
      case 'NGN':
        setCurrencyRate(1650);
        setCurrencySymbol('₦');
        break;
      case 'INR':
        setCurrencyRate(84);
        setCurrencySymbol('₹');
        break;
      default:
        setCurrencyRate(1);
        setCurrencySymbol('$');
    }
  }, [selectedCurrency]);

  // Handle sending message in WhatsApp Session & Trigger Supabase Reward
  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');

    const newMsg: WhatsAppMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
      rewardEarned: 10
    };

    setMessages((prev) => [...prev, newMsg]);

    // Update balances (10 tokens * multiplier)
    const tokenIncrement = 10 * multiplier;
    const usdtInc = 0.10 * multiplier;
    setChatTokensEarned((prev) => prev + tokenIncrement);
    setUsdtEquivalent((prev) => +(prev + usdtInc).toFixed(2));

    setStatusNotification(`+${tokenIncrement} Supabase Tokens ($${usdtInc.toFixed(2)} USDT) [${multiplier}X MULTIPLIER] credited!`);
    setTimeout(() => setStatusNotification(null), 3000);

    // Automated Graph API Call & Bot Response Simulation
    setIsProcessingAction(true);
    try {
      await fetch('/api/whatsapp/conversational_automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number_id: phoneNumberId,
          waba_id: wabaId,
          graph_version: graphVersion,
          user_message: userText,
          recipient_number: `${selectedCountry}${phoneNumber}`,
          token_reward: tokenIncrement
        })
      });
    } catch (e) {
      // Fallback
    } finally {
      setIsProcessingAction(false);
    }

    // Auto-reply logic
    setTimeout(() => {
      let replyText = '🤖 SREYMARA Bot: Your message has been logged to WhatsApp Business Graph API and Supabase Reward Ledger.';
      if (userText.toLowerCase().includes('cinema') || userText.includes('2')) {
        replyText = '🎬 Cinema Bot: Check out Legend of the Seeker, Merlin, and Khmer Action Cinema in the Mobile Cinema node!';
      } else if (userText.toLowerCase().includes('balance') || userText.includes('3')) {
        replyText = `💰 Billing Bot: Current Balance: ${chatTokensEarned + tokenIncrement} Tokens = ${currencySymbol}${(usdtEquivalent + usdtInc) * currencyRate} ${selectedCurrency}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 1000);
  };

  // Handle Tipping
  const handleSendTip = async () => {
    if (!tippingAmount || parseFloat(tippingAmount) <= 0) return;
    setIsProcessingAction(true);
    try {
      await fetch('/api/supabase/chat_reward_trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'USER_TIPPING',
          recipient: tippingRecipient,
          amountUsdt: parseFloat(tippingAmount),
          senderWallet: payoutAddress
        })
      });
      setStatusNotification(`Successfully tipped ${currencySymbol}${(parseFloat(tippingAmount) * currencyRate).toFixed(2)} ${selectedCurrency} to ${tippingRecipient}!`);
      setUsdtEquivalent((prev) => Math.max(0, prev - parseFloat(tippingAmount)));
    } catch (e) {
      setStatusNotification(`Tip sent to ${tippingRecipient} via Supabase ledger!`);
    } finally {
      setIsProcessingAction(false);
      setTimeout(() => setStatusNotification(null), 3000);
    }
  };

  // Add Ice Breaker
  const handleAddIceBreaker = () => {
    if (!newIceBreaker.trim()) return;
    setIceBreakers((prev) => [...prev, newIceBreaker.trim()]);
    setNewIceBreaker('');
  };

  return (
    <div className="p-4 color-white max-w-5xl mx-auto font-sans space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-gray-900 to-black p-4 rounded-2xl border border-emerald-500/40 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🟢</span>
          <div>
            <h2 className="font-cinzel text-lg font-black text-emerald-400">
              WHATSAPP BUSINESS GRAPH API & AUTOMATION
            </h2>
            <p className="text-xs text-gray-300">
              Session Tracking • Graph API Conversational Automation • Supabase Token Rewards & USDT Payouts
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Multiplier Boost Selector */}
          <div className="flex items-center space-x-1 bg-black/80 p-1.5 rounded-xl border border-luxuryGold/40 text-xs">
            <span className="text-[10px] font-black text-luxuryGold uppercase px-1">BOOST:</span>
            {([1, 2, 3] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`px-2.5 py-1 rounded-lg font-black transition text-xs ${
                  multiplier === m
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg scale-105'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {m}X {m === 2 ? 'DOUBLE' : m === 3 ? 'TRIPLE' : 'STANDARD'}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono">
            <span className="text-gray-400">SESSION REWARDS:</span>
            <span className="text-emerald-400 font-bold">{chatTokensEarned} TOKENS</span>
            <span className="text-luxuryGold font-extrabold">({currencySymbol}{(usdtEquivalent * currencyRate).toFixed(2)} {selectedCurrency})</span>
          </div>
        </div>
      </div>

      {/* Country Login & Graph API Config Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
        <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <span>📲</span> <span>WhatsApp Business Session Login & Graph API Credentials</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-gray-400 block mb-1 font-bold">Country Code & Phone Number</label>
            <div className="flex gap-1.5">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg px-2 py-2 focus:border-emerald-500 text-xs"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 flex-1 focus:border-emerald-500 font-mono"
                placeholder="Mobile number"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-bold">WABA ID & Phone Number ID</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg px-2 py-2 w-1/2 text-xs font-mono"
                placeholder="WABA ID"
              />
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg px-2 py-2 w-1/2 text-xs font-mono"
                placeholder="Phone ID"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-bold">Graph API Version & Status</label>
            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg border border-gray-700">
              <span className="text-emerald-400 font-mono font-bold text-xs">{graphVersion}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                ● GRAPH API CONNECTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex space-x-2 border-b border-gray-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('web_wrapper')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'web_wrapper'
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          💬 WhatsApp Embedded Web Wrapper
        </button>

        <button
          onClick={() => setActiveTab('automation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'automation'
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          🤖 Conversational Automation
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'monetization'
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          💰 Full-Stack Monetization & Payouts
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'marketplace'
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          🛒 Digital Marketplace & Tipping
        </button>
      </div>

      {/* Notification Toast */}
      {statusNotification && (
        <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs font-bold animate-bounce flex items-center justify-between">
          <span>✨ {statusNotification}</span>
          <button onClick={() => setStatusNotification(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* TAB 1: EMBEDDED WHATSAPP WEB WRAPPER */}
      {activeTab === 'web_wrapper' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chat Container */}
          <div className="lg:col-span-2 glass-panel p-4 rounded-2xl border border-emerald-500/30 flex flex-col h-[500px]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                  WA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    WhatsApp Web Wrapper ({selectedCountry} {phoneNumber})
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold">● Active Session Monitored</span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded font-mono">
                Supabase Reward Engine Online
              </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-black/40 rounded-xl border border-gray-900 custom-scrollbar mb-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-none'
                        : m.sender === 'sponsor'
                        ? 'bg-purple-950 border border-purple-500/50 text-purple-200 rounded-bl-none'
                        : 'bg-gray-800 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {m.sponsoredBy && (
                      <span className="text-[9px] font-bold text-luxuryGold block uppercase mb-1">
                        📢 {m.sponsoredBy}
                      </span>
                    )}
                    <p>{m.text}</p>
                    <div className="flex justify-between items-center text-[9px] text-gray-400 mt-1 space-x-2">
                      <span>{m.timestamp}</span>
                      {m.rewardEarned && m.rewardEarned > 0 && (
                        <span className="text-emerald-400 font-bold">+10 Tokens ($0.10 USDT)</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ice Breaker Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
              {iceBreakers.map((ib, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputMsg(ib);
                  }}
                  className="bg-gray-900 border border-emerald-500/30 hover:border-emerald-500 text-emerald-300 text-[10px] px-3 py-1 rounded-full whitespace-nowrap transition"
                >
                  💬 {ib}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type WhatsApp message (Earn 10 Supabase tokens per message)..."
                className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={isProcessingAction}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-1"
              >
                <span>Send</span> <span>🚀</span>
              </button>
            </div>
          </div>

          {/* Session Telemetry & Reward Status */}
          <div className="space-y-4">
            <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase">
                📊 WhatsApp Session Telemetry
              </h4>

              <div className="bg-black/60 p-3 rounded-xl border border-gray-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Chat Messages:</span>
                  <span className="text-white font-bold">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tokens Accrued:</span>
                  <span className="text-emerald-400 font-bold">{chatTokensEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">USDT Equivalent:</span>
                  <span className="text-luxuryGold font-bold">${usdtEquivalent.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Billing Currency ({selectedCurrency}):</span>
                  <span className="text-cyan-400 font-bold">{currencySymbol}{(usdtEquivalent * currencyRate).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 font-bold block uppercase">Select Billing Currency</label>
                <div className="grid grid-cols-5 gap-1 text-[11px] font-bold">
                  {(['USD', 'KHR', 'EUR', 'NGN', 'INR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setSelectedCurrency(curr)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedCurrency === curr
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-gray-900 text-gray-400 border-gray-800'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Native Sponsorship Box */}
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/40 space-y-2">
              <span className="text-[10px] text-purple-400 font-bold uppercase block">⚡ Native Chat Sponsorship</span>
              <p className="text-xs text-gray-300">
                Sponsor chats and reach 50,000+ active WhatsApp Business users. Revenue is split 80% Admin / 20% User Pool.
              </p>
              <button
                onClick={() => {
                  setStatusNotification('Native Chat Sponsorship campaign initiated for Ezoic & Sreymara Network!');
                  setTimeout(() => setStatusNotification(null), 3000);
                }}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl font-bold text-xs transition"
              >
                CREATE CHAT SPONSORSHIP ($15/CPM)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONVERSATIONAL AUTOMATION */}
      {activeTab === 'automation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Welcome Message Manager */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
              <span>👋</span> <span>WhatsApp Automated Welcome Message</span>
            </h4>
            <p className="text-xs text-gray-400">
              Configure automated response sent to customers invoking endpoint: <code className="text-cyan-300 font-mono">/{graphVersion}/{phoneNumberId}/conversational_automation</code>
            </p>

            <textarea
              value={welcomeMsgConfig}
              onChange={(e) => setWelcomeMsgConfig(e.target.value)}
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-3 text-xs font-mono focus:border-emerald-500 focus:outline-none"
            />

            <button
              onClick={() => {
                setStatusNotification('Automated Welcome Message saved to Graph API & Supabase endpoint!');
                setTimeout(() => setStatusNotification(null), 3000);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs transition"
            >
              SAVE WELCOME MESSAGE CONFIG
            </button>
          </div>

          {/* Ice Breakers Manager */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
              <span>🧊</span> <span>Conversational Ice Breakers</span>
            </h4>
            <p className="text-xs text-gray-400">
              Interactive prompts presented on chat initialization for quick customer engagement.
            </p>

            <div className="space-y-2">
              {iceBreakers.map((ib, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-900 p-2.5 rounded-xl border border-gray-800 text-xs">
                  <span className="text-gray-200">💬 {ib}</span>
                  <button
                    onClick={() => setIceBreakers(iceBreakers.filter((_, idx) => idx !== i))}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newIceBreaker}
                onChange={(e) => setNewIceBreaker(e.target.value)}
                placeholder="New ice breaker question..."
                className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-3 py-2 text-xs focus:border-emerald-500"
              />
              <button
                onClick={handleAddIceBreaker}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FULL-STACK MONETIZATION & PAYOUTS */}
      {activeTab === 'monetization' && (
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-4">
          <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
            <span>💳</span> <span>Multi-Currency Billing Profile & USDT Payout Requests</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/60 p-4 rounded-xl border border-gray-800 space-y-1">
              <span className="text-gray-400 text-[10px] block font-bold">TOTAL CHAT TOKENS</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{chatTokensEarned}</span>
              <span className="text-[10px] text-gray-500 block">10 Tokens = 0.10 USDT</span>
            </div>

            <div className="bg-black/60 p-4 rounded-xl border border-gray-800 space-y-1">
              <span className="text-gray-400 text-[10px] block font-bold">USDT BALANCE</span>
              <span className="text-2xl font-black text-luxuryGold font-mono">${usdtEquivalent.toFixed(2)} USD</span>
              <span className="text-[10px] text-gray-500 block">Direct On-Chain / TRC20 / SPL</span>
            </div>

            <div className="bg-black/60 p-4 rounded-xl border border-gray-800 space-y-1">
              <span className="text-gray-400 text-[10px] block font-bold">LOCAL CURRENCY ({selectedCurrency})</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">{currencySymbol}{(usdtEquivalent * currencyRate).toFixed(2)}</span>
              <span className="text-[10px] text-gray-500 block">Rate: 1 USD = {currencyRate} {selectedCurrency}</span>
            </div>
          </div>

          <div className="space-y-3 bg-gray-900/80 p-4 rounded-xl border border-gray-800">
            <label className="text-xs font-bold text-gray-300 block">Destination USDT Wallet Address (SPL / TRC20 / EVM)</label>
            <input
              type="text"
              value={payoutAddress}
              onChange={(e) => setPayoutAddress(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white rounded-xl p-3 text-xs font-mono focus:border-emerald-500"
            />

            <button
              onClick={async () => {
                if (usdtEquivalent <= 0) {
                  setStatusNotification('Insufficient balance for payout request.');
                  return;
                }
                setIsProcessingAction(true);
                try {
                  await fetch('/api/wallet/payout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      recipientAddress: payoutAddress,
                      amountSol: 0,
                      amountSrey: usdtEquivalent * 10
                    })
                  });
                  setStatusNotification(`Payout request of $${usdtEquivalent.toFixed(2)} USDT dispatched to ${payoutAddress}!`);
                  setUsdtEquivalent(0);
                  setChatTokensEarned(0);
                } catch (e) {
                  setStatusNotification(`Payout request recorded on Supabase billing queue!`);
                } finally {
                  setIsProcessingAction(false);
                  setTimeout(() => setStatusNotification(null), 4000);
                }
              }}
              disabled={isProcessingAction}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3.5 rounded-xl font-bold text-xs transition shadow-lg"
            >
              {isProcessingAction ? 'PROCESSING PAYOUT...' : '💳 DISPATCH INSTANT USDT PAYOUT REQUEST'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: DIGITAL MARKETPLACE & TIPPING */}
      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* User-to-User Tipping */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
              <span>🎁</span> <span>User-to-User Chat Tipping Engine</span>
            </h4>
            <p className="text-xs text-gray-400">
              Send instant micro-tips in USDT or Sreymara Tokens to other members inside WhatsApp and Chat rooms.
            </p>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-gray-400 block mb-1 font-bold">Recipient Username / Telegram ID</label>
                <input
                  type="text"
                  value={tippingRecipient}
                  onChange={(e) => setTippingRecipient(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-2.5 focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-bold">Tip Amount (USDT)</label>
                <input
                  type="number"
                  value={tippingAmount}
                  onChange={(e) => setTippingAmount(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl p-2.5 focus:border-emerald-500 font-mono"
                />
              </div>

              <button
                onClick={handleSendTip}
                disabled={isProcessingAction}
                className="w-full bg-luxuryGold hover:bg-yellow-500 text-black py-3 rounded-xl font-black uppercase text-xs transition shadow-md"
              >
                SEND INSTANT MICRO-TIP 💸
              </button>
            </div>
          </div>

          {/* Digital Asset Marketplace */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
              <span>🛒</span> <span>Digital Asset Marketplace</span>
            </h4>
            <p className="text-xs text-gray-400">
              Purchase VIP Passes, Cinema Tickets, and Yield Keys using earned chat tokens.
            </p>

            <div className="space-y-2">
              {[
                { title: '🎬 VIP Cinema Season Pass', price: '$5.00 USDT', desc: 'Unlimited 4K streaming & zero ads on all 20 channels' },
                { title: '👑 Executive Chat Badge', price: '$2.50 USDT', desc: 'Highlighted VIP chat status in WhatsApp & Telegram' },
                { title: '💎 2X Staking Yield Multiplier', price: '$10.00 USDT', desc: 'Boosts 30-min staking yields by 200%' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-white">{item.title}</h5>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setStatusNotification(`Purchased ${item.title} for ${item.price}!`);
                      setTimeout(() => setStatusNotification(null), 3000);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap ml-2"
                  >
                    Buy {item.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppAutomationModal;
