import axios from "axios";
import config from "../../config.toml";

class ClaudeService {
  private apiKey: string;

  constructor() {
    this.apiKey = config.ai.langdockKey;
  }

  async sendMessage(message: string, model: string = "claude-3-5-sonnet-20240620"): Promise<any> {
    try {
      const response = await axios.post(
        "https://api.langdock.com/anthropic/eu/v1/messages",
        {
          max_tokens: 2000,
          messages: [{ content: message, role: "user" }],
          model: model
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
  }
}

export default ClaudeService;
