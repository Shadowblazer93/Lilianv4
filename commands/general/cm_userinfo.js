const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
            .setName('User Information')
            .setType(ApplicationCommandType.User),

    async execute(interaction) { 

        const iuser = interaction.targetUser;
        const imember = await interaction.guild.members.cache.get(iuser.id);
        const iavatar = iuser.displayAvatarURL()
        const ibot = iuser.bot ? 'Yes' : 'No'
        const inick = imember.nickname || 'None'
        const joindiscord = `<t:${Math.floor(iuser.createdTimestamp / 1000)}:R>`
        const joinserver = `<t:${Math.floor(imember.joinedTimestamp / 1000)}:R>`

        const roles = []
        for (i of imember.roles.cache) {
            if (i[1].name!='@everyone') {roles.push('<@&'+i[0]+'>')}
        }

        
        const Euserinfo = new EmbedBuilder()
            .setColor(imember.displayHexColor || "#f5bde6")
            .setAuthor({ name:iuser.displayName, iconURL:iavatar })
            .setThumbnail(iavatar)
            .addFields(
                {name:'User Information',value:`**ID :** \`${iuser.id}\``+`\n**Username :** ${iuser.username}\n**Nickname :** ${inick}`},
                {name:'Joined Discord',value:joindiscord,inline:true},
                {name:'Joined Server',value:joinserver,inline:true},
                {name:'Bot',value:ibot,inline:true},
                {name:'Roles',value:roles.join(' | ')}
            )

        await interaction.reply({embeds: [Euserinfo]})
    },
};