import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navBar"
import DancemovesList from "./components/listDanceMoves";
import ImuReadingList from "./components/listImuReadings";
import ValidmoveList from "./components/listValidMoves";
import EditDancemove from "./components/editDanceMove";
import CreateDancemove from "./components/createDanceMove";
import CreateDancer from "./components/createDancer";
import DisplaySensorReading from "./components/displaySensorReading";

function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/dancemoves" component={DancemovesList} />
            <Route path="/sensorReadings" component={ImuReadingList} />
            <Route path="/validmoves" component={ValidmoveList} />
            <Route path="/edit/:id" component={EditDancemove} />
            <Route path="/createDancemove" component={CreateDancemove} />
            <Route path="/createDancer" component={CreateDancer} />
            <Route path="/dashboard" component={DisplaySensorReading} />
        </Router>
    );
}

// const webSocketsServerPort = 7000;
// const webSocketServer = require('websocket').server;
// const http = require('http');
// // Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// const wsServer = new webSocketServer({
//     httpServer: server
// });
//
// wsServer.on('request', function(request) {
//     console.log('react server side connected');
// });

export default App;
