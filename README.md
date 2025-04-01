# WaffleAI Telegram Bot

Telegram бот на базе Claude AI, который может отвечать на вопросы пользователей и сохранять историю диалогов в MongoDB.

## Требования

- [Bun](https://bun.sh/) (JavaScript рантайм)
- MongoDB сервер
- Telegram Bot Token
- API ключ от LangDock для доступа к Claude AI

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/waffle-inc/WaffleAi.git
cd WaffleAi
```

2. Установите зависимости:
```bash
bun install
```

3. Настройте конфигурационный файл:
```bash
cp config-example.toml config.toml
```

4. Отредактируйте `config.toml` и заполните необходимые данные:
```toml
[Bot]
botToken = "ВАШ_TELEGRAM_BOT_TOKEN" # Получите у @BotFather
adminIds = [ВАШИ_TELEGRAM_ID] # ID администраторов бота

[database]
name = "ИМЯ_ПОЛЬЗОВАТЕЛЯ_MONGODB" # Имя пользователя базы данных
password = "ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ_MONGODB" # Пароль пользователя базы данных
url = "localhost" # Адрес MongoDB сервера
port = 27017 # Порт MongoDB
database = "waffleai" # Название базы данных

[ai]
langdockKey = "ВАШ_API_КЛЮЧ_LANGDOCK" # API ключ для доступа к Claude AI
```

## Запуск

```bash
bun run src/index.ts
```

## Использование

### Команды бота

- `/waffle [запрос]` - Отправить запрос к Claude AI
  - Бот сохраняет историю диалогов, что позволяет вести продолжительные беседы
  - Кнопка "🗑️ Очистить историю" удаляет всю историю чата для пользователя

### Примеры запросов

```
/waffle Расскажи мне о квантовых компьютерах
/waffle Какие интересные места стоит посетить в Санкт-Петербурге?
/waffle Напиши короткий рассказ о космическом путешествии
```

## Структура проекта

- `src/index.ts` - Точка входа в приложение
- `src/config.ts` - Парсер конфигурационного файла
- `src/database/` - Модули для работы с MongoDB
- `src/handlers/` - Обработчики команд Telegram
- `src/utils/` - Утилиты и сервисы для работы с Claude AI API

## Разработка

Бот разработан с использованием следующих технологий:

- [Grammy](https://grammy.dev/) - Фреймворк для разработки Telegram ботов
- [MongoDB](https://www.mongodb.com/docs/) - NoSQL база данных для хранения истории диалогов
- [Claude AI API](https://docs.anthropic.com/claude/reference) через LangDock - API для генерации ответов
- [Bun](https://bun.sh/) - JavaScript рантайм для быстрого выполнения кода 