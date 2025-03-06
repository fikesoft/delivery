import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes";
var cors = require("cors")

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// Use CORS based on environment
const isDev = process.env.NODE_ENV === "development";
app.use(
  cors({
    origin: process.env.ORIGIN || (isDev ? "http://localhost:5173" : "PROD LINK"),
    credentials: true, // Allow cookies
  })
);

// Connect to database
connectDB();

// API Routes
app.use("/api/register", routes.registerRouter);
app.use("/api/login",routes.loginRouter);
app.use("/api/get-users",routes.usersRouter); 
app.use("/api/create-pizza",routes.createPizzaRouter);
app.use("/api/delete-pizza",routes.deletePizzaRouter);
app.use("/api/get-pizza",routes.getPizzaRouter);
app.use("/api/edit-pizza",routes.editPizzaRouter);




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});
