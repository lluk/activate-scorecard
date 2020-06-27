const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/api/:player', (request, response) => {

    var player = encodeURI(request.params["player"]);

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

app.listen(process.env.PORT || 8080)
