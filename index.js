const { Client, Intents,Collection ,MessageEmbed} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.MESSAGE_CONTENT,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_INTEGRATIONS ,Intents.FLAGS.GUILD_INVITES] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// When the client is ready, run this code (only once)
let token ="";
const guildInvites = new Map()
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	
		client.on(event.name, (...args) => event.execute(...args,client,guildInvites));
}





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


client.on('ready',async () => {
	

// Next, we are going to fetch invites for every guild and add them to our map.
client.guilds.cache.forEach(guild => {
	guild.invites.fetch()
		.then(invites => {
			console.log("INVITES CACHED");
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));

			guildInvites.set(guild.id, codeUses);
		})
		.catch(err => {
			console.log("OnReady Error:", err)
		})
})
	const jsonData2 = fs.readFileSync('status.json');
	var data2 = JSON.parse(jsonData2);
	
	if (data2.url && data2.presence =="streaming") {
		client.user.setPresence({ activities: [{name:data2.name,url: data2.url , type: data2.presence.toUpperCase() }], status: data2.status });
	
	} else {
		client.user.setPresence({ activities: [{ name: data2.name , type: data2.presence.toUpperCase() }], status: data2.status });
	
	}
		
	console.log('Ready!');
    const rest = new REST({ version: '9' }).setToken(token);


	setInterval(async()=>{
		let guild = client.guilds.cache.get("1118285476323926056");
	const jsonData3 = fs.readFileSync('mutes.json');
	var data3 = JSON.parse(jsonData3);
let currentTime = new Date().getTime()
for (let index = 0; index < data3.members.length; index++) {
	
	let membe = await guild.members.fetch({ user:data3.members[index].member, cache: false })

	
let roles = membe.roles.member._roles
let lastUsageTime = data3.members[index].time
let timereason = data3.members.find(x=>x.member == membe.id).timereason

if ( currentTime - lastUsageTime >= timereason ||  lastUsageTime == 0) {
	// تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هن;


data3.members = data3.members.filter(x => x.member !== `${membe.id}`);

let muterole = membe.guild.roles.cache.find(x=>x.name.toLowerCase() == "muted")
 

if(roles.includes(muterole.id)){
		membe.roles.remove(muterole)
	}
fs.writeFileSync('mutes.json', JSON.stringify(data3,null,2));
 } 
}
},15000);

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

client.on("guildMemberAdd",async member=>{

	const jsonData3 = fs.readFileSync('mutes.json');
	var data3 = JSON.parse(jsonData3);
let currentTime = new Date().getTime()
let mem = data3.members.find(x=>x.member == member.id)

if (!mem) {
	
} else {
	let lastUsageTime = data3.members.find(x=>x.member == member.id).time


let timereason = data3.members.find(x=>x.member == member.id).timereason

if ( currentTime - lastUsageTime >= timereason ||  lastUsageTime == 0) {
	// تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هن;

data3.members = data3.members.filter(x => x.member !== `${member.id}`);

fs.writeFileSync('mutes.json', JSON.stringify(data3,null,2));
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

let typeowner = data["Owners"].includes(interaction.member.id) || roles.some(element => data["Owners"].includes(element)) 
let typemanag = data["Managers"].includes(interaction.member.id) || roles.some(element => data["Managers"].includes(element))
let typeadmin = data["Admins"].includes(interaction.member.id) || roles.some(element => data["Admins"].includes(element))

	
	
	if (type =='log'&& typeowner || type == "admin"&&typeadmin || type == "admin"&&typemanag || type == "admin"&&typeowner || type == "manager"&&typemanag || type == "manager"&&typeowner || type == "owner"&&typeowner) {
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

let typeowner = data["Owners"].includes(interaction.member.id) || roles.some(element => data["Owners"].includes(element))
let typemanag = data["Managers"].includes(interaction.member.id) || roles.some(element => data["Managers"].includes(element))
let typeadmin = data["Admins"].includes(interaction.member.id) || roles.some(element => data["Admins"].includes(element))

	
	
	if (type == "admin"&&typeadmin || type == "admin"&&typemanag || type == "admin"&&typeowner || type == "manager"&&typemanag || type == "manager"&&typeowner || type == "owner"&&typeowner) {
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