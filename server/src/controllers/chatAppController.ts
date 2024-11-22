import { Server, Socket } from "socket.io";

// Store active sockets and their associated users
const userSockets = new Map<string, string>(); // Maps user email to socket ID
const rooms: { [key: string]: Set<string> } = {}; // Maps room names to sets of socket IDs

const chatMaster = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        // When a user joins a room
        socket.on("joinRoom", (room: string) => {
            console.log(`Socket ${socket.id} joining room: ${room}`);
            // Add socket to room
            if (!rooms[room]) {
                rooms[room] = new Set();
            }
            rooms[room].add(socket.id);
            socket.join(room);
            io.to(room).emit("message", `${socket.id} has joined the room.`);
        });

        // Handle user sending messages
        socket.on("message", (msg: string) => {
            console.log(`Message from ${socket.id}: ${msg}`);
            // Broadcast the message to all sockets in the room
            socket.broadcast.emit("message", msg);
        });

        // When a user disconnects
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // Remove from any rooms
            for (const room in rooms) {
                if (rooms[room].has(socket.id)) {
                    rooms[room].delete(socket.id);
                    io.to(room).emit("message", `${socket.id} has left the room.`);
                }
            }
            userSockets.delete(socket.id); // Remove user from the map
        });

        // Example: Assign a user socket to a specific email (mock token validation)
        socket.on("setUser", (email: string) => {
            userSockets.set(email, socket.id);
            console.log(`User ${email} connected with socket ID: ${socket.id}`);
        });
    });
};

export default chatMaster;
