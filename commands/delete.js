const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Permissions ,MessageSelectMenu , MessageEmbed , MessageButton , Modal , TextInputComponent} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete channel messages')
        .addNumberOption(option => option.setName('messages').setDescription('Select a user').setRequired(true))
		,
        type:"manager",
	async execute(interaction,client,content) {
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
        let cont = interaction.options&& interaction.options.getNumber('messages')  || content
if (!cont  || cont && !isNumber(cont)) {
  await interaction.react("❌")
}else{
      
              
                    
    let channel = interaction.channel
			
    const messages = await channel.messages.fetch({ limit: cont })
    
if (Array.from(messages).length> 1) {
await channel.bulkDelete(messages);

const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                
                .setDescription(`تم حذف ${await messages.size} رساله`)
                .setTimestamp();
                await interaction.channel.send({embeds:[exampleEmbed]}).then(async x =>{
                    setTimeout(async()=>{
await x.delete()
                    },5000)
                })

}
                                  
   } 
  },
};