const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clone')
        .setDescription('Clones a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to be cloned')
            .setRequired(true)),

    async execute(interaction) {
        const Eclone = new EmbedBuilder()
        .setColor("#8aadf4")

        const cloneChannel = interaction.options.getChannel('channel');
        if (!cloneChannel.manageable) {return interaction.reply({embeds:[Eclone.setDescription('❌ That channel is not manageable by me!').setColor("#ed8796")]})}

        try {
            await cloneChannel.clone().then(
                newChannel => interaction.reply({embeds:[Eclone.setDescription('✅  Channel cloned successfully. New channel : <#'+newChannel.id+'>')]})
            )
        } catch (error) {
            await interaction.reply({embeds:[Eclone.setDescription('❌ Could not clone the channel!').setColor("#ed8796")]})
            console.error(error)
        }
    },
};