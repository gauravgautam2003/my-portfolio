import Profile from "../models/Profile.model.js";
import cloudinary from "../config/cloudinary.js";

// ─── Helper: Upload buffer to Cloudinary ───────────────────────────────────
const uploadBufferToCloudinary = (buffer, folder = "portfolio/profile") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

// ─── GET Profile ───────────────────────────────────────────────────────────
const getProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne();

        // Auto-create default profile if none exists
        if (!profile) {
            profile = await Profile.create({});
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        console.error("getProfile error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};

// ─── UPDATE Profile ─────────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
    const {
        name, professionalTitle, location, email, phone,
        availability, about, github, linkedin, whatsapp, education,
    } = req.body;

    try {
        let imageUrl;

        // If image file was uploaded, send buffer to Cloudinary
        if (req.file) {
            const result = await uploadBufferToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        // Parse education if sent as JSON string (multipart form)
        let parsedEducation;
        if (education) {
            try {
                parsedEducation = typeof education === "string"
                    ? JSON.parse(education)
                    : education;
            } catch {
                parsedEducation = undefined;
            }
        }

        const updateData = {
            ...(imageUrl          && { profileImage: imageUrl }),
            ...(name              && { name }),
            ...(professionalTitle && { professionalTitle }),
            ...(location          && { location }),
            ...(email             && { email }),
            ...(phone             && { phone }),
            ...(availability      && { availability }),
            ...(about             && { about }),
            ...(github            && { github }),
            ...(linkedin          && { linkedin }),
            ...(whatsapp          && { whatsapp }),
            ...(parsedEducation   && { education: parsedEducation }),
        };

        const profile = await Profile.findOneAndUpdate(
            {},
            updateData,
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        });
    } catch (error) {
        console.error("updateProfile error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};

export { getProfile, updateProfile };