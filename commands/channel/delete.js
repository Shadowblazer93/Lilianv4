const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to be delete')
            .setRequired(true)),

    async execute(interaction) {
        const Edelete = new EmbedBuilder()
        .setColor("#8aadf4")

        const deleteChannel = interaction.options.getChannel('channel');
        if (!deleteChannel.deletable) {return interaction.reply({embeds:[Edelete.setDescription('❌ That channel is not deletable!').setColor("#ed8796")]})}

        try {
            deleteChannel.delete()
            await interaction.reply({embeds:[Edelete.setDescription('✅  Successfully deleted the channel `#'+deleteChannel.name+'`')]})
        } catch (error) {
            await interaction.reply({embeds:[Edelete.setDescription('❌ Could not create a channel!').setColor("#ed8796")]})
            console.error(error)
        }
    },
};