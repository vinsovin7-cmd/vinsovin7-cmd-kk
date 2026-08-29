export interface YieldNotification {
  id: string;
  title: string;
  message: string;
  grossAmount: number;
  adminShare: number;
  userShare: number;
  timestamp: string;
}

export class RevenueNotificationEngine {
  private static instance: RevenueNotificationEngine;

  private constructor() {}

  public static getInstance(): RevenueNotificationEngine {
    if (!RevenueNotificationEngine.instance) {
      RevenueNotificationEngine.instance = new RevenueNotificationEngine();
    }
    return RevenueNotificationEngine.instance;
  }

  /**
   * Triggers device vibration and displays floating revenue alert
   */
  public triggerHapticVibration() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      // Custom double-pulse vibration pattern: 200ms vibe, 100ms pause, 200ms vibe, 100ms pause, 300ms vibe
      try {
        navigator.vibrate([200, 100, 200, 100, 300]);
      } catch (e) {
        // Fallback for environments where vibrate is restricted
      }
    }
  }

  /**
   * Dispatches live notification to UI and sound/haptics
   */
  public async dispatchYieldAlert(
    eventName: string = "Linus AI Mail.com Activity",
    grossAmount: number = 1.0000
  ): Promise<YieldNotification> {
    const adminVault = +(grossAmount * 0.80).toFixed(4);
    const userPool = +(grossAmount * 0.20).toFixed(4);

    // 1. Trigger Mobile / Haptic Vibration
    this.triggerHapticVibration();

    // 2. Format In-App Payload
    const notification: YieldNotification = {
      id: `notif_${Date.now()}`,
      title: "🚀 [SREYMARA LIVE YIELD ALERT]",
      message: `Event: ${eventName} | Dual Gross: $${grossAmount.toFixed(4)} (Admin: $${adminVault.toFixed(4)}, User: $${userPool.toFixed(4)})`,
      grossAmount,
      adminShare: adminVault,
      userShare: userPool,
      timestamp: new Date().toLocaleTimeString()
    };

    // 3. Dispatch to Render Backend for Telegram Broadcast
    try {
      await fetch('/api/notifications/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      });
    } catch (err) {
      // Fallback
    }

    return notification;
  }
}
