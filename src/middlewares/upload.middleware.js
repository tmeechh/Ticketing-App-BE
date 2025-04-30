import multer from "multer";

// Configure Multer for temporary storage
const upload = multer({ dest: "uploads/" });

// Middleware to handle single image upload
export const uploadImage = upload.single("image");
