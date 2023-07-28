const { MessageEmbed } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member,client,guildInvites) {
        const jsonData = fs.readFileSync('logs.json');
        var data = JSON.parse(jsonData);
let channel = client.channels.cache.get(data.join)        
        if(channel){
		
        let timejoin = member.joinedTimestamp
        let timedis = member.user.createdTimestamp
       
// عدد الأمثال في يوم واحد (يوم واحد يُعادل 24 ساعة × 60 دقيقة × 60 ثانية × 1000 ميلّي ثانية)
const millisecondsInOneDay = 24 * 60 * 60 * 1000;

// حساب فرق الوقت بين الوقتين بالأمثال
const timeDifference = Math.abs(timejoin - timedis);

// حساب عدد الأيام بين الوقتين
const daysDifference = timeDifference / millisecondsInOneDay;

// عدد الأيام في سنة واحدة
const daysInOneYear = 365;
let chr;
// التحقق مما إذا كان قد مرت سنة كاملة (أكثر من 365 يومًا) بين الوقتين
if (daysDifference >= daysInOneYear) {
  // قم بتنفيذ الإجراء الذي ترغب فيه
  // هنا يمكنك وضع الكود الخاص بك للتعامل مع حالة مرور سنة
  chr = 'D'
} else {
  chr = 'R'
}

// Now we want to get any new invites that may have been created and add them to our map.
// Note, we are using await meaning you'll need an async function. Otherwise use .then()
const cachedInvites = guildInvites.get(member.guild.id)
const newInvites = await member.guild.invites.fetch();

    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  
newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
guildInvites.set(member.guild.id, cachedInvites);

const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("new Member")
            .addFields(
                { name: 'Member', value: `${member.user}` },
                { name: 'Inviter', value: `${usedInvite.inviter}` },
                { name: 'Server Join', value: `<t:${Math.floor(timejoin / 1000)}:R>`},
                { name: 'Discord Join', value:`<t:${Math.floor(timedis /1000)}:${chr}>` },
            )
            .setTimestamp();
            
channel.send({embeds:[exampleEmbed]})
	}},
};