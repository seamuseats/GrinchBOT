import { Command, CommandBuilderTypes } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, SharedNameAndDescription } from "discord.js";
import { moldMoveLevel, moldRegisterUser } from "../api/apiinteration.js";

export default class RegisterCommand extends Command<GrinchBot> {
    getName(): string {
        return "register"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Register a user on the MOLD")
            .addStringOption(arg => arg.setName("uname").setDescription('*Optional* username. If not supplied will be your discord display name').setRequired(false));
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        var uname: string = msg.options.getString('uname');
        
        const response: string = await moldRegisterUser(
            msg.user.id.toString(),
            uname? uname : msg.user.displayName.toString()
        );
        msg.reply(response);
        this.bot.log.info(response);
    }
}