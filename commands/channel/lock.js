const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Restrict users from sending messages in a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles,PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to be locked')
            .setRequired(false)),

    async execute(interaction) {
        let lockChannel = interaction.options.getChannel('channel') || interaction.channel;

        const Elock = new EmbedBuilder()
            .setDescription('✅  Locked <#'+lockChannel.id+'>\n\n- Members still able to talk?\nSet `Send Messages` to neutral in role/channel permisisons\nfor every role in your sever')
            .setColor("#8aadf4")

        if (!lockChannel.manageable) {return interaction.reply({embeds:[Elock.setDescription('❌ <#'+lockChannel.id+'> is not manageable by me!').setColor("#ed8796")]})}

        try {
            await lockChannel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
            await interaction.reply({embeds: [Elock]})
        } catch (error) {
            console.error(error)
            interaction.reply({embeds:[Elock.setDescription('❌ <#'+lockChannel.id+'> is not manageable by me!').setColor("#ed8796")]})
        }
    },
};