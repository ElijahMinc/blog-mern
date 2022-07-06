import { Request } from "express";
import  fileUpload from "express-fileupload";

export interface AuthRequest extends Request {
   userId?: string
}