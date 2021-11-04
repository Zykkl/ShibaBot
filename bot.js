import {} from 'dotenv/config'
import Eris from 'eris'
import fetch from 'node-fetch';
const bot = new Eris(process.env.TOKEN)
import * as fs from 'fs/promises';
const ENDPOINTS = {
	shiba: 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true',
	cat: 'http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true',
	bird: 'http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true'
}
bot.on("ready", () => {
	console.log("Ready!")
});

function checkMaintenance() {
	if (process.env.STATUS == 'idle') {
		return true;
	}
}

bot.editStatus(process.env.STATUS, {
	type: 2,
	name: process.env.STATUS_MESSAGE
})

bot.on("messageCreate", (msg => {
	if (msg.author.id === bot.user.id) {
		return;
	}
	fs.readFile('blocked.txt', function (err, data) {
		if (err) {
			throw err;
		}
		if (msg.content.startsWith(process.env.PREFIX) && data.includes(msg.author.id)) {
			bot.createMessage(msg.channel.id, "Zy banned you from using my commands. If you think your ban isn\'t justified, consider contacting Zy through Discord (Zyy#1702).")
			return
		}
	})
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
