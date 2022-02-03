// Load dependencies
const express = require('express'),
    bodyParser = require('body-parser'),
    winston = require('winston');

const { InfluxDB } = require('@influxdata/influxdb-client')

//the influx connection args
const token = 'SSDZ8-RZvXcNrX_Tqo7dfWED0fALu_1LZB2iSLSpsHncLyEmDro4sBgp7l6bMTpcfHxQv87y2Gm_axoLOYC2bg=='
const org = 'jeanpaultech'
const bucket = 'smart_farm'

// Create a client towards InfluxDB
const client = new InfluxDB({ url: "http://db:8086", token: token })


// Create express application
let app = module.exports = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle incoming data
//we just expose the /data endpoint for the smart farm sensors device here
app.post('/data', function (req, res, next) {
    const { Point } = require('@influxdata/influxdb-client');
    const writeApi = client.getWriteApi(org, bucket);
    writeApi.useDefaultTags({ host: 'host1' });


    const point = new Point('data')
        .intField('device_id', req.body.device_id)
        .tag('device_id', req.body.device_id)
        .timestamp(new Date(req.body.ts).getTime() * 1000000)
        .floatField('water', req.body.water)
        .floatField('air_quality', req.body.air_quality)
        .floatField('soil', req.body.soil)
        .floatField('long', req.body.long)
        .floatField('lat', req.body.lat)
        .floatField('temp', req.body.temp);
    writeApi.writePoint(point);

    writeApi
        .close()
        .then(() => {
            console.log('FINISHE D')
            winston.info(req.body);
            return res.sendStatus(201);
        })
        .catch(e => {
            console.error(e)
            console.log("http://db:8086")
            console.log('Finished ERROR')
            winston.error(e.message);
            return res.sendStatus(500);
        })
});