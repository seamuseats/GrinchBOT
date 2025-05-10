import { Client, GatewayIntentBits } from "discord.js";
import GrinchBot from "./bot.js";
import { configDotenv } from "dotenv";

configDotenv();

(async () => {
    var bot = new GrinchBot(process.env["DISCORD_CLIENT"], process.env["DISCORD_SECRET"], new Client(
        {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
        }
    ));

    await bot.run();
})();