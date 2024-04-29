const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),

    async execute(interaction,client) {
        await client.guilds.cache.fetch
        const Eping = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription("```Bot Version : " + version + '\nServer Count : '+client.guilds.cache.size+'```')
            .setColor("#f5bde6")
            
        await interaction.reply({embeds: [Eping]})
    },
};