import { logger } from './logger.service.js'
import { Server } from 'socket.io'

var gIo = null

export const socketService = {
    setupSocketAPI
}

function setupSocketAPI(server) {
    gIo = new Server(server, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)

        socket.on('disconnect', () => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('codeUpdated', () => {
            logger.info(`codeUpdated request from client [id: ${socket.id}], broadcasting...`)
            socket.broadcast.emit('codeUpdated')
        })
    })
}
