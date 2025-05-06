import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

const io = new Server(4040, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"],
    },
})

io.use((socket, next) => {
    try {
        
        const cookies = socket.handshake.headers.cookie;
        if (!cookies) {
            console.log("No cookies found in headers");
            return next(new Error("No cookies found"));
        }

        const token = cookies
            .split("; ")
            .find(
                (cookie) =>
                    cookie.startsWith("next-auth.session-token=") ||
                    cookie.startsWith("__Secure-next-auth.session-token=")
            )
            ?.split("=")[1];

        if (!token) {
            console.log("No token found in cookies");
            return next(new Error("No token found"));
        }

        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        socket.data.user = user;
        next();
    } catch (error) {
        console.log("Error in middleware:", error);
        next(new Error("Authentication error"));
    }
});

io.on("connection", (socket: Socket) => {
    console.log("User connected with ID:", socket.id);
    console.log("User data:", socket.data.user);
    
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});