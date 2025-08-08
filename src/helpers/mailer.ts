import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    if (!userId) {
      throw new Error("User ID is required for sending emails.");
    }

    // hash the userId to make a token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // create transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "937d80fed619e8",
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // link for the email
    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/forgotpassword?token=${hashedToken}`;

    // email content
    const mailOptions = {
      from: "harsh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Reset your password",
      html: `
        <p>${
          emailType === "VERIFY"
            ? "Click the link below to verify your account:"
            : "Click the link below to reset your password:"
        }</p>
        <a href="${link}">${link}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Error in sendEmail:", error);
    throw new Error(error.message || "Failed to send email");
  }
};
