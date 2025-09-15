import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmailTemplate } from "../../../emails/activateemailtemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required: name, email, and password.",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message:
          "Please provide a valid email address (e.g., user@example.com).",
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message:
          "An account with this email address already exists. Please use a different email or try signing in.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long. Please choose a stronger password.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account.", activateEmailTemplate);
    await db.disconnectDb();
    res.json({
      message:
        "Registration successful! Please check your email and click the activation link to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
