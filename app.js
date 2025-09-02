import express from 'express';
// import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import './src/v1/services/cronJobs.js'; 

import connectDB from './src/config/connectDB.js';
import notFound from './src/middlewares/notFound.js';
import { errorMiddleware } from './src/middlewares/error.js';

import authRoutesV1 from './src/v1/routes/auth.routes.js';
import eventRoutesV1 from './src/v1/routes/event.routes.js';
import ticketRoutesV1 from './src/v1/routes/ticket.routes.js';
import webhookRoutesV1 from './src/v1/routes/webhook.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ Must match your frontend origin
    credentials: true, // ✅ Required for cookies/auth headers
  })
);

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/',
//   })
// );
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/events', eventRoutesV1);
app.use('/api/v1/tickets', ticketRoutesV1);
app.use('/api/v1/webhook', webhookRoutesV1);
// app.use("/api/v1/admin", adminRoutes);
app.use(notFound);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.DB_URI);
    console.log(`DB Connected!`);
    app.listen(port, () => console.log(`Server is listening on PORT:${port}`));
  } catch (error) {
    console.log(`Couldn't connect because of ${error.message}`);
    process.exit(1);
  }
};

startServer();
