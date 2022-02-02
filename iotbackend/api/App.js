// Load dependencies
const express    = require('express'),
      bodyParser = require('body-parser'),
      winston    = require('winston');

const {InfluxDB} = require('@influxdata/influxdb-client')

//the influx connection args
const token = 'Ka36TR1uK3bxLeipl9h9Gu7VlfQvoHrP_4z1J7wgnYACHTQP41VBfw0kYhDWxPouixpk4fGb4zbot41s_AEjOA=='
const org = 'jeanpaultech'
const bucket = 'smart_farm'

// Create a client towards InfluxDB
const client = new InfluxDB({url: "http://db:8086", token: token})


// Create express application
let app = module.exports = express();

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle incoming data
//we just expose the /data endpoint for the smart farm sensors device here
app.post('/data', function(req, res, next){
  const {Point} = require('@influxdata/influxdb-client');
  const writeApi = client.getWriteApi(org, bucket);
  writeApi.useDefaultTags({host: 'host1'});

  
  const point = new Point('data')
                    .intField('device_id',req.body.device_id)
                    .tag('device_id', req.body.device_id)
                    .timestamp(new Date(req.body.ts).getTime() * 1000000)
                    .floatField('soil',req.body.soil)
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
          console.log('Finished ERROR')
          winston.error(e.message);
          return res.sendStatus(500);
      })
});