const {
    ContainerBuilder,
    TextDisplayBuilder,
    MessageFlags,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const get = require('../functions/fetch');
const components = require('../components/export');

async function kick(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser('target');
    let container;

    try {
        const member = await interaction.guild.members.fetch(user.id);
        await member.kick();
        body = `Successfully kicked ${user.tag}.`;
    } catch (error) {
        body = `Error: ${error}`;
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
