# dc-classroom

A Discord bot to configure your server as an interactive classroom with individual sessions with students.

Made with `discord.js`.



### How to use the bot

Clone this repository, then run `npm install`.

In order for the bot to communicate with the discord API, you need to register a bot application at https://discord.com/developers/applications and get its token.

Then, you should create a file named `.env` at the root of the repository, containing `BOT_TOKEN='<your bot token here>'`.
Immediatly add it to .gitignore, since **you should not commit or upload this file**. Do not share your bot token.

In order to properly run the bot, you should invite it to your server and run `npm start` at the root directory.
