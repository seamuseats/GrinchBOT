import { Command, CommandBuilderTypes } from "discord-botinator";
import ExampleBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default class EchoCommand extends Command<GuildMember, ExampleBot> {
    getName(): string {
        return "echo"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Echo the parameter")
            .addStringOption(arg => arg.setName("arg").setDescription("Parameter to echo").setRequired(true));
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        await msg.reply(msg.options.getString("arg"));
    }
}