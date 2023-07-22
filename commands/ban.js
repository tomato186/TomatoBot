const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Permissions ,MessageSelectMenu , MessageEmbed , MessageButton , Modal , TextInputComponent} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('get member a ban ')
        .addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true))
		,
        type:"manager",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getUser('member') && interaction.options.getUser('member').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content) && interaction.guild.members.cache.get(content).id || content
if (!cont) {
  await interaction.react("❌")
}else{
      
              const member = interaction.guild.members.cache.get(cont);
              if (member) {
                    let menroles = member.roles.highest.rawPosition
                    let botroles = member.guild.members.me.roles.highest.rawPosition
                    let memroles = interaction.member.roles.highest.rawPosition
                    
                    if( menroles > memroles ||menroles > botroles || menroles == memroles || botroles == menroles){
                      await interaction.react("❌")
                    }else{
                      interaction.guild.bans.create(`${cont}`,{ deleteMessageSeconds: 0, reason: 'واحد يستاهل البان' }).then(async x=>{
                        await interaction.react("✅")
                     
                      }).catch(async x=>{
                        await interaction.react("❌")
                      }) 

                    }
                  }else{
                    
                    
                    interaction.guild.bans.create(`${cont}`,{ deleteMessageSeconds: 0, reason: 'واحد يستاهل البان' }).then(async x=>{
                      await interaction.react("✅")
                   
                    }).catch(async x=>{
                      await interaction.react("❌")
                      console.log(x)
                    })
               

                  }
          
                
                   
   } 
  },
};