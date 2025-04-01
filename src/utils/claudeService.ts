import axios from "axios";
import config from "../../config.toml";

export default class ClaudeService {
  private apiKey: string;

  constructor() {
    this.apiKey = config.ai.langdockKey;
  }

  async sendMessage(message: string, history: Array<{role: string, content: string}> = [], model: string = "claude-3-5-sonnet-20240620"): Promise<any> {
    try {
      // Формируем список сообщений, включая историю
      const messages = [...history, { role: "user", content: message }];
      
      const response = await axios.post(
        "https://api.langdock.com/anthropic/eu/v1/messages",
        {
          max_tokens: 4000,
          messages: messages,
          model: model
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`
          }
        }
      );
      
      let content = response.data.content;
      
      if (Array.isArray(content)) {
        content = content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');
      }
      
      return {
        content: content
      };
    } catch (error) {
      console.error('Error sending message to Claude:', error);
      throw error;
    }
  }
}
