// import multer from "multer";

// // Configure Multer for temporary storage
// const upload = multer({ dest: "uploads/" });

// // Middleware to handle single image upload
// export const uploadEventImages = upload.array("images", 5);

// export const uploadProfileImage = upload.single("image");


import multer from "multer";

// ✅ Use memory storage so files stay in buffer (works on Vercel, no disk writes)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB per file (adjust if needed)
  },
});

// For multiple event images
export const uploadEventImages = upload.array("images", 5);

// For single profile image
export const uploadProfileImage = upload.single("image");
