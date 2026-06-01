import express from "express"
import "dotenv/config"

const app = express();
const PORT = process.env.PORT;

app.get("/hello", ( req, res) => {
    res.json({message:"GET API is runnning "})
});

app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
});

