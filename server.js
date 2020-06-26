const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.get('/api/:player', (request, response) => {

    var player = request.params["player"];

    var https = require('https');
    var options = {
        host: 'scores.activate.ca',
        path: `/api/player/${player}`
    };

    var req = https.get(options, function(res) {
        res.on('data', function(chunk) {
            response.write(chunk);
        }).on('end', function() {
            response.end();
        })
    });
})
app.listen(8080)
