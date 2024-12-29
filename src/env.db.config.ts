import http from 'http';
import dotenv from 'dotenv';
import { app } from './index';
import mongoose from 'mongoose';
import { seedUsers } from './seed';
dotenv.config();

export const { PORT, MONGODB_URI, SECRET } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined.');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('📦 MongoDB connected successfully.');

    mongoose.connection.on('connected', () => {
      console.log('📦 Mongoose connected to MongoDB.');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📦 Mongoose disconnected from MongoDB.');
    });

    mongoose.connection.on('error', (error: Error) => {
      console.error('📦 Mongoose connection error:', error);
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log(
        '📦 Mongoose connection closed due to application termination.'
      );
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);

    process.exit(1);
  }
};

export const startServer = async () => {
  const server = http.createServer(app);
  await connectDB();
  await seedUsers();

  server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};
