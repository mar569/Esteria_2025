// useAIConsultantLogic.tsx
import { useState } from 'react';
import servicesData, { Service } from '../utils/servicesData';

export type MessageType = 'bot' | 'user' | 'service' | 'quickReply';

export interface Message {
  type: MessageType;
  text?: string;
  serviceId?: string;
  quickReplies?: string[];
}

interface Context {
  skinType?: string;
  problems?: string[];
  goals?: string[];
  age?: number;
  allergies?: string[];
  previousProcedures?: boolean;
  serviceId?: string;
  date?: string;
  time?: string;
  contact?: string;
}

type DialogState =
  | 'greeting'
  | 'askConcern'
  | 'askSkinType'
  | 'askProblems'
  | 'askGoals'
  | 'askAge'
  | 'askAllergies'
  | 'askPreviousProcedures'
  | 'recommendServices'
  | 'askBookingService'
  | 'askBookingDate'
  | 'askBookingTime'
  | 'askContact'
  | 'bookingConfirmed'
  | 'idle';

const defaultQuickReplies = [
  'Расскажите о типах кожи',
  'Какие процедуры для омоложения?',
  'Как ухаживать за кожей после процедуры?',
  'Записаться на консультацию',
  'Какие есть противопоказания?',
  'Сколько стоит процедура?',
  'Какие есть процедуры для тела?',
  'Есть ли процедуры для волос?',
];

const extendedAnswers = {
  skinTypesInfo: `Существует несколько основных типов кожи: сухая, жирная, комбинированная, нормальная и чувствительная. Каждый тип требует индивидуального ухода и процедур. Например, для сухой кожи подойдут увлажняющие процедуры, а для жирной — очищающие и матирующие.`,
  antiAging: `Для омоложения кожи я рекомендую процедуры, такие как биоревитализация, RF-лифтинг, ботулинотерапия и коллагеновые инъекции. Они стимулируют выработку коллагена, улучшают тонус и текстуру кожи.`,
  aftercare: `После процедур важно соблюдать рекомендации специалиста: избегать солнца, использовать увлажняющие средства и не трогать обработанные зоны руками.`,
  bodyProcedures: `У нас есть процедуры для коррекции фигуры и улучшения состояния кожи тела, включая липолитики, массажи и карбокситерапию.`,
  hairProcedures: `Для улучшения состояния волос и кожи головы доступны мезотерапия и другие процедуры, направленные на питание и восстановление.`,
};

