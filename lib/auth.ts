import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch {
    return null;
  }
}