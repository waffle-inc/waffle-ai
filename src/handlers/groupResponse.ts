import { Composer, InlineKeyboard } from "grammy";
import { ChatService } from "../database/chatService";
import ClaudeService from "../utils/claudeService";

const groupComposer = new Composer();

function jsonParse(text: string): string {
    try {
        if (typeof text === 'string') {
            const parsedContent = JSON.parse(text);
            if (Array.isArray(parsedContent)) {
                return parsedContent.map(item => item.text).join("\n");
            }
            return text;
        }
        return text;
    } catch (e) {
        console.log(e);
        return text;
    }
}

function clearHistoryButton() {
    return new InlineKeyboard().text('🗑️ Очистить историю', 'clear_history');
}


groupComposer.command('waffle', async (ctx) => {
    const chatService = new ChatService();
    const claudeService = new ClaudeService();

    const text = ctx.message?.text;
    const command = text?.split(' ')[0];
    const prompt = text?.replace(command!, '').trim();

    if (ctx.from) {
        const msg = await ctx.reply('Waffle is working...');
        const history = await chatService.GetChatHistory(ctx.from.id);
        const response = await claudeService.sendMessage(prompt!, history);
        
        const responseText = jsonParse(response.content);
        
        try {
            await ctx.api.editMessageText(ctx.chat.id, msg.message_id, responseText, { parse_mode: 'Markdown', reply_markup: clearHistoryButton() });
        } catch (e) {
            await ctx.api.editMessageText(ctx.chat.id, msg.message_id, responseText, { reply_markup: clearHistoryButton() });
        }
        
        if (prompt) {
            await chatService.AddMessage(ctx.from.id, "user", prompt);
            await chatService.AddMessage(ctx.from.id, "assistant", responseText);
        } else {
            await ctx.reply("Запросы мои не трать сука.")
        }
    } else {
        await ctx.reply('Не удалось определить отправителя сообщения');
    }
});

groupComposer.callbackQuery('clear_history', async (ctx) => {
    const chatService = new ChatService();
    if (ctx.from) {
        await chatService.ClearChat(ctx.from.id);
    } else {
        await ctx.answerCallbackQuery('динаху');
    }
    await ctx.answerCallbackQuery('История очищена!');
});

export default groupComposer;
