import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControllerInterface } from "../types/controller.interface";

export class HttpRequest implements ControllerInterface {

  async get(req: Request, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }
   async put(req: Request, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with put'
         })
      }
   }
   async post(req: Request, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with post'
         })
      }
   }
   async delete(req: Request, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with delete'
         })
      }  
   }



}