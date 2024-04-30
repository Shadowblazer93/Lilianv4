const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Need help / Have a question? Use to get Lilian support server invite'),

    async execute(interaction) {
        await interaction.reply('Contact via email : `liliandiscordbot@gmail.com`\nJoin the support server : https://discord.gg/smBNsAX')
    },
};