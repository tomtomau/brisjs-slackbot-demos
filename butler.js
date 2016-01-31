require('dotenv').config();
var SlackBot = require('slackbots');

var butlerBot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN, // This pulls from dotenv
	name: 'ButlerBot'
});

var users = [];

butlerBot.getUsers().then(function (body) {
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

butlerBot.on('message', function(data) {
	if (data.type === "message") {
		var messageText = data.text;
		var userId = data.user;

		if (messageText === "hello") {
			// Get the username
			var userName = findUserNameById(userId);

			var messageReply = "Hello " + userName + ", how can I help?";

			// Reply to that user
			butlerBot.postMessageToUser(userName, messageReply, {});
		}
	}
});