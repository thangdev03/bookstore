import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: For all
app.use(cors());

// Option 2: Custom permission
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// );

app.get("/", (request, response) => {
   console.log(request);
   return response.status(234).send("Welcome to MERN Stack Project"); 
});

app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listining on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

