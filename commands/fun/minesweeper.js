const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Minesweeper = require('discord.js-minesweeper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minesweeper')
        .setDescription('Play a game of minesweeper in discord!'),

    async execute(interaction) {
        await interaction.deferReply();
        const minesweeper = new Minesweeper();
        const newgame = minesweeper.start()

        await interaction.editReply(newgame)
    },
};