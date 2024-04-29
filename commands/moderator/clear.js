const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Bulk delete messages from a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)

        .addIntegerOption(option => option
            .setName('count')
            .setDescription('Amount of messages (between 1-100)')
            .setRequired(true)),

    async execute(interaction) {
        const count = interaction.options.getInteger('count');

        const Eclear = new EmbedBuilder()
            .setDescription('✅  Deleted `'+count+'` messages')
            .setColor("#8aadf4")

        if (count>100 || count<1) {return interaction.reply({embeds:[Eclear.setDescription('Please enter a value between 1-100')],ephemeral:true})}

        try {
            await interaction.channel.bulkDelete(count)
            await interaction.deferReply()
            await interaction.editReply({embeds: [Eclear],ephemeral:true})
        } catch (error) {
            console.error(error)
            interaction.reply('❌ Encountered an error!')
        }
    },
};