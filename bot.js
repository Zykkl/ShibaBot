import {} from 'dotenv/config'
import Eris from 'eris'
const bot = new Eris(process.env.TOKEN)
const ENDPOINTS = {
	shiba: 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true',
	cat: 'http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true',
	bird: 'http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true'
}
import fetch from 'node-fetch';
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
	if (msg.content === "s.shiba") {
		if (checkMaintenance(msg) === true) {
			bot.createMessage(msg.channel.id, "Bot currently under maintenance. Please try again later.")
		} else
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
		if (checkMaintenance(msg) === true) {
			bot.createMessage(msg.channel.id, "Bot currently under maintenance. Please try again later.")
		} else
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
		if (checkMaintenance(msg) === true) {
			bot.createMessage(msg.channel.id, "Bot currently under maintenance. Please try again later.")
		} else
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
	if (msg.content === "s.shiba --bypass") {
		if (msg.author.id !== process.env.ZYY) {
			return
		} else
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
	if (msg.content === "s.bird --bypass") {
		if (msg.author.id !== process.env.ZYY) {
			return
		} else
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
	if (msg.content === "s.cat --bypass") {
		if (msg.author.id !== process.env.ZYY) {
			return
		} else
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
}))
bot.connect()
