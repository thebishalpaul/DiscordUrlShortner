const express = require("express");
const app = express();
const shortid = require('shortid');
const {redirectUrl} = require('./controllers/url');
const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = "MTE0MjgwODAwMDk0MDIzMjcyNA.GwPsSE.wZyQKvNXyCcuWmSAC8cqo7dMiN0eR9BEQerIf4";
const { URL } = require('./models/url');

const { connectDb } = require('./conn');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate',async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.startsWith("create")) {
        const url = msg.content.split("create ")[1];

        const shortId = shortid();
        await URL.create({
            shortId: shortId,
            redirectUrl: url,
        });
        return msg.reply({
            content: "Short Id for " + url + " is " + `localhost:3000/${shortId}`
        });
    }
    msg.reply({
        content: "Hi!! Your are now connected with Gennie"
    });

});

client.login(TOKEN);

app.get('/:id',redirectUrl);

connectDb("mongodb://0.0.0.0:27017/discordUrlShortner")
    .then(console.log("connected to db"));
app.listen(3000, () => console.log(`Server running at port 3000`));