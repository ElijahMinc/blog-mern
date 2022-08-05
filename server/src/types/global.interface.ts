import { Request } from "express";

export interface AuthRequest extends Request {
   userId?: string
}

export interface PostQueryParams {
   $text: { $search: string, $diacriticSensitive: boolean }
   tags: {$in : string[]}
}