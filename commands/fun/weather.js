const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the weather of any location')
        .addStringOption(option =>
            option.setName("weather")
            .setDescription('Enter location')
            .setRequired(true)),

    async execute(interaction,client) {
        await interaction.deferReply()
        const weatherLocation = interaction.options.getString('weather');
        
        var weather = require('weather-js')
        await weather.find({search: weatherLocation, degreeType: 'C'}, function (error, result){

            if(error) return interaction.editReply('❌ Could not find that location. Please try again.')
            if(typeof result === undefined || result.length === 0) return interaction.editReply('❌ Could not find that location. Please try again.')
    
            var current = result[0].current;
            var location = result[0].location;

            const Eweatherinfo = new EmbedBuilder()
            .setAuthor({ name: `☁️ Weather forecast for ${current.observationpoint}`})
            .setThumbnail(current.imageUrl)
            .setColor('#990632')
            .addFields(
                {name:'Timezone', value:`UTC${location.timezone}`, inline:true},
                {name:'Degree Type', value:'Celsius', inline:true},
                {name:'Temperature', value:`${current.temperature}°`, inline:true},
                {name:'Wind', value:`${current.winddisplay}`, inline:true},
                {name:'Feels like', value:`${current.feelslike}°`, inline:true},
                {name:'Humidity', value:`${current.humidity}`, inline:true}
        )

            interaction.editReply({embeds: [Eweatherinfo]})
        })
        
    },
};