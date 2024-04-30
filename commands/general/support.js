const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Need help / Have a question? Use to get Lilian support server invite'),

    async execute(interaction) {
        await interaction.reply('https://discord.gg/smBNsAX')
    },
};