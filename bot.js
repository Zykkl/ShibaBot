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
	const taggedUser = message.mentions.users.first();
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

	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			const ownAvatarEmbed = new MessageEmbed()
				.setImage(message.author.displayAvatarURL())
				.setTitle(message.author.username + '\'s Avatar');
			// return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
			return message.channel.send({ embeds: [ownAvatarEmbed] });
		}
		return message.channel.send(`${taggedUser.username}'s avatar link: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
	}

	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 2) {
			return message.reply('Number needs to be higher than 2');
		}
		else if (amount >= 100) {
			return message.reply('Number needs to be lower than 100');
		}
		message.channel.bulkDelete(amount);
		return message.reply('Pruned ' + (amount - 1) + ' messages!');
	}
});

client.login(token);
