const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a new channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)

        .addStringOption(option =>
            option.setName("name")
            .setDescription('Channel name')
            .setRequired(true)),

    async execute(interaction) {
        const channelName = interaction.options.getString('name');

        const Ecreate = new EmbedBuilder()
            .setColor("#8aadf4")

        try {
            interaction.guild.channels.create({
                name: channelName,
                reason: `Created using Lilian by ${interaction.user.username}`
            }).then(id => interaction.reply({embeds:[Ecreate.setDescription('✅  Successfully created the channel <#'+id+'>')]}))
        } catch (error) {
            await interaction.reply({embeds:[Ecreate.setDescription('❌ Could not create a channel!').setColor("#ed8796")]})
            console.error(error)
        }
    },
};