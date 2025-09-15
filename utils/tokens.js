import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
  console.log("SECRET:", process.env.ACTIVATION_TOKEN_SECRET);

  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "4d",
  });
};

export const createResetToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "6h",
  });
};
