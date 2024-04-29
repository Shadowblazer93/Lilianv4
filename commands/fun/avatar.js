const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Return the avatar/PFP link of a user')
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user you want to view the PFP of')
            .setRequired(false)),

    async execute(interaction) {
        const iuser = interaction.options.getUser('user') || interaction.user;
        const iavatar = iuser.displayAvatarURL()

        const Eavatar = new EmbedBuilder()
        .setAuthor({ name:iuser.username + "'s avatar", iconURL:iavatar })
        .setDescription('[Click for image link](' + iavatar + ')')
        .setImage(iavatar)
        
        if (interaction.inGuild()) {
            const imember = await interaction.guild.members.cache.get(iuser.id);
            Eavatar.setColor(imember.displayHexColor || "#f5bde6")
        } else {Eavatar.setColor("#f5bde6")}
            
        await interaction.reply({embeds: [Eavatar]})
    },
};