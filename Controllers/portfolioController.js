const nodemailer = require("nodemailer");

// Load environment variables (if using a .env file)
require("dotenv").config();

// Replace these with your actual Elastic Email credentials and settings
const elasticEmailUser =
  process.env.ELASTIC_EMAIL_USER || "sayyed078680@gmail.com";
const elasticEmailApiKey =
  process.env.ELASTIC_EMAIL_API_KEY || "F1C74C698B83273C7AD077E4F9D5418AD507";

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525, // Elastic Email's SMTP port (25, 2525, 587, or 465)
  secure: false, // true for 465, false for other ports
  auth: {
    user: elasticEmailUser,
    pass: elasticEmailApiKey,
  },
});

const sendEmailcontrollers = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "Please add all the fields",
      });
    }

    // Email content
    await transporter.sendMail({
      to: "sayyed078680@gmail.com",
      from: "sayyed078680@gmail.com",
      subject: "Regarding portfolio app",
      html: `<h5>Detail Information</h5>
            <ul>
                <li><p>Name: ${name}</p></li>
                <li><p>Email: ${email}</p></li>
                <li><p>Message: ${msg}</p></li>
            </ul>`,
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    // Log the error to get more information
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = { sendEmailcontrollers };
