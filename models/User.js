import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [50, "Name must be less than 50 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
