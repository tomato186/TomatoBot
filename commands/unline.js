const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unline')
		.setDescription('un line to new messages in channel ')
        .addChannelOption(option => option.setName('channel').setDescription('Enter a channel').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getChannel('channel') && interaction.options.getChannel('channel').id || interaction.mentions.channels && interaction.mentions.channels.first() && interaction.mentions.channels.first().id || content.split(" ")[0].length > 18 && interaction.guild.channels.cache.get(content.split(" ")[0]) && interaction.guild.channels.cache.get(content.split(" ")[0]).id 
        
        let channel = interaction.guild.channels.cache.get(cont)
        const jsonData = fs.readFileSync('sets.json');
       var data = JSON.parse(jsonData);
        
if (channel) {

    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        data.line = data.line.filter(x => x.id !== `${cont}`);

        fs.writeFileSync('sets.json', JSON.stringify(data,null,2));
    


    } else if(content == 'all'){
        await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        data.line =[];

        fs.writeFileSync('sets.json', JSON.stringify(data,null,2));
    




    }else {
    await interaction.react("❌")
}
	},
};