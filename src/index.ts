import { Bot } from "grammy";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import * as path from "path";
import config from "./config";
import { connectDB } from "./database/db";
import groupComposer from "./handlers/groupResponse";

const botToken = config.Bot.botToken;
if (!botToken) {
  throw new Error("Не указан токен бота. Добавьте его в config.yaml.");
}

const bot = new Bot(botToken);

i18next
  .use(Backend)
  .init({
    fallbackLng: "ru",
    backend: {
      loadPath: path.resolve(__dirname, "..", "locales", "{{lng}}.json")
    }
  })
  .then()
  .catch((err) => {
    console.error("Ошибка инициализации i18next:", err);
  });

bot.catch((err) => {
  console.error(`Ошибка при обработке обновления ${err.ctx.update.update_id}:`, err.error);
});

bot.use(groupComposer);

async function main() {
  await connectDB();
  await bot.start({
    allowed_updates: [
      "message", 
      "edited_message", 
      "callback_query", 
      "my_chat_member", 
      "chat_member"
    ]
  });
  console.log("Бот запущен и ожидает сообщений...");
}

main().catch((err) => {
  console.error("Ошибка при запуске бота:", err);
});