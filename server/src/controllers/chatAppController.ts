import { Server, Socket } from "socket.io";

const userSockets = new Map<string, Set<string>>();  // Stores multiple socket IDs per user
const rooms: { [key: string]: Set<string> } = {};



const handleJoinRoom = (socket: Socket, room: string, io: Server) => {
    if (!rooms[room]) rooms[room] = new Set();
    rooms[room].add(socket.id);
    socket.join(room);
    io.to(room).emit("message", `${socket.id} has joined the room.`);
    console.log(`Socket ${socket.id} joined room: ${room}`);
};

const handleMessage = (socket: Socket, msg: string) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    socket.broadcast.emit("message", msg);
};


const handleSetUser = (socket: Socket, email: string) => {
    if (!userSockets.has(email)) {
        userSockets.set(email, new Set());
    }
    const socketSet = userSockets.get(email);
    socketSet?.add(socket.id);
    console.log(`User ${email} connected with socket ID: ${socket.id}`);
    socket.emit('notification', 'You are now connected' );
};

const handleDisconnect = (socket: Socket, io: Server) => {
    console.log(`User disconnected: ${socket.id}`);

    for (const room in rooms) {
        if (rooms[room].has(socket.id)) {
            rooms[room].delete(socket.id);
            io.to(room).emit("message", `${socket.id} has left the room.`);
        }
    }

    for (const [email, sockets] of userSockets.entries()) {
        if (sockets.has(socket.id)) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
                userSockets.delete(email);  // Clean up user if no sockets remain
            }
            break;
        }
    }
};

const sendNotificationToUser = (email: string, message: string, io: Server) => {
    const sockets = userSockets.get(email);
    if (sockets && sockets.size > 0) {
        sockets.forEach(socketId => {
            io.to(socketId).emit("notification", message);
        });
        console.log(`Notification sent to ${email} on all connected devices.`);
    } else {
        console.warn(`No active connections for user ${email}`);
    }
};

const chatMaster = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("joinRoom", (room: string) => handleJoinRoom(socket, room, io));
        socket.on("message", (msg: string) => handleMessage(socket, msg));
        socket.on("setUser", (email: string) => handleSetUser(socket, email));
        socket.on("disconnect", () => handleDisconnect(socket, io));
        socket.on("sendNotificationToUser", (email: string, message: string) => {
            sendNotificationToUser(email, message, io);
        });
    });
};


export default chatMaster;
