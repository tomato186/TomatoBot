const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
		type:"manager",
	async execute(interaction,client) {
		await interaction.reply(`ping me is ${client.ws.ping}ms`);
	},
};