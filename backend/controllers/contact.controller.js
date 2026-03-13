import Contact from "../models/Contact.model.js";
import nodemailer from "nodemailer";
import ENV from "../config/env.js";
import generateToken from "../config/token.js";


const sendMessage = async (req, res) => {

    const { name, email, subject, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: ENV.MY_EMAIL,
                pass: ENV.MY_PASSWORD
            }
        });

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        newContact.save();
        const info = await transporter.sendMail({
            from: email,
            to: ENV.MY_EMAIL,
            subject: subject,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });
        // 2️⃣ Auto Reply to User
        await transporter.sendMail({
            from: "yourgmail@gmail.com",
            to: email,
            subject: "Thank you for contacting us",
            html: `
                <div style="font-family: Arial; padding:20px">
                    <h2>Hello ${name} 👋</h2>
                    <p>Thank you for contacting us.</p>
                    <p>We received your message and our team will reply soon.</p>

                    <h3>Your Message:</h3>
                    <p>${message}</p>

                    <br>
                    <p>Best Regards</p>
                    <p><strong>Your Company / Portfolio</strong></p>
                </div>
                `
        });

        const token = generateToken({ userId : email._id });

        res.status(200).json({
            message: "Message sent and auto reply delivered",
            token: token,
            info,
            newContact
        });

    } catch (error) {

        res.status(500).json({
            error: "Mail Sending Failed",
            details: error.message
        });

    }
};

export default sendMessage;