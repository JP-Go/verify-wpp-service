import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infra/database/schema/index.ts',
  dialect: 'sqlite',
  migrations: {
    prefix: 'timestamp',
  },
  dbCredentials: {
    url: './db.sqlite',
  },
});
