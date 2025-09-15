import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
import bcrypt from "bcryptjs";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({
        message:
          "User not found. Please check the link or request a new reset password email.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    await user.updateOne({
      password: cryptedPassword,
    });
    res.json({ email: user.email });
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
