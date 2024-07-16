export type UnsubscribeCallback = () => void;

export abstract class WhatsAppVerificationService {
  abstract verifyNumber(number: string, sessionId: string): Promise<boolean>;
  abstract createConnection(sessionId: string): Promise<UnsubscribeCallback>;
  abstract getConnectionCode(sessionId: string): Promise<string>;
}
