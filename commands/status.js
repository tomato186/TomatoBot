const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('set status  for bot'),
        type:"owner",
	async execute(interaction,client) {
		
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('status')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'playing',
                        value: 'playing',
                    },
                    {
                        label: 'streaming',
                       value: 'streaming',
                    },
                    {
                        label: 'watching',
                        value: 'watching',
                    },
                    {
                        label: 'listening',
                        value: 'listening',
                    }
                ]),
        );
        await interaction.reply({ content: 'اختر عنصر من القائمه الاضافه ستاتس جديد للبوت', components: [row] });
	},
};