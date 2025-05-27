import { Command, CommandBuilderTypes, settingsHelper } from "discord-botinator";
import GrinchBot from "../bot.js";
import { CacheType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from "discord.js";
import { moldPlaceLevel } from "../api/apiinteration.js";

export default class PlaceCommand extends Command<GrinchBot> {
    getName(): string {
        return "place"
    }

    create(): CommandBuilderTypes {
        return new SlashCommandBuilder()
            .setName(this.getName())
            .setDescription("Place a level on the MOLD");
    }

    async execute(msg: ChatInputCommandInteraction<CacheType>, user: GuildMember) {
        var title: string;
        var levelid: number;
        var placement: number;
        var video: string;
        var author: string;
        await settingsHelper(msg.user as unknown as GuildMember, msg.reply.bind(msg), new EmbedBuilder().setTitle("Mold placement UI"), [
            { default: "Pending Title", name: "Title", desc: "Set the title for the level", on_change: async i => title = i, validate: i => true },
            { default: Infinity, name: "Level ID", desc: "GD Level ID for level being placed", on_change: async i => levelid = i, validate: i => true },
            { default: Infinity, name: "Placement", desc: "The place on the list", on_change: async i => placement = i, validate: i => true },
            { default: "Nothing here yet", name: "Video", desc: "Add a video link to the MOLD entry", on_change: async i => video = i, validate: i => true },
            { default: "Nothing here yet", name: "Author", desc: "Set the author of the level", on_change: async i => author = i, validate: i => true },
        ]);
        await moldPlaceLevel(
            levelid,
            title,
            msg.user.id, //the victor
            placement,
            video,
            author
        );
    }
}