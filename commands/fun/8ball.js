const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Generates a random response')

        .addStringOption(option =>
            option.setName("question")
            .setDescription('Enter your question')
            .setRequired(true)),

    async execute(interaction,client) {
        const quest = interaction.options.getString('question');
        const responses=['Yes, Definitely','Of course not','Yeah','Nope','pls no','I don\'t know tbh','That\'s a great question! I think I agree','Wow! That was the exact same thing I was thinking!','I agree!','I agree to disagree','Absolutely not!','I\'m not allowed to give my opinion on that']
        
        const E8ball = new EmbedBuilder()
        .setTitle('🎱 8Ball')
        .setDescription('Question : `'+quest+'`\n```'+responses[Math.floor(Math.random()*responses.length)]+'```')
        .setColor("#eed49f")
        .setThumbnail('attachment://8ball.png')
        
        await interaction.reply({embeds: [E8ball], files: ['./images/8ball.png']})
    },
};