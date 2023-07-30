const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addline')
		.setDescription('add line to new messages in channel ')
        .addChannelOption(option => option.setName('channel').setDescription('Enter a channel').setRequired(true))
		.addAttachmentOption(option => option.setName('line').setDescription('Select a emoji').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        function isUrl(s) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            return regexp.test(s);
         }
        let cont = interaction.options&& interaction.options.getChannel('channel') && interaction.options.getChannel('channel').id || interaction.mentions.channels && interaction.mentions.channels.first() && interaction.mentions.channels.first().id || content.split(" ")[0].length > 18 && interaction.guild.channels.cache.get(content.split(" ")[0]) && interaction.guild.channels.cache.get(content.split(" ")[0]).id 
        let line  = interaction.options&& interaction.options.getAttachment('line')  || isUrl(content.split(" ")[1]) && content.split(" ")[1] || interaction.attachments &&interaction.attachments.first()&& interaction.attachments.first().url


        let channel = interaction.guild.channels.cache.get(cont)
        const jsonData = fs.readFileSync('sets.json');
       var data = JSON.parse(jsonData);
        
if (channel && line) {

    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
       if(data.line.find(x=>x.id == cont)){
    data.line.find(x=>x.id == cont).line = line;
}else{
    data.line.push({id:cont,line:line})
}
     
        fs.writeFileSync('sets.json', JSON.stringify(data,null,2));
    


    } else {
    await interaction.react("❌")
}
	},
};