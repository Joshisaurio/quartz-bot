const { SlashCommandBuilder, InteractionContextType, REST, Routes } = require('discord.js');
require('dotenv').config({ path: './env/info.env' });
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check slash commands')
        .setContexts([
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel
        ])
        .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
