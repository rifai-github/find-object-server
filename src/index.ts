import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import clientRoute from './route.client';
import errorHandler from './middleware/error.middleware';

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use('/v1', clientRoute);
app.use(errorHandler);

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (msg) => {
        console.log(`Received: ${msg}`);
        io.emit("message", `Server: ${msg}`);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
