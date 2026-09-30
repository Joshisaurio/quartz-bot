const {
    ContainerBuilder,
    TextDisplayBuilder,
    MessageFlags,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const commands = require('../commands/export');

async function kick(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    let container;
    let body;

    if (user) {
        try {
            const member = await interaction.guild.members.fetch(user.id);
            await member.kick();
            body = `# Kicked ${user.tag}.\n**Reason**: ${reason}`;
        } catch (error) {
            body = `Error: ${error.message}`;
        }

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
            "Error while fetching username information!",
            16756224
        ));
    }
}

module.exports = kick;
