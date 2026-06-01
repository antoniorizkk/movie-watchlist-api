import express from "express"

const app = express();
const PORT = 5001;

app.get("/hello", ( req, res) => {
    res.json({message:"GET API is runnning "})
});

app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
});

