export class TextConfig {
  async TextMessage(text: string) {
    return {
      type: 'text' as const,
      text,
    };
  }

  async getHello1() {
    return this.TextMessage('สวัสดีครับ1');
  }
  async getHello2() {
    return this.TextMessage('สวัสดีครับ2');
  }
}
