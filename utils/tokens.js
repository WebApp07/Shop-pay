import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
  console.log("SECRET:", process.env.ACTIVATION_TOKEN_SECRET);

  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};
