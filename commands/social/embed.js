const { SlashCommandBuilder, EmbedBuilder,PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create user-generated embeds')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

        .addStringOption(option =>
            option.setName("title")
            .setDescription('Enter embed title')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("body")
            .setDescription('Enter embed description')
            .setRequired(true))

        .addStringOption(option =>
            option.setName("color")
            .setDescription('Enter embed color (<#hexcode>)')
            .setRequired(false)),

    async execute(interaction,client) {
        const embedTitle = interaction.options.getString('title');
        const embedBody = interaction.options.getString('body');
        const embedColor = interaction.options.getString('color') || 'Random';
        var hexpattern = new RegExp("^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$");

        if ((embedColor.length!=7 || !hexpattern.test(embedColor) || embedColor[0]!='#') && embedColor!='Random') {return interaction.reply('❌ Please enter a valid 6 digit hex number (with # included)')}

        const Eembed = new EmbedBuilder()
        .setTitle(embedTitle)
        .setDescription(embedBody)
        .setColor(embedColor)
        .setFooter({ text: 'Embed written by : '+interaction.user.displayName+' | '+interaction.user.id, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({embeds: [Eembed]})
    },
};