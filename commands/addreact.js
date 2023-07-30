const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addreact')
		.setDescription('add react to new messages in channel ')
        .addChannelOption(option => option.setName('channel').setDescription('Enter a channel').setRequired(true))
		.addStringOption(option => option.setName('emoji').setDescription('Select a emoji').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getChannel('channel') && interaction.options.getChannel('channel').id || interaction.mentions.channels && interaction.mentions.channels.first() && interaction.mentions.channels.first().id || content.split(" ")[0].length > 18 && interaction.guild.channels.cache.get(content.split(" ")[0]) && interaction.guild.channels.cache.get(content.split(" ")[0]).id 
        let cont2 = interaction.options&& interaction.options.getString('emoji')  || content.split(" ")[1] 
        let channel = interaction.guild.channels.cache.get(cont)
        const jsonData = fs.readFileSync('sets.json');
       var data = JSON.parse(jsonData);
        
if (channel && cont2) {

    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        let text = cont2.split("<a:").join("").split("<:").join("").split(":>").join("")
if(data.react.find(x=>x.id == cont)){
    data.react.find(x=>x.id == cont).react = text;
}else{
    data.react.push({id:cont,react:text})
}
     
        fs.writeFileSync('sets.json', JSON.stringify(data,null,2));
    


    } else {
    await interaction.react("❌")
}
	},
};