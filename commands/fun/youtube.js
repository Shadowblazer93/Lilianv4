const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Search for videos on youtube')
        .addStringOption(option =>
            option.setName("video")
            .setDescription('Video search query')
            .setRequired(true)),

    async execute(interaction,client) {
        await interaction.deferReply()
        var noresults = '❌ Could not find any results'
        var search = require('youtube-search');
        const vid = interaction.options.getString('video');

        var opts = {
            maxResults: 1,
            key: process.env.LILIAN_YTAPIKEY,
            safeSearch: 'strict'
          };

        search(vid, opts, function(err, results) {
            if(err) {return interaction.editReply(noresults)}
            if (results) {interaction.editReply('**Result :** ['+results[0].title+']('+results[0].link+')').catch(err => {return;})}
            else {return interaction.editRreply(noresults)}
        });
    },
};