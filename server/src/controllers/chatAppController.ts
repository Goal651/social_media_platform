import { Server } from "socket.io"
const chatMaster = (io: Server) => {

    io.on('connection', (socket) => {
        console.log('a user connected')
    })


}

export default chatMaster