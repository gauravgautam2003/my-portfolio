import Profile from "../models/profile.model.js";
import cloudinary from "../config/cloudinary.js";

async function profileChanges(req, res){
    const {profileImage, professionalTitle, about} = req.body;
    try {
        // Upload the image to Cloudinary
        const image = await cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ message: "Image upload failed" });
                }
                // Update the profile with the new image URL and other details
                    updateProfile(result.secure_url);
            }
        );

        const profile = await Profile.findOneAndUpdate(
            {
                profileImage : image.secure_url,
                professionalTitle,
                about
            },
            {new : true, upsert : true}
        );

        req.status(200).json({
            message : "About data successfully updated",
            success : true,
            profile
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "About data error !"});
    }

}

export default profileChanges