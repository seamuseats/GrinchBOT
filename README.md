# Botinator template

(WIP)

Steps:

1. Clone this and the [botinator](https://github.com/kinderhead/botinator) repository.
1. In the botinator directory, run `npm install` and `npm run build`.
1. In this directory, run `npm install path/to/botinator`.
1. Create or setup a Discord bot through the developer portal.
1. Make sure that all privileged gateway intents are selected.
1. Create a `.env` file in the root of the template directory with the following contents according to the developer portal:
```
DISCORD_CLIENT=<APPLICATION_ID>
DISCORD_SECRET=<SECRET>
```
7. Run `npm run start` (may cause issues closing) or use VSCode to run your bot.
