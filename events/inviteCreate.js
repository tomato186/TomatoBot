const { MessageEmbed } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: 'inviteCreate',
	async execute(invite,client,guildInvites) {
       const invites = await invite.guild.invites.fetch();

    const codeUses = new Map();
    invites.each(inv => codeUses.set(inv.code, inv.uses));

    guildInvites.set(invite.guild.id, codeUses);
        },
};