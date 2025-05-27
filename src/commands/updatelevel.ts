import { Command, CommandBuilderTypes, settingsHelper } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from "discord.js";
import { moldPlaceLevel } from "../api/apiinteration.js";

export default class UpdateCommand extends Command<GrinchBot> {
    getName(): string {
        return "updatelevel"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Update a level on the mold");
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        var title: string;
        var levelid: number;
        var placement: number;
        var video: string;
        var author: string;
        await settingsHelper(msg.user as unknown as GuildMember, msg.reply.bind(msg), new EmbedBuilder().setTitle("Mold placement UI"), [
            { default: "Pending Title", name: "Title", desc: "Set the title for the level", on_change: async i => title = i, validate: i => true },
            { default: null, name: "Level ID", desc: "GD Level ID for level being placed", on_change: async (i: number) => levelid = i, validate: (i: number) => true },
            { default: "Nothing here yet", name: "Video", desc: "Add a video link to the MOLD entry", on_change: async i => video = i, validate: i => true },
            { default: "Nothing here yet", name: "Author", desc: "Set the author of the level", on_change: async i => author = i, validate: i => true },
        ]);
        // await moldUpdateLevel(
        //     levelid,
        //     title,
        //     video,
        //     author
        // );
    }
}