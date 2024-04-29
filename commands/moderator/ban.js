const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)

        .addUserOption(option => option
            .setName('target')
            .setDescription('The user you want to ban')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("reason")
            .setDescription('Reason for banning')
            .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason given';
        const gMember = interaction.guild.members.cache.get(target.id);

        if (target.id==728176491514298478) {return interaction.reply('❌ Well I can\'t just ban myself! :(')}
        if (target.id==interaction.user.id) {return interaction.reply({content:'❌ You cannot ban yourself! :(',ephemeral:true})}
        if (!gMember) {return interaction.reply('❌ I cannot find that user!')}
        if (!gMember.bannable) {return interaction.reply('❌ Cannot ban that user due to role hierarchy!')}
    
        const Eban = new EmbedBuilder()
            .setTitle('Banned '+target.username)
            .setDescription('**Username** : `'+target.username+'`\n**User ID** : `'+target.id+'`\n \n**Reason** : `'+reason+'`')
            .setFooter({ text: 'Banned by : '+interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setThumbnail(target.displayAvatarURL())
            .setColor("#8aadf4")

        try {
            await interaction.deferReply()
            modchannel = interaction.guild.channels.cache.find(channel => channel.name.includes('modlog')) || undefined
            await gMember.ban({reason:reason})
            await interaction.editReply({embeds: [Eban]})
            if (modchannel) {await modchannel.send({embeds:[Eban]})}
        } catch (error) {console.error('❌ Encountered an error in banning :' + error)}
    },
};