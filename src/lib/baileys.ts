import makeWASocket, { AuthenticationState } from '@whiskeysockets/baileys';

export type BaileysSocket = ReturnType<typeof makeWASocket> & { qr: string };
export type BaileysAuthProvider = {
  state: AuthenticationState;
  saveCreds: () => Promise<void>;
};
