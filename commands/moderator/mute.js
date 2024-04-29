const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Prevent a user from sending messages on the server')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)

        .addUserOption(option => option
            .setName('target')
            .setDescription('The user you want to mute')
            .setRequired(true))

        .addIntegerOption(option => option
            .setName('duration')
            .setDescription('Duration of mute in minutes b/w [1-40000]')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("reason")
            .setDescription('Reason for muting')
            .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        let duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason given';
        const gMember = interaction.guild.members.cache.get(target.id);

        const Emute = new EmbedBuilder()
            .setTitle('Muted '+target.username)
            .setDescription('**User** : <@'+target.id+'>\n**User ID** : `'+target.id+'`\n \n**Reason** : `'+reason+'`')
            .setFooter({ text: 'Muted by : '+interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setThumbnail(target.displayAvatarURL())
            .setColor("#8aadf4")

        if (duration<1 || duration>40000) {return interaction.reply({content:'❌ Please enter a duration between 1-40000 minutes',ephemeral:true})}
        if (target.id==728176491514298478) {return interaction.reply({content:'❌ Well I can\'t just mute myself! :(',ephemeral:true})}
        if (target.id==interaction.user.id) {return interaction.reply({content:'❌ You cannot mute yourself! :(',ephemeral:true})}
        if (!gMember) {return interaction.reply('❌ I cannot find that user!')}
        if (!gMember.moderatable) {return interaction.reply({content:'❌ I cannot mute that user due to role hierarchy!',ephemeral:true})}

        await interaction.deferReply()
        try {
            modchannel = interaction.guild.channels.cache.find(channel => channel.name.includes('modlog')) || undefined
            await gMember.timeout(duration*60000,reason)
            await interaction.editReply({embeds: [Emute]})
            if (modchannel) {await modchannel.send({embeds:[Emute]})}
        } catch (error) {
            await interaction.editReply({embeds:'❌ Could not mute that user!',ephemeral:true})
            console.error(error)
        }
    },
};