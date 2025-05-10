# GrinchBot
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/seamuseats/MoldAPI)


GrinchBot is a discord bot primarily used for managing the MSSM Official List of Demons (MOLD).

So far it just talks to [my backend](https://github.com/seamuseats/MoldAPI) and the GDDL

Future features hopefully soon to come!

## Running Grinchbot

Steps:

1. Run `npm install`.
1. Create or setup a Discord bot through the developer portal.
1. Make sure that all privileged gateway intents are selected.
1. Create a `.env` file in the root of the template directory with the following contents according to the developer portal:
```
DISCORD_CLIENT=<APPLICATION_ID>
DISCORD_SECRET=<SECRET>
```
7. Run `npm run start` (may cause issues closing) or use VSCode to run your bot.
