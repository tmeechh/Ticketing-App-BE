import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/v1/models/user.model.js";
import { hashPassword} from './src/utils/validationUtils.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    const adminEmail = "eventhorizon@us.com"; // set your preferred email
    const adminPassword = "honesty@01"; // set strong password

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
    } else {
      const hashedPassword = await hashPassword(adminPassword, 10);

      await User.create({
        fullName: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        roles: ["admin"],
        isEmailVerified: true,
      });

      console.log("✅ Admin created successfully");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
