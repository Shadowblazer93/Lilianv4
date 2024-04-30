const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription('Rate a user on a scale of 10')
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user you want to get a rating of')
            .setRequired(false)),

    async execute(interaction) { 

        const iuser = interaction.options.getUser('user') || interaction.user;
        const iavatar = iuser.displayAvatarURL()
        
        let rating = Math.round(Math.random()*10)
        let msg = 'I would rate <@'+iuser+'> a `'+rating+'/10`!'
        if (iuser==728176491514298478) {msg = 'I would rate myself a `10/10` !'}

        const Erate = new EmbedBuilder()
            .setColor("#eed49f")
            .setAuthor({ name:iuser.displayName + '\'s Rating', iconURL:iavatar })
            .setDescription(msg)
            .addFields(
                
            )

        await interaction.reply({embeds: [Erate]})
    },
};