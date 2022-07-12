import { Request, Response, Router } from "express";
import PostController from "../controllers/PostController/PostController";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";


const postRouter = Router()

postRouter.get(PostController.getOnePostUrl, authMiddleware, corsMiddleware, PostController.getOne)
postRouter.get(PostController.getAllPostUrl, authMiddleware, corsMiddleware, PostController.getAll)
postRouter.get(PostController.getPopularPostsUrl, authMiddleware, corsMiddleware, PostController.getPopular)
postRouter.get(PostController.getTagsByPopularPostsUrl, authMiddleware, corsMiddleware, PostController.getTagsByPopularPost)

postRouter.post(PostController.createPostUrl,authMiddleware, corsMiddleware,  PostController.createPost)
postRouter.put(PostController.updatePostUrl,authMiddleware, corsMiddleware, PostController.updatePost)
postRouter.put(PostController.updateLikeUrlPost,authMiddleware, corsMiddleware, PostController.likePost)
postRouter.delete(PostController.deletePostUrl,authMiddleware, corsMiddleware, PostController.deletePost)



export default postRouter