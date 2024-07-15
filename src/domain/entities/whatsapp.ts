type WhatsAppProps = {
  number: string;
  name: string;
  qrcode: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export class WhatsApp {
  constructor(
    private props: Partial<WhatsAppProps>,
    private _id: number | null = null,
  ) {}

  get id() {
    return this._id;
  }
  get number() {
    return this.props.number;
  }
  get name() {
    return this.props.name;
  }
  get status() {
    return this.props.status;
  }
  get qrcode() {
    return this.props.qrcode;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  toHTTP() {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      qrcode: this.qrcode,
      status: this.status,
    };
  }
}