export const useAIConsultantLogic = (
  onOpenAppointment: (context: Context) => void
) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'Здравствуйте! Я Мия, помощница Марианны и ваш персональный косметолог-ассистент. Расскажите, что вас беспокоит или что хотите улучшить? Я помогу подобрать процедуры и ответить на вопросы.',
      quickReplies: [
        'Проблемы с кожей',
        'Интересуют процедуры для омоложения',
        'Процедуры для тела',
        'Вопросы по уходу после процедур',
        'Записаться на консультацию',
      ],
    },
  ]);
  const [context, setContext] = useState<Context>({});
  const [dialogState, setDialogState] = useState<DialogState>('greeting');

  const addMessage = (msg: Message | Message[]) => {
    const newMessages = Array.isArray(msg) ? msg : [msg];
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const filterServicesByTags = (tags: string[]): Service[] => {
    if (!tags.length) return [];
    return servicesData.filter((service) =>
      service.tags?.some((serviceTag) =>
        tags.some((tag) => serviceTag.toLowerCase().includes(tag.toLowerCase()))
      )
    );
  };

  const parseIntent = (text: string): string => {
    const lower = text.toLowerCase();
    if (/(стоимость|цена|сколько стоит)/.test(lower)) return 'price';
    if (/(противопоказания|можно ли|нельзя)/.test(lower))
      return 'contraindications';
    if (/(уход|после процедуры|что делать после)/.test(lower))
      return 'aftercare';
    if (/(записаться|консультация|запись|запишите)/.test(lower))
      return 'booking';
    if (/(типы кожи|какой у меня тип кожи|расскажи про типы кожи)/.test(lower))
      return 'skinTypesInfo';
    if (/(омоложение|процедуры для омоложения)/.test(lower)) return 'antiAging';
    if (/(тело|коррекция|липолитики|массаж)/.test(lower))
      return 'bodyProcedures';
    if (/(волосы|кожа головы|мезотерапия)/.test(lower)) return 'hairProcedures';
    return 'unknown';
  };

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;
    addMessage({ type: 'user', text });

    const lowerText = text.toLowerCase();

    switch (dialogState) {
      case 'greeting':
        addMessage({
          type: 'bot',
          text: 'Спасибо! Чтобы лучше помочь, расскажите, какой у вас тип кожи или какие проблемы вас беспокоят? Если хотите, можете описать другие пожелания.',
          quickReplies: [
            'Сухая кожа',
            'Жирная кожа',
            'Комбинированная кожа',
            'Проблемы с акне',
            'Пигментация',
            'Другие проблемы',
            'Пропустить',
          ],
        });
        setDialogState('askSkinType');
        break;

      case 'askSkinType':
        if (lowerText.includes('пропустить')) {
          setContext((prev) => ({ ...prev }));
        } else {
          setContext((prev) => ({ ...prev, skinType: text.trim() }));
        }
        addMessage({
          type: 'bot',
          text: 'Какие проблемы с кожей или телом вас беспокоят? Например, акне, сухость, морщины, пигментация, целлюлит, или что-то другое?',
          quickReplies: [
            'Акне',
            'Сухость',
            'Морщины',
            'Пигментация',
            'Целлюлит',
            'Нет проблем',
          ],
        });
        setDialogState('askProblems');
        break;

      case 'askProblems': {
        const knownProblems = [
          'акне',
          'морщины',
          'пигментация',
          'сухость',
          'жирность',
          'чувствительность',
          'целлюлит',
          'нет',
        ];
        const foundProblems = knownProblems.filter((p) =>
          lowerText.includes(p)
        );
        setContext((prev) => ({
          ...prev,
          problems: foundProblems.length
            ? foundProblems
            : ['нет особых проблем'],
        }));
        addMessage({
          type: 'bot',
          text: 'Какие результаты или эффекты вы хотите получить? Например, омоложение, увлажнение, очищение, подтяжка, коррекция фигуры, улучшение состояния волос или другое.',
          quickReplies: [
            'Омоложение',
            'Увлажнение',
            'Очищение',
            'Подтяжка',
            'Коррекция фигуры',
            'Улучшение волос',
            'Другое',
          ],
        });
        setDialogState('askGoals');
        break;
      }

      case 'askGoals': {
        const knownGoals = [
          'омоложение',
          'увлажнение',
          'очищение',
          'подтяжка',
          'коррекция',
          'расслабление',
          'улучшение',
          'коррекция фигуры',
          'улучшение волос',
        ];
        const foundGoals = knownGoals.filter((g) => lowerText.includes(g));
        setContext((prev) => ({
          ...prev,
          goals: foundGoals.length
            ? foundGoals
            : ['улучшение общего состояния'],
        }));
        addMessage({
          type: 'bot',
          text: 'Пожалуйста, укажите ваш возраст. Это поможет подобрать оптимальные процедуры.',
        });
        setDialogState('askAge');
        break;
      }

      case 'askAge': {
        const ageMatch = text.match(/\d+/);
        const age = ageMatch ? parseInt(ageMatch[0], 10) : undefined;
        setContext((prev) => ({ ...prev, age }));
        addMessage({
          type: 'bot',
          text: 'Есть ли у вас аллергии или чувствительность к каким-либо компонентам или процедурам? Если нет, напишите "нет".',
          quickReplies: [
            'Нет',
            'Аллергия на косметику',
            'Чувствительность к солнцу',
            'Другое',
          ],
        });
        setDialogState('askAllergies');
        break;
      }

      case 'askAllergies': {
        const allergies = lowerText.includes('нет')
          ? []
          : text.split(/,|\band\b/).map((s) => s.trim());
        setContext((prev) => ({ ...prev, allergies }));
        addMessage({
          type: 'bot',
          text: 'Делали ли вы косметологические процедуры раньше? (да/нет)',
          quickReplies: ['Да', 'Нет'],
        });
        setDialogState('askPreviousProcedures');
        break;
      }

      case 'askPreviousProcedures': {
        const previousProcedures = /да|yes|есть/.test(lowerText);
        setContext((prev) => ({ ...prev, previousProcedures }));
        const tagsForSearch = [
          context.skinType?.toLowerCase() || '',
          ...(context.problems || []),
          ...(context.goals || []),
        ].filter(Boolean);

        const matchedServices = filterServicesByTags(tagsForSearch);

        if (matchedServices.length === 0) {
          addMessage({
            type: 'bot',
            text: 'К сожалению, я не смогла подобрать подходящие процедуры по вашим ответам. Рекомендую записаться на консультацию косметолога.',
            quickReplies: ['Записаться на консультацию', 'Главное меню'],
          });
          setDialogState('idle');
        } else {
          const serviceMessages: Message[] = matchedServices.map((s) => ({
            type: 'service',
            serviceId: s.id,
            text: `${s.title} — ${s.price}`,
          }));
          addMessage([
            {
              type: 'bot',
              text: 'Рекомендую следующие процедуры. Напишите название интересующей для записи или "записаться", чтобы начать.',
            },
            ...serviceMessages,
            {
              type: 'bot',
              text: 'Если хотите, напишите "записаться", чтобы начать запись.',
              quickReplies: ['Записаться'],
            },
          ]);
          setDialogState('recommendServices');
        }
        break;
      }

      case 'recommendServices': {
        if (
          lowerText.includes('записаться') ||
          lowerText.includes('запишите')
        ) {
          addMessage({
            type: 'bot',
            text: 'Пожалуйста, напишите название процедуры, на которую хотите записаться.',
          });
          setDialogState('askBookingService');
          break;
        }
        const service = servicesData.find((s) =>
          s.title.toLowerCase().includes(lowerText)
        );
        if (service) {
          setContext((prev) => ({ ...prev, serviceId: service.id }));
          addMessage({
            type: 'bot',
            text: `Вы выбрали "${service.title}". На какую дату вы хотели бы записаться? Укажите дату в формате ГГГГ-ММ-ДД.`,
          });
          setDialogState('askBookingDate');
        } else {
          addMessage({
            type: 'bot',
            text: 'Не могу найти такую процедуру. Пожалуйста, напишите название из списка.',
            quickReplies: ['Список', 'Главное меню'],
          });
        }
        break;
      }

      case 'askBookingService': {
        const service = servicesData.find((s) =>
          s.title.toLowerCase().includes(lowerText)
        );
        if (service) {
          setContext((prev) => ({ ...prev, serviceId: service.id }));
          addMessage({
            type: 'bot',
            text: `Отлично! Вы выбрали "${service.title}". Укажите дату в формате ГГГГ-ММ-ДД.`,
          });
          setDialogState('askBookingDate');
        } else {
          addMessage({
            type: 'bot',
            text: 'Не могу найти такую процедуру. Пожалуйста, напишите название из списка.',
          });
        }
        break;
      }

      case 'askBookingDate': {
        if (/^\d{4}-\d{2}-\d{2}$/.test(text.trim())) {
          setContext((prev) => ({ ...prev, date: text.trim() }));
          addMessage({
            type: 'bot',
            text: 'Укажите предпочтительное время для записи. Например, утром, днем, вечером или любое удобное время.',
            quickReplies: [
              'Утром',
              'Днем',
              'Вечером',
              'В выходные',
              'Любое время',
            ],
          });
          setDialogState('askBookingTime');
        } else {
          addMessage({
            type: 'bot',
            text: 'Пожалуйста, введите дату в формате ГГГГ-ММ-ДД.',
          });
        }
        break;
      }

      case 'askBookingTime': {
        setContext((prev) => ({ ...prev, time: text.trim() }));
        addMessage({
          type: 'bot',
          text: 'Пожалуйста, оставьте ваши контактные данные (телефон или email) для подтверждения записи.',
        });
        setDialogState('askContact');
        break;
      }

      case 'askContact': {
        setContext((prev) => ({ ...prev, contact: text.trim() }));
        const service = servicesData.find((s) => s.id === context.serviceId);
        addMessage({
          type: 'bot',
          text: `Спасибо! Я сформировала вашу запись на "${service?.title}" на ${context.date} в ${context.time}. Пожалуйста, перейдите к разделу "Запись" для подтверждения.`,
        });
        setDialogState('bookingConfirmed');
        onOpenAppointment({ ...context, contact: text.trim() });
        break;
      }

      case 'bookingConfirmed': {
        addMessage({
          type: 'bot',
          text: 'Если хотите, могу помочь с другими вопросами или процедурами. Чем могу помочь?',
          quickReplies: defaultQuickReplies,
        });
        setDialogState('idle');
        break;
      }

      case 'idle': {
        const intent = parseIntent(text);
        switch (intent) {
          case 'price': {
            const service = servicesData.find((s) =>
              lowerText.includes(s.title.toLowerCase())
            );
            if (service) {
              addMessage({
                type: 'bot',
                text: `Стоимость процедуры "${service.title}": ${service.price}. Длительность: ${service.duration}. Хотите записаться?`,
                quickReplies: ['Записаться', 'Главное меню'],
              });
            } else {
              addMessage({
                type: 'bot',
                text: 'Пожалуйста, уточните, о какой процедуре хотите узнать стоимость.',
              });
            }
            break;
          }
          case 'contraindications': {
            const service = servicesData.find((s) =>
              lowerText.includes(s.title.toLowerCase())
            );
            if (service) {
              addMessage({
                type: 'bot',
                text: `Противопоказания для "${service.title}": ${
                  service.contraindications || 'нет особых противопоказаний'
                }.`,
              });
            } else {
              addMessage({
                type: 'bot',
                text: 'Пожалуйста, уточните, о какой процедуре хотите узнать противопоказания.',
              });
            }
            break;
          }
          case 'aftercare': {
            const service = servicesData.find((s) =>
              lowerText.includes(s.title.toLowerCase())
            );
            if (service) {
              addMessage({
                type: 'bot',
                text: `После процедуры "${service.title}" рекомендуется: ${
                  service.aftercare || 'следовать рекомендациям специалиста.'
                }`,
              });
            } else {
              addMessage({
                type: 'bot',
                text: 'Пожалуйста, уточните, о какой процедуре хотите узнать рекомендации по уходу.',
              });
            }
            break;
          }
          case 'booking': {
            addMessage({
              type: 'bot',
              text: 'Пожалуйста, напишите название процедуры, на которую хотите записаться.',
            });
            setDialogState('askBookingService');
            break;
          }
          case 'skinTypesInfo':
          case 'antiAging':
          case 'bodyProcedures':
          case 'hairProcedures': {
            addMessage({
              type: 'bot',
              text: extendedAnswers[intent],
              quickReplies: defaultQuickReplies,
            });
            break;
          }
          default: {
            addMessage({
              type: 'bot',
              text: 'Извините, не поняла запрос. Могу помочь с подбором процедур, стоимостью, противопоказаниями и записью. Пожалуйста, уточните ваш вопрос.',
              quickReplies: defaultQuickReplies,
            });
          }
        }
        break;
      }

      default:
        addMessage({
          type: 'bot',
          text: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
        });
        setDialogState('idle');
    }
  };

  const handleServiceClick = (serviceId: string) => {
    const service = servicesData.find((s) => s.id === serviceId);
    if (!service) return;
    const details = `Процедура: ${service.title}\nОписание: ${
      service.description
    }\nЦена: ${service.price}\nДлительность: ${
      service.duration
    }\nПротивопоказания: ${
      service.contraindications || 'нет'
    }\nРекомендации после процедуры: ${
      service.aftercare || 'нет'
    }\n\nЕсли хотите записаться, напишите "записаться".`;
    addMessage({ type: 'bot', text: details });
  };

  const handleQuickReply = (text: string) => {
    handleUserMessage(text);
  };

  const resetDialog = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Здравствуйте! Я Мия, помощница Марианны и ваш персональный косметолог-ассистент. Расскажите, что вас беспокоит или что хотите улучшить? Я помогу подобрать процедуры и ответить на вопросы.',
        quickReplies: [
          'Проблемы с кожей',
          'Интересуют процедуры для омоложения',
          'Процедуры для тела',
          'Вопросы по уходу после процедур',
          'Записаться на консультацию',
        ],
      },
    ]);
    setContext({});
    setDialogState('greeting');
  };

  return {
    messages,
    handleUserMessage,
    handleServiceClick,
    handleQuickReply,
    resetDialog,
  };
};

export default useAIConsultantLogic;
