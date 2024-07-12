import { verificationRequests } from '@/infra/database/schema/verification-request';
import { VerifiedContact } from './verified-contact';

type VerificationRequestProps = {
  requestKind: 'SINGLE' | 'LOT';
  requestIdentity: string;
  requestedBy: number;
  whatsappUsed: number;
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

  static fromModel(
    verificationRequestModel: typeof verificationRequests.$inferSelect,
  ) {
    return new VerificationRequest(
      {
        ...verificationRequestModel,
        requestKind: verificationRequestModel.requestKind as 'SINGLE' | 'LOT',
        verifiedContacts: [],
      },
      verificationRequestModel.id,
    );
  }
}
