import {} from 'dotenv/config'
import Eris from 'eris'
const bot = new Eris(process.env.TOKEN)
const ENDPOINTS = {
    shiba: 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true',
}
import fetch from 'node-fetch';
bot.on("ready", () => {
    console.log("Ready!")
});

bot.on("messageCreate", (msg => {
    if (msg.content === "s.shiba") {
        fetch(ENDPOINTS.shiba, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(([data]) => {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        title: "Shiba!",
                        url: data.url,
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
