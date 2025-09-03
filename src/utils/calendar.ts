// Calendar integration utilities
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

export interface CalendarProvider {
  name: string;
  createEvent: (event: CalendarEvent) => Promise<string>;
  updateEvent: (eventId: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

// Google Calendar integration
export class GoogleCalendarProvider implements CalendarProvider {
  name = 'Google Calendar';
  private apiKey: string;
  private calendarId: string;

  constructor(apiKey: string, calendarId: string) {
    this.apiKey = apiKey;
    this.calendarId = calendarId;
  }

  async createEvent(event: CalendarEvent): Promise<string> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            summary: event.title,
            description: event.description,
            start: {
              dateTime: event.start,
              timeZone: 'Europe/Moscow'
            },
            end: {
              dateTime: event.end,
              timeZone: 'Europe/Moscow'
            },
            location: event.location,
            attendees: event.attendees?.map(email => ({ email }))
          })
        }
      );

      const result = await response.json();
      return result.id;
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      throw error;
    }
  }

  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<void> {
    try {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${eventId}?key=${this.apiKey}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            summary: event.title,
            description: event.description,
            start: event.start ? {
              dateTime: event.start,
              timeZone: 'Europe/Moscow'
            } : undefined,
            end: event.end ? {
              dateTime: event.end,
              timeZone: 'Europe/Moscow'
            } : undefined,
            location: event.location
          })
        }
      );
    } catch (error) {
      console.error('Failed to update calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events/${eventId}?key=${this.apiKey}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
    } catch (error) {
      console.error('Failed to delete calendar event:', error);
      throw error;
    }
  }
}

// Utility function to create appointment in calendar
export const createAppointmentEvent = async (
  provider: CalendarProvider,
  appointmentData: {
    clientName: string;
    service: string;
    phone: string;
    appointmentDateTime: string;
    duration: number; // in minutes
  }
): Promise<string> => {
  const startTime = new Date(appointmentData.appointmentDateTime);
  const endTime = new Date(startTime.getTime() + appointmentData.duration * 60000);

  const event: CalendarEvent = {
    id: `appointment_${Date.now()}`,
    title: `${appointmentData.service} - ${appointmentData.clientName}`,
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    description: `Клиент: ${appointmentData.clientName}\nТелефон: ${appointmentData.phone}\nУслуга: ${appointmentData.service}`,
    location: 'Beauty Clinic, Невский проспект, 100, Санкт-Петербург'
  };

  return await provider.createEvent(event);
};