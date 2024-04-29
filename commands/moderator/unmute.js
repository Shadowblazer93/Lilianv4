const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Allow a muted user to send messages on the server again')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)

        .addUserOption(option => option
            .setName('target')
            .setDescription('The user you want to unmute')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("reason")
            .setDescription('Reason for unmuting')
            .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason given';
        const gMember = interaction.guild.members.cache.get(target.id);

        const Eunmute = new EmbedBuilder()
            .setTitle('Unmuted '+target.username)
            .setDescription('**User** : <@'+target.id+'>\n**User ID** : `'+target.id+'`\n \n**Reason** : `'+reason+'`')
            .setFooter({ text: 'Unmuted by : '+interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setThumbnail(target.displayAvatarURL())
            .setColor("#8aadf4")
        

        if (target.id==728176491514298478) {return interaction.reply({content:'❌ Well I can\'t just unmute myself! :(',ephemeral:true})}
        if (target.id==interaction.user.id) {return interaction.reply({content:'❌ You cannot unmute yourself! :(',ephemeral:true})}
        if (!gMember.communicationDisabledUntil) {return interaction.reply({content:'❌ That user is not muted!',ephemeral:true})}
        if (!gMember) {return interaction.reply('❌ I cannot find that user!')}
        if (!gMember.moderatable) {return interaction.reply({content:'❌ I cannot unmute that user due to role hierarchy!',ephemeral:true})}

        await interaction.deferReply()
        try {
            modchannel = interaction.guild.channels.cache.find(channel => channel.name.includes('modlog')) || undefined
            await gMember.timeout(null,reason)
            await interaction.editReply({embeds: [Eunmute]})
            if (modchannel) {await modchannel.send({embeds:[Eunmute]})}
        } catch (error) {
            await interaction.editReply({embeds:'❌ Could not unmute that user!',ephemeral:true})
            console.error(error)
        }
    },
};