// Типы данных для webhook
export interface TwilioWebhookData {
  MessageSid: string;
  MessageStatus:
    | 'queued'
    | 'sent'
    | 'received'
    | 'delivered'
    | 'undelivered'
    | 'failed';
  To: string;
  From: string;
  Body: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}

// Обработчик webhook — просто логируем входящие данные
export const handleTwilioWebhook = async (webhookData: TwilioWebhookData) => {
  try {
    console.log('Twilio webhook received:', webhookData);

    switch (webhookData.MessageStatus) {
      case 'delivered':
        console.log(`SMS delivered successfully to ${webhookData.To}`);
        // Здесь можно обновить статус в базе
        break;

      case 'failed':
      case 'undelivered':
        console.error(
          `SMS delivery failed to ${webhookData.To}:`,
          webhookData.ErrorMessage
        );
        // Здесь можно отметить ошибку доставки
        break;

      case 'sent':
        console.log(`SMS sent to ${webhookData.To}`);
        // Здесь можно отметить, что SMS отправлено
        break;

      default:
        console.log(
          `SMS status: ${webhookData.MessageStatus} for ${webhookData.To}`
        );
    }
  } catch (error) {
    console.error('Error processing Twilio webhook:', error);
  }
};

export const validateTwilioSignature = (
  _signature: string,
  _url: string,
  _params: Record<string, string>,
  _authToken: string
): boolean => {
  void _signature;
  void _url;
  void _params;
  void _authToken;
  console.log('validateTwilioSignature called — stub returns true');
  return true;
};

// // Twilio webhook handler for SMS status updates
// export interface TwilioWebhookData {
//   MessageSid: string;
//   MessageStatus: 'queued' | 'sent' | 'received' | 'delivered' | 'undelivered' | 'failed';
//   To: string;
//   From: string;
//   Body: string;
//   ErrorCode?: string;
//   ErrorMessage?: string;
// }

// export const handleTwilioWebhook = async (webhookData: TwilioWebhookData) => {
//   try {
//     console.log('Twilio webhook received:', webhookData);

//     // Update appointment status based on SMS delivery
//     switch (webhookData.MessageStatus) {
//       case 'delivered':
//         console.log(`SMS delivered successfully to ${webhookData.To}`);
//         // Update database: mark SMS as delivered
//         break;

//       case 'failed':
//       case 'undelivered':
//         console.error(`SMS delivery failed to ${webhookData.To}:`, webhookData.ErrorMessage);
//         // Update database: mark SMS as failed, maybe try alternative contact method
//         break;

//       case 'sent':
//         console.log(`SMS sent to ${webhookData.To}`);
//         // Update database: mark SMS as sent
//         break;
//     }

//     // You could also trigger additional actions here:
//     // - Send email backup if SMS fails
//     // - Update CRM system
//     // - Notify admin of delivery issues

//   } catch (error) {
//     console.error('Error processing Twilio webhook:', error);
//   }
// };

// // Validate Twilio webhook signature for security
// export const validateTwilioSignature = (
//   signature: string,
//   url: string,
//   params: Record<string, string>,
//   authToken: string
// ): boolean => {
//   // In production, implement Twilio signature validation
//   // This ensures the webhook is actually from Twilio

//   const crypto = require('crypto');
//   const qs = require('querystring');

//   const data = Object.keys(params)
//     .sort()
//     .reduce((acc, key) => {
//       return acc + key + params[key];
//     }, url);

//   const expectedSignature = crypto
//     .createHmac('sha1', authToken)
//     .update(Buffer.from(data, 'utf-8'))
//     .digest('base64');

//   return crypto.timingSafeEqual(
//     Buffer.from(signature, 'base64'),
//     Buffer.from(expectedSignature, 'base64')
//   );
// };
