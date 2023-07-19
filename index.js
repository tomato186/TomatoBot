const { Client, Intents,Collection ,MessageEmbed} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.MESSAGE_CONTENT,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_INTEGRATIONS] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// When the client is ready, run this code (only once)
let token =''
client.commands = new Collection();
let commandsData = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
    commands.push(command.data.toJSON());
commandsData.push({
	name:command.data.name,
    description:command.data.description,
	type:command.type,
})
    client.commands.set(command.data.name, command);
}
client.menus = new Collection();

const menusPath = path.join(__dirname, 'menus');
const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));

for (const file of menuFiles) {
	const filePath = path.join(menusPath, file);
	const menu = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
   

    client.menus.set(menu.name, menu);
}
client.modal = new Collection();

const modalPath = path.join(__dirname, 'modals');
const modalFiles = fs.readdirSync(modalPath).filter(file => file.endsWith('.js'));

for (const file of modalFiles) {
	const filePath = path.join(modalPath, file);
	const modal = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
   

    client.modal.set(modal.name, modal);
}
client.on('ready', () => {
	console.log('Ready!');
    const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
});
client.on("messageCreate",async interaction=>{
	const jsonData = fs.readFileSync('config.json');
	var data = JSON.parse(jsonData);
	
	if(interaction.content.split('')[0] == data.prefix){
    let commandname = interaction.content.slice(1).split(" ")[0]
    let content = interaction.content.slice(1).split(" ").slice(1).join(' ')
   
    const command = client.commands.get(commandname);
	
	if (!command) return;
if (commandsData.find(x=>x.name == commandname).type == "owner") {
	if (data.Owners.includes(interaction.member.id) || data.owner == interaction.member.id) {
		try {
			await command.execute(interaction,client,content);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else {
		const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle("عذرا ")
		.setDescription(`هاذ الامر فقط الاونرز `)
		.setTimestamp();
		
			await interaction.reply({embeds:[exampleEmbed] });
	}
} else {
	try {
		await command.execute(interaction,client,content);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
	
	
}})
client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()){

    

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (!command) return;
if (commandsData.find(x=>x.name == interaction.commandName).type == "owner") {
	if (data.Owners.includes(interaction.member.id)||data.owner == interaction.member.id) {
		try {
			await command.execute(interaction,client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else {
		const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle("عذرا ")
		.setDescription(`هاذ الامر فقط الاونرز `)
		.setTimestamp();
		
			await interaction.reply({embeds:[exampleEmbed] });
	}
} else {
	try {
		await command.execute(interaction,client,content);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
}else if (interaction.isSelectMenu()) {
	const menu = client.menus.get(interaction.customId);

	if (!menu) return;

	try {
		await menu.execute(interaction,client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}else if (interaction.isModalSubmit()) {
	const modal = client.modal.get(interaction.customId);

	if (!modal) return;

	try {
		await modal.execute(interaction,client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
});
// Login to Discord with your client's token
client.login(token);