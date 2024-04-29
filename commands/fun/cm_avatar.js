const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
            .setName('User Avatar')
            .setType(ApplicationCommandType.User),

    async execute(interaction) {
        const iuser = interaction.targetUser
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