const { env: ENV } = process as { env: { [key: string]: string } };

// export const MONGO_URI = ENV.MONGO_URI as string;
// export const MAIL_TRAP_USER = ENV.MAIL_TRAP_USER as string;
// export const MAIL_TRAP_PASSWORD = ENV.MAIL_TRAP_USER as string;

export const {
  MONGO_URI,
  MAIL_TRAP_USER,
  MAIL_TRAP_PASS,
  MAIL_TRAP_SENDER,
  GMAIL_APP_USE,
  GMAIL_USER,
} = ENV;
