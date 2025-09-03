export interface AppointmentData {
  name: string;
  phone: string;
  service: string;
  preferredTime: string;
  comments?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Заглушка отправки SMS — логируем и возвращаем успех
export const sendAppointmentSMS = async (
  appointmentData: AppointmentData
): Promise<SMSResponse> => {
  try {
    const clientMessage = `
Здравствуйте, ${appointmentData.name}!

Ваша заявка на процедуру "${appointmentData.service}" принята.
Предпочтительное время: ${appointmentData.preferredTime}

Мы свяжемся с вами в ближайшее время для подтверждения записи.

Beauty Clinic
+7 (812) 345-67-89
    `.trim();

    const adminMessage = `
Новая заявка на запись:

Клиент: ${appointmentData.name}
Телефон: ${appointmentData.phone}
Услуга: ${appointmentData.service}
Время: ${appointmentData.preferredTime}
Комментарии: ${appointmentData.comments || 'Нет'}

Beauty Clinic CRM
    `.trim();

    console.log('=== Отправка SMS клиенту ===');
    console.log(clientMessage);
    console.log('=== Отправка SMS администратору ===');
    console.log(adminMessage);

    // Имитируем задержку
    await new Promise((resolve) => setTimeout(resolve, 700));

    return {
      success: true,
      messageId: `static_msg_${Date.now()}`,
    };
  } catch (error) {
    console.error('Ошибка при отправке SMS:', error);
    return {
      success: false,
      error: 'Не удалось отправить SMS (статическая заглушка)',
    };
  }
};

// Заглушка отправки напоминания
export const sendReminderSMS = async (
  appointmentData: AppointmentData,
  appointmentDateTime: string
): Promise<SMSResponse> => {
  try {
    const reminderMessage = `
Напоминание о записи в Beauty Clinic

Завтра в ${appointmentDateTime}
Процедура: ${appointmentData.service}

Адрес: Невский проспект, 100
Телефон: +7 (812) 345-67-89

До встречи!
    `.trim();

    console.log('=== Отправка SMS-напоминания ===');
    console.log(reminderMessage);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      messageId: `static_reminder_${Date.now()}`,
    };
  } catch (error) {
    console.error('Ошибка при отправке напоминания:', error);
    return {
      success: false,
      error: 'Не удалось отправить SMS-напоминание (статическая заглушка)',
    };
  }
};

// // Sms.ts
// export interface AppointmentData {
//   name: string;
//   phone: string;
//   service: string;
//   preferredTime: string;
//   comments?: string;
// }

// export interface SMSResponse {
//   success: boolean;
//   messageId?: string;
//   error?: string;
// }

// // Twilio configuration (these would be environment variables in production)
// const TWILIO_CONFIG = {
//   accountSid: process.env.VITE_TWILIO_ACCOUNT_SID || 'your_account_sid',
//   authToken: process.env.VITE_TWILIO_AUTH_TOKEN || 'your_auth_token',
//   fromNumber: process.env.VITE_TWILIO_PHONE_NUMBER || '+1234567890',
//   adminNumber: process.env.VITE_ADMIN_PHONE_NUMBER || '+78123456789',
// };

// export const sendAppointmentSMS = async (
//   appointmentData: AppointmentData
// ): Promise<SMSResponse> => {
//   try {
//     // Client SMS message
//     const clientMessage = `
// Здравствуйте, ${appointmentData.name}!

// Ваша заявка на процедуру "${appointmentData.service}" принята.
// Предпочтительное время: ${appointmentData.preferredTime}

// Мы свяжемся с вами в ближайшее время для подтверждения записи.

// Beauty Clinic
// +7 (812) 345-67-89
//     `.trim();

//     // Admin SMS message
//     const adminMessage = `
// Новая заявка на запись:

// Клиент: ${appointmentData.name}
// Телефон: ${appointmentData.phone}
// Услуга: ${appointmentData.service}
// Время: ${appointmentData.preferredTime}
// Комментарии: ${appointmentData.comments || 'Нет'}

// Beauty Clinic CRM
//     `.trim();

//     // In production, this would make actual API calls to Twilio
//     // For demo purposes, we'll simulate the API calls

//     console.log('Sending SMS to client:', clientMessage);
//     console.log('Sending SMS to admin:', adminMessage);

//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Simulate successful response
//     return {
//       success: true,
//       messageId: `msg_${Date.now()}`,
//     };
//   } catch (error) {
//     console.error('SMS sending failed:', error);
//     return {
//       success: false,
//       error: 'Failed to send SMS notification',
//     };
//   }
// };

// // Function to send reminder SMS (would be called by a scheduled job)
// export const sendReminderSMS = async (
//   appointmentData: AppointmentData,
//   appointmentDateTime: string
// ): Promise<SMSResponse> => {
//   try {
//     const reminderMessage = `
// Напоминание о записи в Beauty Clinic

// Завтра в ${appointmentDateTime}
// Процедура: ${appointmentData.service}

// Адрес: Невский проспект, 100
// Телефон: +7 (812) 345-67-89

// До встречи!
//     `.trim();

//     console.log('Sending reminder SMS:', reminderMessage);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     return {
//       success: true,
//       messageId: `reminder_${Date.now()}`,
//     };
//   } catch (error) {
//     console.error('Reminder SMS failed:', error);
//     return {
//       success: false,
//       error: 'Failed to send reminder SMS',
//     };
//   }
// };
