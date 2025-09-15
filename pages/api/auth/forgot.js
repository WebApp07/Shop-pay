import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "If this email exists in our system, we've sent a password reset link",
      });
    }

    const user_id = createResetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your Password.", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message:
        "A password reset link has been sent to your email. Please check your inbox or junk/spam folder to continue.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
