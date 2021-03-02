import jwt from "jsonwebtoken";

export const jwtgen = (user_id: number): string => {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, "thisIsSecret", { expiresIn: "1d" });
};
