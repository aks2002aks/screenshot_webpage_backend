// server.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ImageRoutes from "./routes/ImageRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use("/api", ImageRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
