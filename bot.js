// imports
import {} from 'dotenv/config'
import Eris from 'eris'
import fetch from 'node-fetch';
import {
	RateLimiter
} from 'discord.js-rate-limiter';

// variables
const bot = new Eris(process.env.TOKEN)
const ENDPOINTS = {
	shiba: 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true',
	cat: 'http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true',
	bird: 'http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true'
}
let rateLimiter = new RateLimiter(1, 1000);

// bot stuff
bot.on("ready", () => {
	console.log("Ready!")
});

bot.editStatus(process.env.STATUS, {
	type: 2,
	name: process.env.STATUS_MESSAGE
})

// functions
function checkMaintenance() {
	if (process.env.STATUS == 'idle') {
		return true;
	}
}

function botFetch(animal, msg) {
	return fetch(ENDPOINTS[animal])
		.then(res => res.json())
		.then(([data]) => {
			bot.createMessage(msg.channel.id, {
				embed: {
					title: `${animal}!`,
					color: 0xE67E22,
					image: {
						url: data
					}
				}
			})
		})
}

// the bot
bot.on("messageCreate", (msg => {
	let limited = rateLimiter.take(msg.author.id);
	if (limited && msg.content.startsWith(process.env.PREFIX)) {
		bot.createMessage(msg.channel.id, "You\'re doing that do often, please try again later!");
		console.log(`${msg.author.username} tried to use a command too often!`);
		return;
	}
	if (msg.author.id === bot.user.id) {
		return;
	} else
	if (msg.content.startsWith(process.env.PREFIX) && checkMaintenance() === true && msg.author.id !== process.env.OWNER) {
		bot.createMessage(msg.channel.id, "Bot currently under maintenance. Please try again later.")
		return;
	} else
	if (msg.content === "s.shiba") {
		botFetch('shiba', msg);
	}
	if (msg.content === "s.bird") {
		botFetch('bird', msg);
	}
	if (msg.content === "s.cat") {
		botFetch('cat', msg);
	}
	if (msg.content === "s.ping") {
		bot.createMessage(msg.channel.id, "Pinging...").then(m => {
			var ping = m.timestamp - msg.timestamp;

			bot.editMessage(msg.channel.id, m.id, {
				content: "",
				embed: {
					title: "Pong!",
					color: 0xE67E22,
					fields: [{
						name: "Ping",
						value: ping + "ms"
					}]
				}
			})
		})
	}
	if (msg.content === "s.help") {
		bot.createMessage(msg.channel.id, {
			embed: {
				title: "ShibaBot Commands",
				color: 0xE67E22,
				fields: [{
					name: "s.shiba",
					value: "Gets a random shiba picture."
				}, {
					name: "s.bird",
					value: "Gets a random bird picture."
				}, {
					name: "s.cat",
					value: "Gets a random cat picture."
				}, {
					name: "s.ping",
					value: "Gets the bot's ping."
				}, {
					name: "s.help",
					value: "This message. Duh"
				}]
			}
		})
	}
}))
bot.connect()
