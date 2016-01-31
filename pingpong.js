require('dotenv').config();
var SlackBot = require('slackbots');

var pingPongBot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN, // This pulls from dotenv
	name: 'PingPongBot'
});

pingPongBot.on('message', function(data) {
	if (data.type === "message") {
		var messageText = data.text;

		if (messageText === "ping") {
			pingPongBot.postMessageToUser('tom', 'pong', {});
		}
	}
});