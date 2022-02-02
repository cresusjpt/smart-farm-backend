// Load dependencies
const util    = require('util'),
      winston = require('winston'),
      app     = require('./app');

// Define API port
// we will let the opportunities to change it with a environement variable
//if not define the default part will be 1337
let port = process.env.PORT || 1337;

// Run API
app.listen(port, function(){
    winston.info(util.format("server listening on port %s", port));
});