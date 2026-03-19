import multer from 'multer';

// Configure multer with memory storage for Cloudinary compatibility
// Files are stored in memory as buffers, avoiding local disk writes
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};


// Single file upload middleware (for profile images, etc.)
export const uploadSingle = multer({
    storage,
    fileFilter,
});

