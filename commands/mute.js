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
                await interaction.reply({embeds:[exampleEmbed] });
                const filter = (m) => {
                    let roles = m.member.roles.member._roles

	if (data2['Admins'].includes(interaction.member.id) || roles.some(element => data2["Admins"].includes(element))) {
	
                    return isNumber(m.content) 
    }
                };
                const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });
                
                collector.on('collect',async m => {
                    await interaction.reply("عطيته ميوت العسل")
                    const member = interaction.guild.members.cache.get(cont);
                    member.roles.add(muterole)
                    let time = new Date().getTime()
      data3.members.push({
        member:member.id,
        time,
        reason:data['mute'][parseFloat(m) - 1].reason
      })
      fs.writeFileSync('mutes.json', JSON.stringify(data3));
                    console.log(`Collected ${m.content}`);
                });
                
                collector.on('end',async collected => {
                    
                    console.log(`Collected ${collected.size} items`);
                });
            },
};