const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Permissions ,MessageSelectMenu , MessageEmbed , MessageButton , Modal , TextInputComponent} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('remove mute for member')
        .addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true))
		,
        type:"admin",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getUser('member') && interaction.options.getUser('member').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content) && interaction.guild.members.cache.get(content).id
if (!cont) {
  await interaction.react("❌")
}else{
      
    
        const jsonData3 = fs.readFileSync('mutes.json');
        var data3 = JSON.parse(jsonData3);
        
              const member = interaction.guild.members.cache.get(cont);
                    let menroles = member.roles.highest.rawPosition
                    let botroles = member.guild.members.me.roles.highest.rawPosition
                    let memroles = interaction.member.roles.highest.rawPosition
                    
                    if(menroles > memroles || menroles > botroles || menroles == memroles || botroles == menroles){
                      await interaction.react("❌")
                    }else{
                        
                        data3.members = data3.members.filter(x => x.member !== `${member.id}`);

let muterole = interaction.guild.roles.cache.find(x=>x.name.toLowerCase() == "muted")
let roles = member.roles.member._roles

if(roles.includes(muterole.id)){
		member.roles.remove(muterole)
        await interaction.react("✅")
        fs.writeFileSync('mutes.json', JSON.stringify(data3,null,2));
	}else{
        await interaction.react("❌")
    }


                
   } }},
};