const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reason')
		.setDescription('set reason list for commands'),
        type:"owner",
	async execute(interaction,client) {
		
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('reason')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'mute',
                        value: 'mute',
                    },
                    {
                        label: 'warn',
                       value: 'warn',
                    },
                    ,
                    {
                        label: 'ban',
                        value: 'ban',
                    }

                ]),
        );
        await interaction.reply({ content: 'اختر عنصر من القائمه الاضافه سبب جديد له', components: [row] });
	},
};