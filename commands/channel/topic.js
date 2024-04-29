const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topic')
        .setDescription('Set the topic of a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

        .addStringOption(option =>
            option.setName("topic")
            .setDescription('Desired topic of channel')
            .setRequired(true)),

    async execute(interaction) {
        const topic = interaction.options.getString('topic');

        const Etopic = new EmbedBuilder()
            .setDescription('✅  Successfully changed the channel topic')
            .setColor("#8aadf4")

        try {
            await interaction.channel.setTopic(topic)
            await interaction.reply({embeds:[Etopic]})
        } catch (error) {
            await interaction.reply({embeds:[Etopic.setDescription('❌ Could not set the channel topic!').setColor("#ed8796")]})
            console.error(error)
        }
    },
};
