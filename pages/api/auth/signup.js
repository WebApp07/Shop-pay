import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { createActivationToken } from "../../../utils/tokens";

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
    res.send(addedUser);

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    res.status(201).json({
      message: "User created successfully",
      activation_token,
    });

    console.log("User created:", addedUser);
    console.log("Activation token:", activation_token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
