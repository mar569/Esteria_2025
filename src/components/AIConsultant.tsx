// AIConsultant.tsx

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import useAIConsultantLogic from '../hooks/useAIConsultantLogic';
import servicesData from '../utils/servicesData';
import { analytics } from '../utils/analytics';
import Appointment from './Appointment';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [appointmentContext, setAppointmentContext] = useState<{
    serviceId?: string;
    date?: string;
    time?: string;
    contact?: string;
  } | null>(null);

  const {
    messages,
    handleUserMessage,
    handleServiceClick,
    handleQuickReply,
    resetDialog,
  } = useAIConsultantLogic((context) => {
    setAppointmentContext(context);
    setIsOpen(false);
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) resetDialog();
  };

  const onSendMessage = () => {
    if (inputMessage.trim()) {
      handleUserMessage(inputMessage.trim());
      analytics.trackAIConsultantUsage('message_sent');
      setInputMessage('');
    }
  };

  const questions = [
    'Какой у вас тип кожи? (например, сухая, жирная, комбинированная)',
    'Есть ли проблемы с кожей? (например, акне, морщины, пигментация)',
    'Какой результат хотите получить? (например, омоложение, увлажнение, очищение)',
    'Делали ли вы косметологические процедуры раньше?',
    'Есть ли аллергии или чувствительность кожи?',
    'Какой у вас возраст?',
  ];

  const onQuestionClick = (question: string) => {
    handleUserMessage(question);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-10 right-14 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-mint-500 to-mint-600 text-white shadow-2xl hover:scale-110 transition"
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-mint-500 to-mint-600 p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h4 className="text-white font-semibold">ИИ-консультант Мия</h4>
              <p className="text-mint-100 text-sm">Ваш персональный косметолог</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => {
              if (msg.type === 'service' && msg.serviceId) {
                const service = servicesData.find((s) => s.id === msg.serviceId);
                if (!service) return null;
                return (
                  <div
                    key={i}
                    className="cursor-pointer p-2 rounded hover:bg-mint-50"
                    onClick={() => handleServiceClick(service.id)}
                    title="Нажмите, чтобы узнать подробности"
                  >
                    <div className="text-mint-700 font-semibold">
                      {service.title} — {service.price}
                    </div>
                  </div>
                );
              }
              if (msg.type === 'quickReply' && msg.quickReplies) {
                return (
                  <div key={i} className="flex flex-wrap gap-2 max-w-xs">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        className="bg-mint-100 text-mint-700 px-3 py-1 rounded-full text-sm hover:bg-mint-200 transition"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl whitespace-pre-line ${msg.type === 'user' ? 'bg-mint-500 text-white' : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200 space-y-2">
                <p className="text-gray-600 text-sm">Быстрые вопросы:</p>
                {questions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => onQuestionClick(question)}
                    className="block w-full text-left p-3 bg-mint-50 hover:bg-mint-100 rounded-xl text-gray-700 text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                id="chat-input"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                placeholder="Напишите ваш вопрос..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-mint-500"
                aria-label="Поле ввода сообщения"
              />
              <button
                onClick={onSendMessage}
                className="w-10 h-10 bg-mint-500 text-white rounded-xl hover:bg-mint-600 transition-colors flex items-center justify-center"
                aria-label="Отправить сообщение"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {appointmentContext && (
        <Appointment
          context={appointmentContext}
          onClose={() => setAppointmentContext(null)}
        />
      )}
    </>
  );
};

export default AIConsultant;
