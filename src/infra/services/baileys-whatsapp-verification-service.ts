import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import makeWASocket, {
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { BaileysAuthProvider, BaileysSocket } from '@/lib/baileys';

@Injectable()
// TODO: properly save connections
export class BaileysWhatsappVerificationService
  implements WhatsAppVerificationService, OnModuleInit, OnApplicationShutdown
{
  private connections: Record<string, BaileysSocket> = {};
  private authState: BaileysAuthProvider;

  async onModuleInit() {
    this.authState = await useMultiFileAuthState('./baileys_auth_info');
    const sessionId = this.authState.state.creds?.me.id.split('@').at(0);
    await this.createConnection(sessionId);
  }

  async onApplicationShutdown() {
    for (const connection of Object.values(this.connections)) {
      await connection.logout();
    }
  }
  async verifyNumber(number: string, sessionId: string) {
    const socket = this.connections[sessionId];
    if (socket === undefined) {
      throw new Error('Session not found');
    }
    const [result] = await socket.onWhatsApp(number);
    return Boolean(result?.exists);
  }
  async createConnection(sessionId: string, retries = 0) {
    if (retries > 3) {
      throw new Error('Could not connect to whatsapp');
    }
    const { version } = await fetchLatestBaileysVersion({});
    const socket = makeWASocket({
      printQRInTerminal: true,
      auth: this.authState.state,
      version: version,
      syncFullHistory: true,
    });
    this.connections[sessionId] = { ...socket, qr: '' };
    socket.ev.on('creds.update', this.authState.saveCreds);
    socket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;
      if (connection === 'close') {
        const shouldReconnect = true;
        console.log(
          'connection closed due to ',
          lastDisconnect.error,
          ', reconnecting ',
          shouldReconnect,
        );
        if (shouldReconnect) {
          this.createConnection(sessionId, retries + 1);
        }
      } else if (connection === 'open') {
        console.log('opened connection');
      }
      if (this.connections[sessionId].qr !== qr) {
        this.connections[sessionId].qr = qr;
      }
    });
    return socket.logout;
  }
  async getConnectionCode(sessionId: string): Promise<string> {
    const socket = this.connections[sessionId];
    if (socket === undefined) {
      throw new Error('Session not found');
    }
    return this.connections[sessionId].qr;
  }
}
