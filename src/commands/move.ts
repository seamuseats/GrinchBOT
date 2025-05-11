import { Command, CommandBuilderTypes } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, SharedNameAndDescription } from "discord.js";
import { moldMoveLevel } from "../api/apiinteration.js";

export default class MoveCommand extends Command<GuildMember, GrinchBot> {
    getName(): string {
        return "move"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Move a level on the MOLD")
            .addNumberOption(arg => arg.setName("placement").setDescription('The placement to move the level to').setRequired(true))
            .addStringOption(arg => arg.setName("title").setDescription('Title for the level to be moved').setRequired(false))
            .addNumberOption(arg => arg.setName("levelid").setDescription('ID for the level to be moved').setRequired(false));
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        var title: string = msg.options.getString('title');
        var levelid: number = msg.options.getNumber('levelid');
        var placement: number = msg.options.getNumber('placement');

        if(!title && !levelid) msg.reply('Need an identifier for the level to move');
        
        else {
            const response: string = await moldMoveLevel(
                levelid,
                title,
                placement
            );
            msg.reply(response);
            this.bot.log.info(response);
        }
    }
}