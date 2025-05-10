import { Command, CommandBuilderTypes } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { moldCompleteLevel } from "../api/apiinteration.js";

export default class CompleteCommand extends Command<GuildMember, GrinchBot> {
    getName(): string {
        return "complete"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Complete a level")
            .addNumberOption(arg => arg.setName("levelid").setDescription("Level ID").setRequired(false))
            .addStringOption(arg => arg.setName("title").setDescription("Level Title").setRequired(false));
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        if (!msg.options.getNumber('levelid') && !msg.options.getString('title')) msg.reply('stupid plinker I need to know what level you completed');
        else{
            moldCompleteLevel(
                msg.options.getNumber('levelid'),
                msg.options.getString('title'),
                msg.user.id
            );
            msg.reply(`added ${msg.user.displayName} to victors`);
        }
    }
}