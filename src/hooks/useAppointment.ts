import { useState } from 'react';

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

// Временная заглушка для отправки SMS
const sendAppointmentSMS = async (
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

export const useAppointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAppointment = async (appointmentData: AppointmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const smsResult = await sendAppointmentSMS(appointmentData);

      if (!smsResult.success) {
        throw new Error(smsResult.error || 'Failed to send SMS');
      }

      console.log('Appointment submitted successfully:', appointmentData);

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return {
    isLoading,
    isSubmitted,
    error,
    submitAppointment,
    resetForm,
  };
};

// import { useState } from 'react';
// import { sendAppointmentSMS, AppointmentData } from '../api/sms';

// export const useAppointment = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const submitAppointment = async (appointmentData: AppointmentData) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Send SMS notifications
//       const smsResult = await sendAppointmentSMS(appointmentData);

//       if (!smsResult.success) {
//         throw new Error(smsResult.error || 'Failed to send SMS');
//       }

//       // Here you could also save to database, send email, etc.
//       console.log('Appointment submitted successfully:', appointmentData);

//       setIsSubmitted(true);

//       // Reset form after 5 seconds
//       setTimeout(() => {
//         setIsSubmitted(false);
//       }, 5000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setIsSubmitted(false);
//     setError(null);
//   };

//   return {
//     isLoading,
//     isSubmitted,
//     error,
//     submitAppointment,
//     resetForm,
//   };
// };
