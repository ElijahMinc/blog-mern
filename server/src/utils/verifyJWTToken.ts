import jwt from "jsonwebtoken"
import { SECRET_KEY } from ".."

export const verifyJWTToken = (token: string): string | jwt.JwtPayload | { _id: string } => jwt.verify(token, SECRET_KEY)
