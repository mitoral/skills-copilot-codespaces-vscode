// Create web server
// 1. Create web server
// 2. Read file
// 3. Parse file
// 4. Add new comment
// 5. Save file
// 6. Redirect to home page

// 1. Create web server
var express = require('express');
var app = express();

// 2. Read file
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

// 3. Parse file
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Add new comment
app.post('/api/comments', function (req, res) {
    fs.readFile(commentsPath, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),
        };
        for (var key in req.body) {
            newComment[key] = req.body[key];
        }
        comments.push(newComment);
        fs.writeFile(commentsPath, JSON.stringify(comments), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    }
    );
});