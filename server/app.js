var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/prime_weekend_challenge_04';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Get all the messages
app.get('/data', function(req,res){
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {

        var query = client.query("SELECT message_id, user_name, message FROM messages ORDER BY message_id ASC");

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

// Add a new message
app.post('/data', function(req,res){
    //console.log(req);

    var addedMessage = {
        "user_name" : req.body.userNameAdd,
        "message" : req.body.messageAdd
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO messages (user_name, message) VALUES ($1, $2) RETURNING message_id",
            [addedMessage.user_name, addedMessage.message],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });

    });

});

app.delete('/delete:id', function(req,res){
    pg.connect(connectionString, function (err, client) {
        client.query("DELETE FROM messages WHERE message_id = $1", [req.body.id],
            function (err, result) {
                if (err) {
                    console.log("Error deleting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });
    });

});

app.get("/admin", function(req,res){
    var file = req.params[0] || "/views/admin.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
