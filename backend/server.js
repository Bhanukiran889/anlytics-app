const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const analyticsRoutes = require('./router/analytics');
const authRoutes = require('./router/auth');
const { errorHandler } = require('./middleware/errorHandler');
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: [
      "https://anlytics-app-six.vercel.app", // deployed frontend on Vercel
    "http://localhost:5173"      // local dev frontend
  ],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.get("/api/health", (req, res) => {
    res.send("API is running...");
});


app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);


// Create HTTP server and setup Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.set('io', io);

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});