import { verifiedContacts } from '@/infra/database/schema/verified-contacts';
type VerifiedContactProps = {
  number: string;
  requestId: number;
  name: string;
  onWhatsApp: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export class VerifiedContact {
  constructor(
    private props: VerifiedContactProps,
    private _id: number | null,
  ) {}

  get id() {
    return this._id;
  }
  get number() {
    return this.props.number;
  }
  get requestId() {
    return this.props.requestId;
  }
  get name() {
    return this.props.name;
  }
  get onWhatsApp() {
    return this.props.onWhatsApp;
  }
  get verifiedAt() {
    return this.props.verifiedAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static fromModel(verifiedContactModel: typeof verifiedContacts.$inferSelect) {
    return new VerifiedContact(
      {
        ...verifiedContactModel,
      },
      verifiedContactModel.id,
    );
  }
}
