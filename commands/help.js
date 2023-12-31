const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('send help list for you'),
        type:"admin",
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
                    {
                        label: 'admin',
                        description: 'send admin commands list',
                        value: 'admin',
                    },
                    {
                        label: 'log',
                        description: 'send log commands list',
                        value: 'log',
                    },
                    {
                        label: 'event',
                        description: 'send event commands list',
                        value: 'event',
                    }

                ]),
        );
        await interaction.reply({ content: 'اختر عنصر من القائمه وسوف تصلك رساله بالاوامر', components: [row] });
	},
};