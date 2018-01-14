const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();

//Allow CORS
app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
// app.get('/api', function (req, res) {
//   res.send('GET request to the homepage')
// })

// Send all other requests to the Angular app
app.use(require('./server/routes/api'));
app.use(require('./server/routes/users'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../angular/dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);


const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
