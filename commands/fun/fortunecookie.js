const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//const Mathjs = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortunecookie')
        .setDescription('Recieve wisdom tailored personally for you'),

    async execute(interaction) {

        const fortune = [
            "A dream you dream alone is only a dream. A dream you dream together is reality.",
            "The greatest glory is not in never falling, but in rising every time we fall.",
            "You will conquer obstacles to achieve success.",
            "All your hard work will soon pay off.",
            "The best way to predict the future is to create it.",
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
            "Opportunities are usually disguised as hard work, so most people don't recognize them.",
            "You are closer to success than you think.",
            "Your future is as bright as your faith.",
            "You will receive unexpected help in the days ahead.",
            "You will find great fortune in unexpected places.",
            "Good things come to those who wait.",
            "The key to success is to focus on goals, not obstacles.",
            "You will soon embark on a new adventure.",
            "Your talents will be recognized and rewarded.",
            "Fortune favors the brave.",
            "The harder you work, the luckier you get.",
            "You will soon discover new opportunities for growth.",
            "Your determination will bring you success.",
            "Trust your instincts; they will lead you in the right direction.",
            "Happiness is not something readymade. It comes from your own actions.",
            "Your present plans are going to succeed beyond your wildest dreams.",
            "You learn from your mistakes... You will learn a lot today.",
            "If you have something good in your life, don't let it go!",
            "Your shoes will make you happy today.",
            "Your ability to juggle many tasks will take you far.",
            "An unexpected event will bring you riches.",
            "You will have good luck and overcome many hardships.",
            "The time is right to make new friends.",
            "You will inherit a large sum of money.",
            "An important person will offer you support.",
            "Your hard work will soon pay off.",
            "You are on the right path to success.",
            "A stranger, is a friend you have not spoken to yet.",
            "A journey of a thousand miles begins with a single step.",
            "You will soon be surrounded by good friends and laughter.",
            "Good things are coming your way.",
            "Your efforts will be rewarded.",
            "You will achieve success in whatever you do.",
            "Adventure awaits you.",
            "Your kindness will lead you to success.",
            "You will make a difference in someone's life.",
            "You will find joy in unexpected places.",
            "Your positive attitude will lead to great opportunities.",
            "You will soon receive good news.",
            "Keep going. You're on the right track.",
            "You will soon discover a hidden talent.",
            "Your creativity will lead to success.",
            "You will find love in unexpected places.",
            "Your optimism will lead you to happiness.",
          ];    


        await interaction.reply(fortune[Math.floor(Math.random()*fortune.length)])
    },
};