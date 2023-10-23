const { env: ENV } = process as { env: { [key: string]: string } };

export const MONGO_URI = ENV.MONGO_URI as string;
