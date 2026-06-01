import express from "express"

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({message:"GET API running from MOVIES ROUTER"});
});

router.get("/:id", async(req, res) => {
    res.status(200).json({message:"GET API running from MOVIES ROUTER"})
})

router.post("/:id", async (req, res) => {
    res.status(201).json({message:"POST API running from MOVIES ROUTER"});
});

router.put("/:id", async (req, res) => {
    res.status(200).json({message:"PUT API running from MOVIES ROUTER"});
});

router.delete("/:id", async (req, res) => {
    res.status(200).json({message:"DELETE API running from movies ROUTER"});
});

export default router;