const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('../../config.json');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Returns information about the bot'),

    async execute(interaction,client) {
            
        const Einfo = new EmbedBuilder()
            .setThumbnail('https://cdn.discordapp.com/avatars/728176491514298478/8471d6241e5ef2dd2796d87149cf6d98.webp?size=128')
            //.addField('Help Website', '[Top.gg](https://top.gg/bot/728176491514298478)')
            .addFields(
                {name:'Invite',value:'[Invite Elite bot](https://discordapp.com/oauth2/authorize?client_id=728176491514298478&scope=bot&permissions=268954742)'},
                {name:'Support Server',value:'[Join Support Server](https://discord.gg/smBNsAX)'},
                {name:`Changelog`,value:`[Click to Join Support Server & Read](https://discord.com/channels/769091418118946827/769091418589233182)`},
                {name:'Version',value:'Update `'+version+'`'},
                {name:'Message from Dev',value:'Hello! Thanks for using my bot :-)',inline:true}

            )
            .setColor("#f5bde6")

        await interaction.reply({embeds: [Einfo]})
    },
};