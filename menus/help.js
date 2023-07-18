const fs = require('node:fs');
const path = require('node:path');
const { MessageActionRow, MessageSelectMenu , MessageEmbed } = require('discord.js');

module.exports = {
	name:'help',
	async execute(interaction,client) {
		let value = interaction.values[0]
		let commandsData = ``
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if (command.type == value) {
		commandsData+=`** ${command.data.name} | ${command.data.description} ** \n`
		
	}
  
}
console.log(client.user)
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`This is a ${value} commands`)
	.setDescription(commandsData||'i cant fouand any commands')
	.setTimestamp()
	
			await interaction.reply({embeds:[exampleEmbed] });
	},
};