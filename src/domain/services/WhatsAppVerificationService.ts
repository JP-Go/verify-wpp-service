export type UnsubscribeCallback = () => void;

/**
 * An interface that defines the behavior of an WhatsApp verification service.
 * This service is responsible for checking if a phone number is on WhatsApp.
 * It provides this by using verification connections. These sessions are
 * responsible for interacting with the WhatsApp servers and providing the status
 * of a given phone number.
 */
export abstract class WhatsAppVerificationService {
  abstract verifyNumber(number: string, sessionId: string): Promise<boolean>;
  abstract createConnection(sessionId: string): Promise<UnsubscribeCallback>;
  abstract getConnectionCode(sessionId: string): Promise<string>;
}
