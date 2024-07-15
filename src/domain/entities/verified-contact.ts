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
    private _id: number | null = null,
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

  setOnWhatsApp(onWhatsApp: boolean) {
    this.props.verifiedAt = new Date();
    this.props.updatedAt = new Date();
    this.props.onWhatsApp = onWhatsApp;
  }

  toHTTP() {
    return {
      id: this.id,
      number: this.number,
      requestId: this.requestId,
      name: this.name,
      onWhatsApp: this.onWhatsApp,
      verifiedAt: this.verifiedAt,
    };
  }
}
