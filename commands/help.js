const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('send help list for you'),
	async execute(interaction,client) {
		
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'owner',
                        description: 'send owner commands list',
                        value: 'owner',
                    },
                    {
                        label: 'manager',
                        description: 'send manager commands list',
                        value: 'manager',
                    },
                    ,
                    {
                        label: 'admin',
                        description: 'send admin commands list',
                        value: 'admin',
                    }

                ]),
        );
        await interaction.reply({ content: 'Pong!', components: [row] });
	},
};