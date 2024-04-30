const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create user-generated polls')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)
        .addStringOption(option =>option.setName("question").setDescription('Enter the question of the poll').setRequired(true))
        .addStringOption(option =>option.setName("option1").setDescription('Enter first choice').setRequired(true))
        .addStringOption(option =>option.setName("option2").setDescription('Enter second choice').setRequired(true))
        .addStringOption(option =>option.setName("option3").setDescription('Enter third choice').setRequired(false))
        .addStringOption(option =>option.setName("option4").setDescription('Enter fourth choice').setRequired(false))
        .addStringOption(option =>option.setName("option5").setDescription('Enter six choice').setRequired(false)),

    async execute(interaction) {
        const question = interaction.options.getString('question') || 'unknown';
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3') || undefined;
        const option4 = interaction.options.getString('option4') || undefined;
        const option5 = interaction.options.getString('option5') || undefined;

        const reactionIDs = ['<:poll_one:1234810770491965490>','<:poll_two:1234810983998816276>','<:poll_three:1234810980878385172>','<:poll_four:1234811046288691321>','<:poll_five:1234811090940989492>']
        const options = [option1,option2,option3,option4,option5]

        try {
            let pollDesc = ''
            for (let i=0;i<5;i++) {if (options[i]) {pollDesc += '\n**'+reactionIDs[i]+' :** ' + options[i]}}
            
            const Epoll = new EmbedBuilder()
            .setTitle('**Poll : **'+question)
            .setDescription(pollDesc)
            .setFooter({ text: 'Poll initiated by : '+interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setColor('#f6c511')

            const message = await interaction.reply({embeds: [Epoll],fetchReply:true})
            
            for (let i=0;i<5;i++) {if (options[i]) {message.react(reactionIDs[i])}}
        } catch (error) {
            await interaction.reply('❌ Encountered an error!\nPlease report this to the support server (/support)')
        }
    },
};