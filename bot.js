const {
	Client,
	MessageEmbed,
} = require('discord.js');
const {
	prefix,
	token,
} = require('./config.json');
const client = new Client({
	intents: ['GUILDS', 'GUILD_MESSAGES'],
});
const fetch = require('node-fetch').default;
const ENDPOINTS = {
	shiba: 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true',
};

client.once('ready', () => {
	console.log('Ready!');
});

// commands
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const channel = client.channels.cache.get(message.channel.id);
	if (command === 'shiba') {
		fetch(ENDPOINTS.shiba, {
			method: 'GET',
		})
			.then(res => res.json())
			.then(([data]) => {
				const embed = new MessageEmbed()
					.setColor('#E67E22')
					.setImage(data)
					.setTitle('Shiba!')
					.setURL(data);
				channel.send({
					embeds: [embed],
				});
			});
	}
});

client.login(token);
