const { Client, Intents,Collection ,MessageEmbed} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.MESSAGE_CONTENT,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_INTEGRATIONS ,Intents.FLAGS.GUILD_INVITES] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// When the client is ready, run this code (only once)
let token = "";
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
const jsonData3 = fs.readFileSync('mutes.json');
	var data3 = JSON.parse(jsonData3);
	console.log(data3)
client.on("guildMemberAdd",async member=>{

	const jsonData3 = fs.readFileSync('mutes.json');
	var data3 = JSON.parse(jsonData3);
let currentTime = new Date().getTime()
let lastUsageTime = data3.members.find(x=>x.member == member.id).time
console.log(lastUsageTime)
if ( currentTime - lastUsageTime >= 2*60* 60 * 1000 ||  lastUsageTime == 0) {
	// تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هن;
console.log('كيبا عمك')

  } else {
	let muterole = member.guild.roles.cache.find(x=>x.name.toLowerCase() == "muted")
     
      if (!muterole) {
        muterole = await member.guild.roles.create({
        name: 'muted',
      })
      for (let index = 0; index < [...member.guild.channels.cache].length; index++) {
        const channel = [...member.guild.channels.cache][index][1];
        if(channel.isText()){
          channel.permissionOverwrites.edit(muterole, { SEND_MESSAGES: false });
        }}}
		member.roles.add(muterole)
	
	
	
  }
})
client.on("messageCreate",async interaction=>{
	const jsonData = fs.readFileSync('config.json');
	var data = JSON.parse(jsonData);
	
	if(interaction.content.split('')[0] == data.prefix){
    let commandname = interaction.content.slice(1).split(" ")[0]
    let content = interaction.content.slice(1).split(" ").slice(1).join(' ')
   
    const command = client.commands.get(commandname);
	
	if (!command) return;
	let typess = ['owner','manager','admin']
	
if (typess.includes(commandsData.find(x=>x.name == commandname).type)) {
	let typesss = [{name:"Owners",type:"owner"},{name:"Managers",type:"manager"},{name:"Admins",type:"admin"}]
	let type = commandsData.find(x=>x.name == commandname).type

	
	
	let roles = interaction.member.roles.member._roles

	if (data[typesss.find(x=>x.type == type).name].includes(interaction.member.id) || roles.some(element => data[typesss.find(x=>x.type == type).name].includes(element))) {
		try {
			await command.execute(interaction,client,content);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
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
	const jsonData = fs.readFileSync('config.json');
	var data = JSON.parse(jsonData);
	if (interaction.isCommand()){

    

	const command = client.commands.get(interaction.commandName);

	let commandname = interaction.commandName

	if (!command) return;
	let typess = ['owner','manager','admin']
	
if (typess.includes(commandsData.find(x=>x.name == commandname).type)) {
	let typesss = [{name:"Owners",type:"owner"},{name:"Managers",type:"manager"},{name:"Admins",type:"admin"}]
	let type = commandsData.find(x=>x.name == commandname).type
	

	
	let roles = interaction.member.roles.member._roles
	
	if (data[typesss.find(x=>x.type == type).name].includes(interaction.member.id) || roles.some(element => data[typesss.find(x=>x.type == type).name].includes(element))) {
		try {
			await command.execute(interaction,client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
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