const { REST, Routes } = require('discord.js');
const { clientId, guildId} = require('./config.json');

const rest = new REST().setToken(process.env.LILIAN_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);