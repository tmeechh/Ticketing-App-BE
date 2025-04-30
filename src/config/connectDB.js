// import mongoose from "mongoose";

// const connectDB = async (url) => {
//   return await mongoose.connect(url, {
//      dbName: "TicketingAppCluster",
//   });
// };

// export default connectDB;







import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      dbName: "TicketingAppCluster",
      family: 4, // Force IPv4
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

