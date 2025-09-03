# Руководство по развертыванию Beauty Clinic

## 🚀 Быстрый старт

### Netlify (Рекомендуется)

1. **Подготовка проекта**
   ```bash
   npm run build
   ```

2. **Развертывание через Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Или через веб-интерфейс**
   - Перейдите на [netlify.com](https://netlify.com)
   - Подключите GitHub репозиторий
   - Настройте build command: `npm run build`
   - Настройте publish directory: `dist`

### Vercel

1. **Через Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Или через веб-интерфейс**
   - Перейдите на [vercel.com](https://vercel.com)
   - Импортируйте проект из GitHub
   - Vercel автоматически определит настройки

## ⚙️ Настройка переменных окружения

### Netlify
В панели управления Netlify:
1. Site settings → Environment variables
2. Добавьте переменные из `.env.example`

### Vercel
В панели управления Vercel:
1. Project Settings → Environment Variables
2. Добавьте переменные из `.env.example`

## 📱 Настройка Twilio SMS

1. **Регистрация в Twilio**
   - Перейдите на [twilio.com](https://www.twilio.com)
   - Создайте аккаунт и получите бесплатный номер

2. **Получение учетных данных**
   - Account SID: в консоли Twilio
   - Auth Token: в консоли Twilio
   - Phone Number: ваш Twilio номер

3. **Настройка webhook**
   - URL: `https://your-domain.com/api/twilio-webhook`
   - HTTP Method: POST
   - Events: Message Status

## 📊 Настройка Google Analytics

1. **Создание GA4 property**
   - Перейдите в [Google Analytics](https://analytics.google.com)
   - Создайте новое свойство
   - Получите Measurement ID (G-XXXXXXXXXX)

2. **Настройка целей**
   - Appointment submissions
   - Service interest tracking
   - AI consultant usage

## 🗓 Интеграция Google Calendar

1. **Создание API ключа**
   - Перейдите в [Google Cloud Console](https://console.cloud.google.com)
   - Включите Calendar API
   - Создайте API ключ

2. **Настройка календаря**
   - Создайте отдельный календарь для записей
   - Получите Calendar ID
   - Настройте права доступа

## 🔒 Безопасность

### SSL/TLS
- Netlify и Vercel автоматически предоставляют SSL
- Принудительное перенаправление на HTTPS

### Заголовки безопасности
Настроены в `netlify.toml` и `vercel.json`:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

### Валидация данных
- Клиентская валидация форм
- Серверная валидация API
- Санитизация пользовательского ввода

## 📈 Мониторинг и аналитика

### Метрики для отслеживания
- Конверсия записей на прием
- Популярные услуги
- Источники трафика
- Время на сайте
- Показатель отказов

### Настройка уведомлений
- Email уведомления о новых записях
- SMS подтверждения клиентам
- Slack интеграция для команды

## 🔧 Техническое обслуживание

### Регулярные задачи
- Обновление зависимостей
- Мониторинг производительности
- Резервное копирование данных
- Проверка SSL сертификатов

### Логирование
- Ошибки приложения
- API запросы
- SMS статусы
- Пользовательские действия

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в панели хостинга
2. Убедитесь в правильности переменных окружения
3. Проверьте статус внешних сервисов (Twilio, Google)
4. Обратитесь к документации провайдеров