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

        socket.on('join', (codeId) => {
            socket.join(codeId)
            const room = gIo.sockets.adapter.rooms.get(codeId)
            if (room.size === 1) {
                socket.emit('mentor')
            } else {
                socket.emit('student')
            }
        })
    
        socket.on('disconnect', () => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('codeUpdated', (codeId) => {
            logger.info(`codeUpdated request from client [id: ${socket.id}], broadcasting...`)
            socket.to(codeId).emit('codeUpdated')
        })
    })
}
