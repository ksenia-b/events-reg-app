import express from 'express';
import cors from "cors";
import http from "http";
import EventsRoute from "./routes/events.route.js";
import AuthRoute from "./routes/auth.route.js";
import ParticipantsRoute from "./routes/participants.route.js";

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(cors());

app.use("/events", EventsRoute);
app.use("/auth", AuthRoute);
app.use("/participants", ParticipantsRoute);


server.listen(4000, () => console.log('Server is running on port 4000'));


