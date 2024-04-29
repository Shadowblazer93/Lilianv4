const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the duration of slowmode in a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)

        .addIntegerOption(option => option
            .setName('duration')
            .setDescription('Duration of slowmode')
            .setRequired(true))

        .addStringOption(option => option
            .setName('type')
            .setDescription('Choose the type of duration')
            .setRequired(false)
            .addChoices(
                {name:'seconds',value:'s'},
                {name:'minutes',value:'m'},
                {name:'hours',value:'h'}
            )),

    async execute(interaction) {
        let duration = interaction.options.getInteger('duration');
        const duration_type = interaction.options.getString('type') || 's';

        const Eslowmode = new EmbedBuilder()
            .setDescription('✅  Set the slowmode to `'+duration+duration_type+'`')
            .setColor("#8aadf4")

            if (!interaction.channel.manageable) {return interaction.reply({embeds:[Eslowmode.setDescription('❌ That channel is not manageable by me!').setColor("#ed8796")]})}

        if (duration_type=='h') {duration*=3600}
        else if (duration_type=='m') {duration*=60}

        if (duration>21600) {return interaction.reply({embeds: [Eslowmode.setDescription('❌ Enter a time less than 6 hours!').setColor("#ed8796")],ephemeral:true})}

        try {
            interaction.channel.setRateLimitPerUser(duration)
            await interaction.reply({embeds: [Eslowmode]})
        } catch (error) {console.error(error)}
    },
};