/**
 * Express Server Setup
 */
const express = require('express');
const app = express();
const cors = require('cors');

const ImuSchema = require('./models/imuReading');
const EmgSchema = require('./models/emgReading');
const ValidmoveSchema = require('./models/validmove');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const wsPort = 7000;

app.use(cors());
app.use(express.json());

/**
 * Connect to database using mongoose
 */
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const dancemovesRouter = require('./routes/dancemoves');
const dancersRouter = require('./routes/dancers');
const imusRouter = require('./routes/imus');
const emgsRouter = require('./routes/emgs');
const validmovesRouter = require('./routes/validmoves');

app.use('/dancemoves', dancemovesRouter);
app.use('/dancers', dancersRouter);
app.use('/imus', imusRouter);
app.use('/emgs', emgsRouter);
app.use('/validmoves', validmovesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// following code is to establish real-time communication with ultra96
var splitData;
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: wsPort });
wsServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(rawInput) {
        console.log('backend received: %s', rawInput);
        splitData = processRawData(rawInput);
        console.log("after split: ", splitData.toString());
        const realData = insertData(splitData);
        wsServer.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log("client ready");
                // client should only refer to express server
                client.send(realData.toString());
            }
        });
    });


});

function processRawData(rawData) {
    const words = rawData.split(',')
    const newWords = words.map(
        eachWord => {
            return eachWord.replace(/[\[\]'()]/g, '').trim()
        }
    )
    return newWords;

}

function processMAC(macAddr) {
    switch (macAddr) {
        case "50:f1:4a:cc:06:7f":
            return 1;
        case "0c:b2:b7:24:9a:b4":
            return 2;
        case "0c:b2:b7:24:a5:59":
            return 3;
        // emg
        // case "0c:b2:b7:24:a5:01"
    }
}

function insertData(data) {
    console.log(data.toString())
    switch (data.length) {
        // 3 valid move data
        case 6:
            const validmove = new ValidmoveSchema({
                position: data[3],
                danceType: data[4],
                syncDelay: data[5]
            });
            validmove.save(function (err) {
                if (err) return console.error(err);
                console.log("Validmove added successful");
            });
            return validmove;
        // 5 emg reading
        case 8:
            const emg = new EmgSchema({
                dancer: '2',
                //data[1]
                //data[2]
                emg1: data[3],
                emg2: data[4],
                emg3: data[5],
                emg4: data[6],
                emg5: data[7]
            });
            emg.save(function (err) {
                if (err) return console.error(err);
                console.log("Emg sensor reading successful");
            });
            return emg;
        // 6 sensor reading   
        case 9:
            const imu = new ImuSchema({
                dancer: processMAC(data[0]),
                //data[1]
                //data[2]
                wristAccX: data[3],
                wristAccY: data[4],
                wristAccZ: data[5],
                wristGyroX: data[6],
                wristGyroY: data[7],
                wristGyroZ: data[8],
            });
            imu.save(function (err) {
                if (err) return console.error(err);
                console.log("Imu sensor reading successful");
            });
            return imu;
        // not sure data transfer will overlap
        // case 21:
        //     const sensorPlus = new ImuSchema({
        //         dancer: data[0],
        //         wristAccX: data[1],
        //         wristAccY: data[2],
        //         wristAccZ: data[3],
        //         wristGyroX: data[4],
        //         wristGyroY: data[5],
        //         wristGyroZ: data[6],
        //         ankleAccX: data[7],
        //         ankleAccY: data[8],
        //         ankleAccZ: data[9],
        //         ankleGyroX: data[10],
        //         ankleGyroY: data[11],
        //         ankleGyroZ: data[12],
        //         emg1: data[13],
        //         emg2: data[14],
        //         emg3: data[15],
        //         emg4: data[16],
        //         emg5: data[17],
        //     });
        //     sensorPlus.save(function (err) {
        //         if (err) return console.error(err);
        //         console.log("sensor reading with move added successful");
        //     });

        //     const validmovePlus = new ValidmoveSchema({
        //         position: data[18],
        //         danceType: data[19],
        //         syncDelay: data[20]
        //     });
        //     validmovePlus.save(function (err) {
        //         if (err) return console.error(err);
        //         console.log("validmove with sensor reading added successful");
        //     });
        //     return;
        default:
            return;
    }
}
