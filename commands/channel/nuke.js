const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Delete all the messages of a channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel to be nuked')
            .setRequired(true))
            
        .addStringOption(option =>
            option.setName("confirmation")
            .setDescription('Type "I CONFIRM" to proceed with channel nuke')
            .setRequired(true)),

    async execute(interaction) {
        const Enuke = new EmbedBuilder()
        .setDescription('**NO USER CONFIRMATION RECIEVED**\nPlease type `I CONFIRM` in the confirmation option of the slash command')
        .setColor("#ed8796")

        const nukeChannel = interaction.options.getChannel('channel');
        const confirmation = interaction.options.getString('confirmation');

        if (!nukeChannel.manageable) {return interaction.reply({embeds:[Enuke.setDescription('❌ That channel is not manageable by me!').setColor("#ed8796")]})}
        if (confirmation!='I CONFIRM') {return interaction.reply({embeds:[Enuke]})}

        try {
            await nukeChannel.clone().then(newChannel => interaction.guild.channels.cache.get(newChannel.id).send({embeds:[Enuke.setDescription('✅ Channel was successfully nuked').setColor("#8aadf4")]}))
            nukeChannel.delete()
        } catch (error) {
            await interaction.reply({embeds:[Enuke.setDescription('❌ Could not clone the channel!').setColor("#ed8796")]})
            console.error(error)
            return
        }

        try {await interaction.reply({embeds:[Enuke.setDescription('✅ Channel was successfully nuked').setColor("#8aadf4")]})} catch {return}
    },
};