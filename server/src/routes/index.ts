const Router = require('express').Router

import authRouter from './auth.router'
import userRouter from './user.router'
import postRouter from './post.router'
import commentsRouter from './comments.router'
import socketRouter from './socket.router'


const configRouter = new Router();


configRouter.use(authRouter)
configRouter.use(userRouter)
configRouter.use(postRouter)
configRouter.use(commentsRouter)
configRouter.use(socketRouter)


export default configRouter