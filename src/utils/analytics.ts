// Analytics and tracking utilities
export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export class AnalyticsManager {
  private isInitialized = false;

  // Initialize Google Analytics 4
  initializeGA4(measurementId: string) {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href
    });

    this.isInitialized = true;
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters
    });
  }

  // Track page views
  trackPageView(path: string, title: string) {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title
    });
  }

  // Track appointment submissions
  trackAppointmentSubmission(service: string, source: string = 'website') {
    this.trackEvent({
      event: 'appointment_submission',
      category: 'engagement',
      label: service,
      customParameters: {
        service_type: service,
        source: source
      }
    });
  }

  // Track service interest
  trackServiceInterest(service: string) {
    this.trackEvent({
      event: 'service_interest',
      category: 'engagement',
      label: service,
      customParameters: {
        service_type: service
      }
    });
  }

  // Track AI consultant usage
  trackAIConsultantUsage(action: 'open' | 'message_sent' | 'recommendation_received') {
    this.trackEvent({
      event: 'ai_consultant_interaction',
      category: 'engagement',
      label: action,
      customParameters: {
        interaction_type: action
      }
    });
  }
}

// Global analytics instance
export const analytics = new AnalyticsManager();

// Declare global gtag function
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}