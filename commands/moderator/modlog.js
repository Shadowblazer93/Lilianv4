const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modlog')
        .setDescription('Creates a modlog channel for the server')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const Emodlog = new EmbedBuilder()
            .setColor("#8aadf4")

        try {
            await interaction.deferReply()
            modchannel = interaction.guild.channels.cache.find(channel => channel.name.includes('modlog')) || undefined
            if (modchannel) {return await interaction.editReply({embeds:[Emodlog.setDescription('**🛈 Modlog channel found :** <#'+modchannel+'>\n \n- You can change the channel name but it must include `modlog`')]})}
            else {
                await interaction.guild.channels.create({
                    name: '🔨modlog',
                    reason: `Created using Lilian by ${interaction.user.username}`,
                    topic:'🛈 Use the search function to search for users\'s penalties'
                }).then(id => interaction.editReply({embeds:[Emodlog.setDescription('✅  **Successfully created the channel** <#'+id+'>\nNow all moderator activity will be logged there')]}))
            }
        } catch (error) {
            await interaction.reply({embeds:[Emodlog.setDescription('❌ Could not create a channel!').setColor("#ed8796")]})
            console.error(error)
        }
    },
};