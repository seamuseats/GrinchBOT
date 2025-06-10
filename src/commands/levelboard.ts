import { Command, CommandBuilderTypes, expandAndHandleEmbed } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder, SharedNameAndDescription, EmbedBuilder, APIEmbedField } from "discord.js";
import { moldLevelBoard, moldMoveLevel } from "../api/apiinteration.js";

export default class LevelBoardCommand extends Command<GrinchBot> {
    getName(): string {
        return "levelboard"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Level Leaderboard")
            .addNumberOption(arg => arg.setName("entries").setDescription('The number of list entries to show').setRequired(false))
            .addBooleanOption(arg => arg.setName("personal-list").setDescription('Show levels only for this user (Not implemented)').setRequired(false));
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        var entries: number = msg.options.getNumber('entries');
        var personalList: boolean = msg.options.getBoolean('personal-list');

        await msg.deferReply();

        if(!entries){
            entries = 15;
            this.bot.log.info("No levelboard size supplied, defaulting to 15.");
        }
        
        const response: any = await moldLevelBoard(
            entries
        );

        this.bot.log.info(`recived ${JSON.stringify(response)} from mold API`);

        var levelBoard: APIEmbedField[] = [];
        for(var i = 0; i < entries && i < response.length; i++){
            if(response[i].video){
                levelBoard.push({ name: `${response[i].place}. ${response[i].title}`, value: `[Video](${response[i].video})` });
            }
            else{
                levelBoard.push({ name: `${response[i].place}. ${response[i].title}`, value: `plink` });
            }
        }

        await expandAndHandleEmbed(new EmbedBuilder().setTitle('Levels Leaderboard'), levelBoard, 25, msg.editReply.bind(msg) as any); // .editReply.bind(msg) as any);
    }
}