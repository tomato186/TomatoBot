const { MessageEmbed } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: 'messageCreate',
	async execute(interaction,client) {
        const jsonData = fs.readFileSync('sets.json');
       var data = JSON.parse(jsonData);
       
        if(interaction.author.bot) return;
      if(data.react.find(x=>x.id == interaction.channelId)){
        await interaction.react(data.react.find(x=>x.id == interaction.channelId).react)
      }else if(data.line.find(x=>x.id == interaction.channelId)){
        
        await interaction.channel.send({files:[data.line.find(x=>x.id == interaction.channelId).line]})
      }
        },
};