const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Allows users to send messages again in a locked channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles,PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to be unlocked')
            .setRequired(false)),

    async execute(interaction) {
        let unlockChannel = interaction.options.getChannel('channel') || interaction.channel;

        const Eunlock = new EmbedBuilder()
            .setDescription('✅  Unlocked <#'+unlockChannel.id+'>\n\n- Members still able to talk when channel is locked?\nSet `Send Messages` to neutral in role/channel permisisons\nfor every role in your sever')
            .setColor("#8aadf4")

        if (!unlockChannel.manageable) {return interaction.reply({embeds:[Eunlock.setDescription('❌ <#'+unlockChannel.id+'> is not manageable by me!').setColor("#ed8796")]})}

        try {
            await unlockChannel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
            await interaction.reply({embeds: [Eunlock]})
        } catch (error) {
            console.error(error)
            interaction.reply({embeds:[Eunlock.setDescription('❌ <#'+unlockChannel.id+'> is not manageable by me!').setColor("#ed8796")]})
        }
    },
};