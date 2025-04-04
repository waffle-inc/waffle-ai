import { type IMessage, type IChatHistory, ChatHistory } from './chats';
import mongoose from 'mongoose';

export class ChatService {
    private chatHistoryModel: mongoose.Model<IChatHistory>;

    constructor() {
        this.chatHistoryModel = ChatHistory;
    }
    async AddMessage(
        userId: number,
        role: 'user' | 'assistant',
        text: string,
        filePath?: string
    ): Promise<IChatHistory> {
        const newMessage = { role, text, filePath, timestamp: new Date() } as Partial<IMessage>;
        let chat = await this.chatHistoryModel.findOne({ userId });
        if (chat) {
            chat.messages.push(newMessage as any);
            await chat.save();
        } else {
            chat = new this.chatHistoryModel({ userId, messages: [newMessage] });
            await chat.save();
        }
        return chat;
    }

    async ClearChat(userId: number): Promise<void> {
        await this.chatHistoryModel.deleteOne({ userId });
    }

    async GetChatHistory(userId: number): Promise<{role: string, content: string}[]> {
        const chat = await this.chatHistoryModel.findOne({ userId });
        if (!chat) {
            return [];
        }
        
        return chat.messages.map(msg => ({
            role: msg.role,
            content: msg.text
        }));
    }
}