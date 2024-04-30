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
            {name:':green_book:  General Commands',value:'```\nhelp\nuserinfo\nping\ninfo\nsupport\n ```',inline:true},
            {name:':busts_in_silhouette:  Social commands',value:'```\nembed\npoll\navatar\n \n \n ```',inline:true},
            {name:':gift:  Fun commands',value:'```\nrate\n8ball\nweather\nyoutube\nminesweeper\nfortunecookie```',inline:true},
            {name:':woman_detective:  Moderator Commands',value:'```\nmodlog\nwarn\nkick\nban\nmute\nunmute\nclear\n ```',inline:true},
            {name:':scroll:  Channel commands',value:'```\nclone\ncreate\ndelete\nnuke\ntopic\nlock\nunlock\nslowmode```',inline:true}
        )

        const Hgeneral = new EmbedBuilder()
        .setTitle(':green_book: General Commands')
        .setDescription("**help** - Gives you a documentation of the bot\n**userinfo** - Get info on users of the server\n**ping** - Check if the bot is online\n**info** - About me page\n**support** - Get an invite link for the Lilian Support Server\n  \n**Permissions Required :dvd:**\nnone")
        .setColor("#f5bde6")

        const Hsocial = new EmbedBuilder()
        .setTitle(':busts_in_silhouette: Social Commands')
        .setDescription("**embed** - Embed creation tool\n**poll** - Create a poll\n**avatar** - Get a link to a user\'s avatar\n \n**Permissions Required :dvd:**\nmanage messages")
        .setColor("#f5bde6")

        const Hfun = new EmbedBuilder()
        .setTitle(':gift: Fun Commands')
        .setDescription('**rate** - get Lilian\'s rating on users\n**8ball** - Ask Lilian a question\n**weather** - Get the weather for **Any Place**\n**youtube** - Search for youtube videos\n**minesweeper** - Play minesweeper in discord!\n \n**Permissions Required :dvd:**\nnone')
        .setColor("#f5bde6")

        const Hmod = new EmbedBuilder()
        .setTitle(':woman_detective: Moderator Commands')
        .setDescription('**modlog** - Setup the logger integration\n**warn** - warns a user\n**kick** - kicks a user\n**ban** - bans a user\n**mute** - mutes a user\n**unmute** - unmutes a user\n**clear** - Mass delete channel history\n \n**Permissions required :dvd:**\n**modlog :** ADMINISTRATOR\n**warn :** manage_members & kick_members\n**kick :** kick_members\n**ban :** ban_members\n**mute :** moderate_members\n**unmute :** moderate_members\n**clear :** manage_messages')
        .setColor("#f5bde6")

        const Hchannel = new EmbedBuilder()
        .setTitle(':scroll: Channel commands')
        .setDescription('**clone** - Make an exact copy of a channel\n**create** - Create a channel\n**delete** - Delete a channel\n**nuke** - Delete all messages from a channel\n**topic** - Quick way to change channel topics\n**lock** - Prevent members from sending messages in a channel\n**unlock** - Allow members to send messages in a locked channel again\n**slowmode** - Set slowmode for channels\n \n**Permissions required :dvd:**\nmanage channels')
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