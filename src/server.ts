import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

// 1️⃣ Declare a variable for the server
let server: Server;

// 2️⃣ Main function to connect to the database and start the server
async function main() {
  try {
    // ✅ Connect to MongoDB (If MongoDB connection fails, it will throw an error)
    await mongoose.connect(config.DB_URL as string);
    console.log('✅ Connected to MongoDB successfully!');

    // ✅ Start the server and save the "server" instance in the variable
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });

  } catch (err) {
    // ❌ If something goes wrong while connecting to MongoDB, log the error
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}

main(); // Call the main function to start the app

/* 
3️⃣ 
💥 UNHANDLED REJECTION 
This happens when we forget to handle a Promise rejection.
Example: 
  Promise.reject('Some error') // No .catch() to handle it, so "unhandledRejection" happens.
Solution: We "listen" for this event globally and gracefully shut down the server.
*/
process.on('unhandledRejection', (error) => {
  console.log(`😈 Oops! Unhandled Promise Rejection occurred:`, error);
  
  // If the server is running, close it safely
  if (server) {
    server.close(() => {
      console.log('🔴 Server is shutting down due to an unhandled rejection.');
      process.exit(1); // Exit the process with status 1 (which means "something went wrong")
    });
  } else {
    process.exit(1); // If no server is running, just exit the process
  }
});

/* 
4️⃣ 
💥 UNCAUGHT EXCEPTION 
This happens when we make a mistake in the code (like dividing by zero, using undefined variables, etc.)
Example: 
  console.log(hello); // "hello" is not defined, so an "uncaughtException" happens.
Solution: We "listen" for this event globally, log the error, and gracefully shut down the server.
*/
process.on('uncaughtException', (error) => {
  console.log(`😈 Oops! Uncaught Exception occurred:`, error);

  // Gracefully shut down the server
  process.exit(1); // Exit the process to avoid keeping the app running in a bad state
});
