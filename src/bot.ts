import { Bot } from "discord-botinator";
import { Client, GuildMember, Message, TextChannel } from "discord.js";
import EchoCommand from "./commands/echo.js";

export default class ExampleBot extends Bot<GuildMember> { // Replace GuildMember with your custom user data class
    protected init(): void {
        // Runs syncronously before Discord login

        this.registerCommand(new EchoCommand(this));
    }

    public async onLogin(c: Client): Promise<void> {
        // Runs once the bot has logged in

        // See documentation for how to make this a command instead of running it on every login
        this.refreshCommands();
    }

    public async onMessage(msg: Message): Promise<void> {
        // Runs on every message

        if (msg.author.bot) return; // We don't normally want to respond to bot messages

        // Messages can only be sent in TextChannels, so cast it and deal with errors later teehee
        await (msg.channel as TextChannel).send("womp");
    }

    public getUserV2(id: string, guild?: string): GuildMember {
        return this.client.guilds.cache.get(guild).members.cache.get(id);
    }
}
