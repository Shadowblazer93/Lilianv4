const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {pagination, ButtonTypes, ButtonStyles} = require('@devraelfreeze/discordjs-pagination');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lilian\s help page'),

    async execute(interaction) {
            
        const Ehelp = new EmbedBuilder()
        .setTitle('Commands for Lilian')
        .setColor("#f5bde6")
        .addFields(
            {name:'Lilian Support Server',value:'Need help? [Click to Join the Support Server](https://discord.gg/smBNsAX)'},
            {name:':green_book:  General Commands',value:'```\nhelp\nuser\nping\ninfo\nreport\n ```',inline:true},
            {name:':busts_in_silhouette:  Social commands',value:'```\nembed\npoll\nvote\n \n \n ```',inline:true},
            {name:':gift:  Fun commands',value:'```\nrate\n8ball\nweather\nyoutube\nminesweeper\nfortunecookie```',inline:true},
            {name:':woman_detective:  Moderator Commands',value:'```\nmodlog\nwarn\nkick\nban\nmute\nunmute\nclear\n ```',inline:true},
            {name:':scroll:  Channel commands',value:'```\nclone\ncreate\ndelete\nnuke\ntopic\nlock\nunlock\nslowmode```',inline:true}
        )

        const Hgeneral = new EmbedBuilder()
        .setTitle(':green_book: General Commands')
        .setDescription("**;help** - Gives you a documentation on the bot\n**;dm** - Sends the help command in DMs\n**;user** - Get hidden info on users\n**;info** - Bot's about me page\n**;ping** - To check connection with the bot\n**;invite** - For getting Lilian's invite link\n \n**Syntax of Commands :wrench:**\n`;user [@user]`\n  \n**Permissions Required :dvd:**\nnone\n \n**NOTE** - *Adding these brackets is not required when executing commands*")
        .setColor("#f5bde6")

        const Hsocial = new EmbedBuilder()
        .setTitle(':busts_in_silhouette: Social Commands')
        .setDescription("**;embed** - Embed creation tool\n**;poll** - For getting opinions on a question\n**;vote** - To decide from two options\n**;choose** - randomly choose from one option\n \n**Syntax of Commands :wrench:**\n`;embed [title] + [body] + (colour)`\n`;poll [topic]`\n`;vote [choice1] + [choice2]`\n`;choose [choice1] + [choice2]`\n \n**Permissions Required :dvd:**\nmanage messages\n \n**NOTE** - *Adding these brackets is not required when executing commands*")
        .setColor("#f5bde6")

        const Hfun = new EmbedBuilder()
        .setTitle(':gift: Fun Commands')
        .setDescription('**;chat** - **NEW! Chat with Lilian!**\n**;rate** - get Lilian\'s rating on topics\n**;8ball** - Ask Lilian what she thinks about something\n**;weather** - Get the weather for **Any Place**\n**;youtube** - Search for youtube videos\n**;coinflip** - Flip a coin\n**;minesweeper** - Play minesweeper in discord!\n \n**Syntax of Commands :wrench:**\n`;chat [text]`\n`;rate [text]`\n`;8ball [text]`\n`;weather [location]`\n`;youtube [text]`\n \n**Permissions Required :dvd:**\nnone\n \n**NOTE** - *Adding these brackets is not required when executing commands*')
        .setColor("#f5bde6")

        const Hmod = new EmbedBuilder()
        .setTitle(':woman_detective: Moderator Commands')
        .setDescription('**;modlog** - Setup the logger integration\n**;warn** - warns a user\n**;kick** - kicks a user\n**;ban** - bans a user\n**;nick** - Change a user\'s nickname\n**;mute** - mutes a user\n**;clear** - Mass delete channel history\n**;unmute** - unmutes a user\n**;report** - report a user\n \n**Syntax of Commands**\n`;command [@user]`\n`;clear [num]`\n \n**Permissions required :dvd:**\nmoderator\n \nNOTE - Adding these brackets is not required when executing commands')
        .setColor("#f5bde6")

        const Hchannel = new EmbedBuilder()
        .setTitle(':scroll: Channel commands')
        .setDescription('**;nuke** - Delete all messages from a channel\n**;clone** - Make an exact copy of a channel\n**;topic** - Quick way to change channel topics\n**;create** - Create a channel\n**;delete** - Delete a channel\n**;lock** - Prevent members from sending messages in a channel\n**;unlock** - Allow members to send messages in a locked channel again\n**;slowmode** - Set slowmode for channels\n \n**Syntax of Commands :wrench:**\n`;cmd [#channel]`\n`;topic [text]`\n \n**Permissions required :dvd:**\nmanage channels\n \nNOTE - Adding these brackets is not required when executing commands')
        .setColor("#f5bde6")

        const Hinfo = new EmbedBuilder()
            .setThumbnail('https://cdn.discordapp.com/avatars/728176491514298478/8471d6241e5ef2dd2796d87149cf6d98.webp?size=128')
            .setColor("#f5bde6")
            //.addField('Help Website', '[Top.gg](https://top.gg/bot/728176491514298478)')
            .addFields(
                {name:'Invite',value:'[Invite Elite bot](https://discordapp.com/oauth2/authorize?client_id=728176491514298478&scope=bot&permissions=268954742)'},
                {name:'Support Server',value:'[Join Support Server](https://discord.gg/smBNsAX)'},
                {name:`Changelog`,value:`[Click to Join Support Server & Read](https://discord.com/channels/769091418118946827/769091418589233182)`},
                {name:'Version',value:'Update `'+version+'`'},
                {name:'Message from Dev',value:'Hello! Thanks for using my bot :-)',inline:true}
            )

        const helppages = [Ehelp,Hgeneral,Hsocial,Hfun, Hmod, Hchannel, Hinfo]
        const emojilist = ['◀️', '▶️']

        if (interaction.inGuild()) {
            await pagination({
            embeds: helppages, // Array of embeds objects
              author: interaction.user,
              interaction: interaction,
              time: 100000, // 100 seconds
              disableButtons: true, // Remove buttons after timeout
              fastSkip: false,
              pageTravel: false,
              buttons: [
                  {
                      type: ButtonTypes.previous,
                      label: 'Previous',
                      style: ButtonStyles.Primary
                  },
                  {
                      type: ButtonTypes.next,
                      label: 'Next',
                      style: ButtonStyles.Success
                  }
              ]
          }).catch(function (){});
        } else { interaction.reply({embeds: [Ehelp.setFooter({ text: '🛈 Detailed explanation of each command is not available in DMs'})]}) }
    },
};