var path = require("path");

// bring in the list of friends
var friends = require('/data/friends.js')

module.exports = function (app) {
    app.get(/api/friends, function (req, res) {
        res.json(friends);
    });
    app.post('/api/friends', function (req, res) {
        var input = req.body;
        var responses = input.scores
        var matchImage = "";
        var matchName = "";
        var totalDifference = 50000

        for (var i = 0; i < friends.length; i++) {
            var different = 0;
            for (var j = 0; j < responses.length; j++) {
                different += Math.abs(friends[i].scores[j] - responses[j]);
            }
            if (different < totalDifference) {
                matchName = friends[i].name;
                matchImage = friends[i].pic;

            }
        }
        friends.push(input);
        res.json({ status: "good", matchImage: matchImage, matchName: matchName });
    });

};