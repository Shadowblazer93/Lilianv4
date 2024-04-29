const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Log a warning for a user in modlog channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers && PermissionFlagsBits.KickMembers)
        .setDMPermission(false)

        .addUserOption(option => option
            .setName('target')
            .setDescription('The user you want to warn')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("reason")
            .setDescription('Reason for warn')
            .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason given';
        const gMember = interaction.guild.members.cache.get(target.id);

        if (target.id==728176491514298478) {return interaction.reply('❌ What good will warning me do? ;(')}
        if (target.id==interaction.user.id) {return interaction.reply({content:'❌ You cannot warn yourself! 🤦🏼‍♀️',ephemeral:true})}
        if (!gMember) {return interaction.reply('❌ I cannot find that user!')}
        if (!(gMember.kickable || gMember.moderatable)) {return interaction.reply('❌ Cannot warn that user due to role hierarchy!')}
        
        const Ewarn = new EmbedBuilder()
            .setTitle('Warned '+target.username)
            .setDescription('**Username** : `'+target.username+'`\n**User ID** : `'+target.id+'`\n \n**Reason** : `'+reason+'`')
            .setFooter({ text: 'Warned by : '+interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setThumbnail(target.displayAvatarURL())
            .setColor("#8aadf4")

        const Enomodlog = new EmbedBuilder()
            .setDescription('❌ I cannot find any modlog channel in this server\nTo create one, type `/modlog`\n \nModlog channel name can be edited\nbut must contain the word `modlog`')
            .setColor("#8aadf4")
            

        try {
            await interaction.deferReply()
            modchannel = interaction.guild.channels.cache.find(channel => channel.name.includes('modlog')) || undefined
            if (!modchannel) {return await interaction.editReply({embeds:[Enomodlog.setColor("#ed8796")],ephemeral:true})}
            else {
                await modchannel.send({embeds:[Ewarn]})
                await interaction.editReply({embeds: [Enomodlog.setDescription('<@'+target.id+'> has been warned\nA warn has been logged in <#'+modchannel.id+'>\n \n **NOTE :** See all of a user\'s warnings using discord search')]})
            }
        } catch (error) {console.error('❌ Encountered an error :' + error)}
    },
};