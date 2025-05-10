import { Bot } from "discord-botinator";
import { Client, GuildMember, Message, TextChannel } from "discord.js";
import EchoCommand from "./commands/echo.js";
import CompleteCommand from "./commands/complete.js";
import MoveCommand from "./commands/move.js";
import PlaceCommand from "./commands/place.js";
import LevelBoardCommand from "./commands/levelboard.js";
import RegisterCommand from "./commands/register.js";

export default class GrinchBot extends Bot<GuildMember> { // Replace GuildMember with your custom user data class
    protected init(): void {
        // Runs syncronously before Discord login

        this.registerCommand(new EchoCommand(this));
        this.registerCommand(new PlaceCommand(this));
        this.registerCommand(new CompleteCommand(this));
        this.registerCommand(new MoveCommand(this));
        this.registerCommand(new LevelBoardCommand(this));
        this.registerCommand(new RegisterCommand(this));
    }

    public async onLogin(c: Client): Promise<void> {
        // Runs once the bot has logged in

        // See documentation for how to make this a command instead of running it on every login
        this.refreshCommands();
        this.log.info('Logcked in');
    }

    public async onMessage(msg: Message): Promise<void> {
        // Runs on every message

        if (msg.author.bot) return; // We don't normally want to respond to bot messages

        if(msg.content.includes('grinch')){
            // Messages can only be sent in TextChannels, so cast it and deal with errors later teehee
            await (msg.channel as TextChannel).send("womp");
        }
    }

    public getUserV2(id: string, guild?: string): GuildMember {
        return this.client.guilds.cache.get(guild).members.cache.get(id);
    }
}
