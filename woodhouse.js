require('dotenv').config();
var SlackBot = require('slackbots');

var woodhouseBot = new SlackBot({
    token: process.env.SLACK_BOT_TOKEN, // This pulls from dotenv
    name: 'Woodhouse',
    icon_url: "https://novelideas19c.files.wordpress.com/2011/12/woodhouse.jpg" 
});

var params = {
    icon_url: "https://novelideas19c.files.wordpress.com/2011/12/woodhouse.jpg"
};

var users = [];
woodhouseBot.getUsers().then(function (body) {
    users = body.members;
});

function findUserNameById(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i].name;
        }
    }
    return null;
}

woodhouseBot.on('message', function(data) {
    if (data.type === "message") {
        // Get the username
        var userName = findUserNameById(data.user);

        if (data.text === "hello") {
            // Construct the reply
            var messageReply = "Hello " + userName + ", how can I help?";

            // Reply to that user
            woodhouseBot.postMessageToUser(userName, messageReply, params);
        } else if (data.text === "bonjour") {
            // Construire la réponse
            var messageReply = "Bonjour " + userName + ", comment puis-je aider?";
            // répondre à cet utilisateur
            woodhouseBot.postMessageToUser(userName, messageReply, params);
        }
    }
});