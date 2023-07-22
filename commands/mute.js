const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Permissions ,MessageSelectMenu , MessageEmbed , MessageButton , Modal , TextInputComponent} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('get member a mute ')
        .addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true))
		,
        type:"admin",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getUser('member') && interaction.options.getUser('member').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content) && interaction.guild.members.cache.get(content).id
if (!cont) {
  await interaction.react("❌")
}else{
      let muterole = interaction.guild.roles.cache.find(x=>x.name.toLowerCase() == "muted")
       
      if (!muterole) {
        muterole = await interaction.guild.roles.create({
        name: 'muted',
      })
      for (let index = 0; index < [...interaction.guild.channels.cache].length; index++) {
        const channel = [...interaction.guild.channels.cache][index][1];
        if(channel.isText()){
          channel.permissionOverwrites.edit(muterole, { SEND_MESSAGES: false });
        }}}
      const jsonData = fs.readFileSync('reason.json');
        var data = JSON.parse(jsonData);

        const jsonData2 = fs.readFileSync('config.json');
        var data2 = JSON.parse(jsonData2);
        const jsonData3 = fs.readFileSync('mutes.json');
        var data3 = JSON.parse(jsonData3);
        let reasons =[]
        let mess=``
		for (let index = 0; index < data['mute'].length; index++) {
            const element = data['mute'][index];
            
            reasons.push(new MessageButton()
            .setCustomId(element.length)
            .setLabel(element.reason)
            .setStyle('PRIMARY'))
            mess+= `السبب ${element.length} | ${element.reason} \n`
        }
        
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اختر احد الاسباب`)
            .setDescription(mess)
            .setTimestamp();
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
              }
              const member = interaction.guild.members.cache.get(cont);
                    let menroles = member.roles.highest.rawPosition
                    let botroles = member.guild.members.me.roles.highest.rawPosition
                    let memroles = interaction.member.roles.highest.rawPosition
                    
                    if(menroles > memroles || menroles > botroles || menroles == memroles || botroles == menroles){
                      await interaction.react("❌")
                      


                     


                    }else{
                    


              let rep2 =   await interaction.reply({embeds:[exampleEmbed] });
              
                const filter = (m) => {
                    let roles = m.member.roles.member._roles

let typeowner = data2["Owners"].includes(interaction.member.id) || roles.some(element => data2["Owners"].includes(element))
let typemanag = data2["Managers"].includes(interaction.member.id) || roles.some(element => data2["Managers"].includes(element))
let typeadmin = data2["Admins"].includes(interaction.member.id) || roles.some(element => data2["Admins"].includes(element))

	
	

	if (typemanag || typeowner) {
	
	
                    return isNumber(m.content) 
    }
                };
                const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });
                
                collector.on('collect',async m => {
                    await interaction.react("✅")
                    await m.delete().catch(x=>{

                    })
                    await rep2.delete().catch(x=>{
                      
                    })
                    member.roles.add(muterole)
                    let time = new Date().getTime()
      data3.members.push({
        member:member.id,
        time,
        timereason:data['mute'][parseFloat(m) - 1].time,
        reason:data['mute'][parseFloat(m) - 1].reason, 
        guild:member.guild.id
      })
      fs.writeFileSync('mutes.json', JSON.stringify(data3));
                    console.log(`Collected ${m.content}`);
                });
                
                collector.on('end',async collected => {
                    
                    console.log(`Collected ${collected.size} items`);
                });
   } }},
};