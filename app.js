// --- LOADING MODULES
var express = require('express');

// --- INSTANTIATE THE APP
var app = express();

// --- STATIC MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use('/jsPsych', express.static(__dirname + "/jsPsych"));

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/experiment', function(request, response) {
    response.render('reading_span_web_german.html');
});

// --- START THE SERVER
var server = app.listen(process.env.PORT, function(){
    console.log("Listening on port %d", server.address().port);
});


// HERE COMES THE ADDITIONAL PART
// this part is supposed to connect to the PostgresQL Database I created in Heroku

// Connect to Postgres

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
