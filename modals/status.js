const fs = require('node:fs');
const path = require('node:path');
const { MessageActionRow, MessageSelectMenu , MessageEmbed , Modal , TextInputComponent} = require('discord.js');

module.exports = {
	name:'status',
	async execute(interaction,client) {
        const jsonData = fs.readFileSync('status.json');
        var data = JSON.parse(jsonData);
		
	
	let presence = interaction.components[0].components[0].customId.split('-')[1]

let status = interaction.components[0].components[0].value
let name = interaction.components[1].components[0].value
let type = interaction.components[2].components[0].customId

data.presence = presence;
data.status = status;
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`was successfully`)
	.setDescription(`A new status has been successfully`)
	.setTimestamp()
	
        if (type) {
            let url = interaction.components[2].components[0].value
            exampleEmbed.addFields(
                { name: `presence`, value: `${presence}` },
                { name: `Status`, value: `${status}` },
                { name: `Name`, value: `${name}` },
                { name: `Url`, value: `${url}` },
                
                )
            client.user.setPresence({ activities: [{name:name, url: url , type: presence.toUpperCase() }], status: status });
        
        } else {
            exampleEmbed.addFields(
                { name: `presence`, value: `${presence}` },
                { name: `Status`, value: `${status}` },
                { name: `Name`, value: `${name}` },
                )
            client.user.setPresence({ activities: [{ name: name , type: presence.toUpperCase() }], status: status });
        
        }
            
			await interaction.reply({embeds:[exampleEmbed] , });
            fs.writeFileSync('status.json', JSON.stringify(data,null,2));
	

},
};