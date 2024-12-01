import express from "express";
import indexInventoryRoute from "./routes/indexInventoryRoute.js";
import { errorHandler } from "./exceptions/errorHandler.js";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json({extended: true,}));
app.use('/api/inventory', indexInventoryRoute);
//Error handling
app.use(errorHandler);
// Mock Data
app.get("/",(req,res) => {
    res.send("Smart MYC EShop Project")
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
