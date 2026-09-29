const {
    ContainerBuilder,
    TextDisplayBuilder,
    MessageFlags,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const commands = require('../commands/export');

async function ping(interaction) {
    await interaction.deferReply();

    let container;
    let body;

    body = "pong!";
     if (body) {
        container = new ContainerBuilder()
            .setAccentColor(5763719)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(body)
            );

        return interaction.editReply({
            components: [container],
            flags: MessageFlags.IsComponentsV2
        });
    } else {
        return interaction.editReply(components.container(
            "Error while fetching ping information!",
            16756224
        ));
    }
}

module.exports = ping;
