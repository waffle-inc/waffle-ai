import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  filePath?: string;
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  filePath: { type: String, required: false },
});

export interface IChatHistory extends Document {
  userId: string;
  messages: IMessage[];
}

const chatHistorySchema = new Schema<IChatHistory>({
  userId: { type: String, required: true },
  messages: [messageSchema],
});

export const ChatHistory = mongoose.model<IChatHistory>('ChatHistory', chatHistorySchema);