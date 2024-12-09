import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server; // Declare server variable here

// Main function to handle DB connection and app listening
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.DB_URL as string);
    console.log('Connected to MongoDB');

    // Start the Express app and assign it to the 'server' variable
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected, shutting down ...`);
  process.exit(1);
});
