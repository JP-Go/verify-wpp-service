import { VerifiedContact } from './verified-contact';
import { WhatsApp } from './whatsapp';

type VerificationRequestProps = {
  requestKind: 'SINGLE' | 'LOT';
  requestIdentity: string;
  requestedBy: number;
  whatsappUsed: WhatsApp;
  createdAt: Date;
  updatedAt: Date;
  verifiedContacts: VerifiedContact[];
};

export class VerificationRequest {
  constructor(
    private props: VerificationRequestProps,
    private _id: number | null = null,
  ) {}

  get id() {
    return this._id;
  }
  get requestKind() {
    return this.props.requestKind;
  }
  get requestIdentity() {
    return this.props.requestIdentity;
  }
  get requestedBy() {
    return this.props.requestedBy;
  }
  get whatsappUsed() {
    return this.props.whatsappUsed;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get verifiedContacts() {
    return this.props.verifiedContacts;
  }

  addContact(verifiedContact: VerifiedContact) {
    this.props.verifiedContacts.push(verifiedContact);
  }

  toHTTP() {
    return {
      id: this.id,
      requestKind: this.requestKind,
      requestIdentity: this.requestIdentity,
      requestedBy: this.requestedBy,
      whatsappUsed: this.whatsappUsed.toHTTP(),
      requestedAt: this.createdAt,
      verifiedContacts: this.verifiedContacts.map((contact) =>
        contact.toHTTP(),
      ),
    };
  }
}
