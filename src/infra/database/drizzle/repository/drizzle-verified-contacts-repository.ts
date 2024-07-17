import { Inject } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DrizzleVerifiedContactsMapper } from '../mappers/verified-contacts-mapper';
import * as schema from '../schema/sqlite';
import { VerifiedContactsRepository } from '@/domain/repositories/verified-contacts';
import { VerifiedContact } from '@/domain/entities/verified-contact';

export class DrizzleVerifiedContactsRepository
  implements VerifiedContactsRepository
{
  constructor(
    @Inject('DB_DEV') private database: BetterSQLite3Database<typeof schema>,
    private drizzleSQLiteVerifiedContactMapper: DrizzleVerifiedContactsMapper,
  ) {}
  async save(verifiedContact: VerifiedContact) {
    const toInsert = {
      number: verifiedContact.number,
      requestId: verifiedContact.requestId,
      onWhatsApp: verifiedContact.onWhatsApp,
      verifiedAt: verifiedContact.verifiedAt,
      name: verifiedContact.name,
      updatedAt: verifiedContact.updatedAt,
    };
    const savedContact = this.database
      .insert(schema.verifiedContacts)
      .values(toInsert)
      .returning()
      .get();
    return this.drizzleSQLiteVerifiedContactMapper.toDomain(savedContact);
  }
  async findByRequestId(requestId: number): Promise<VerifiedContact[]> {
    const verifiedContacts =
      await this.database.query.verifiedContacts.findMany({
        where: (contacts, { eq }) => {
          return eq(contacts.requestId, requestId);
        },
      });
    return verifiedContacts.map((contact) =>
      this.drizzleSQLiteVerifiedContactMapper.toDomain(contact),
    );
  }

  async findByNumber(number: string): Promise<VerifiedContact | undefined> {
    const contact = await this.database.query.verifiedContacts.findFirst({
      where: (savedContacts, { eq }) => {
        return eq(savedContacts.number, number);
      },
    });
    if (contact === undefined) {
      return undefined;
    }
    return this.drizzleSQLiteVerifiedContactMapper.toDomain(contact);
  }
  async findById(contactId: number): Promise<VerifiedContact | undefined> {
    const contact = await this.database.query.verifiedContacts.findFirst({
      where: (savedContacts, { eq }) => {
        return eq(savedContacts.id, contactId);
      },
    });
    if (contact === undefined) {
      return undefined;
    }
    return this.drizzleSQLiteVerifiedContactMapper.toDomain(contact);
  }
}
