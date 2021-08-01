const Discord = require('discord.js');
const {
    prefix,
    token
} = require('./config.json');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'shiba')
        fetch("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => console.log(data[0]));
    channel.send(embed)
});

client.login(token);