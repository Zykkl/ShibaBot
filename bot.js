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
const blocked = [];
const warn1 = [];
const warn2 = [];
const warn3 = [];
let rateLimiter = new RateLimiter(1, 2000);

// bot stuff
bot.on("ready", () => {
	console.log("Ready!")
});

bot.editStatus(process.env.STATUS, {
	type: 2,
	name: process.env.STATUS_MESSAGE
})

function checkMaintenance() {
	if (process.env.STATUS == 'idle') {
		return true;
	}
}

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
	if (msg.content.startsWith(process.env.PREFIX) && checkMaintenance() === true) {
		bot.createMessage(msg.channel.id, "Bot currently under maintenance. Please try again later.")
		return;
	} else
	if (msg.content === "s.shiba") {
		fetch(ENDPOINTS.shiba, {
				method: 'GET',
			})
			.then(res => res.json())
			.then(([data]) => {
				bot.createMessage(msg.channel.id, {
					embed: {
						title: "Shiba!",
						color: 0xE67E22,
						image: {
							url: data
						}
					}
				})
			})
	}
	if (msg.content === "s.bird") {
		fetch(ENDPOINTS.bird, {
				method: 'GET',
			})
			.then(res => res.json())
			.then(([data]) => {
				bot.createMessage(msg.channel.id, {
					embed: {
						title: "Bird!",
						color: 0xE67E22,
						image: {
							url: data
						}
					}
				})
			})
	}
	if (msg.content === "s.cat") {
		fetch(ENDPOINTS.cat, {
				method: 'GET',
			})
			.then(res => res.json())
			.then(([data]) => {
				bot.createMessage(msg.channel.id, {
					embed: {
						title: "Cat!",
						color: 0xE67E22,
						image: {
							url: data
						}
					}
				})
			})
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
