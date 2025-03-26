"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const route_client_1 = __importDefault(require("./route.client"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/v1', route_client_1.default);
app.use(error_middleware_1.default);
exports.io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("message", (msg) => {
        console.log(`Received: ${msg}`);
        exports.io.emit("message", `Server: ${msg}`);
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map