const { SlashCommandBuilder, InteractionContextType, REST, Routes } = require('discord.js');
const { token, clientId } = require('./env/info.json');

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
