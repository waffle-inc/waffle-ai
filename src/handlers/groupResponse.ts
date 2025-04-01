import { Composer } from "grammy";
import { ChatService } from "../database/chatService";

const groupComposer = new Composer();

groupComposer.command('waffle', async (ctx) => {
    const chatService = new ChatService();
    const text = ctx.message?.text;
    const command = text?.split(' ')[0];
    const prompt = text?.replace(command!, '').trim();
    await ctx.reply('Waffle is working...');
});

export default groupComposer;
