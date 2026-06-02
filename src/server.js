import express from "express"
import "dotenv/config"
import db from "./config/db.js"

// Import Routes
import moviesRouter from "./routes/movies.routes.js"
import authRouter from "./routes/auth.routes.js"

db.connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());
// API Routes
app.use("/movies", moviesRouter);
app.use("/auth", authRouter)

app.get("/", ( req, res) => {
    res.json({message:"GET API from server.js running "})
});

app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
});

