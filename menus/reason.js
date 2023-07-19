const fs = require('node:fs');
const path = require('node:path');
const { MessageActionRow, MessageSelectMenu , MessageEmbed , Modal , TextInputComponent} = require('discord.js');

module.exports = {
	name:'reason',
	async execute(interaction,client) {
		
		let value = interaction.values[0]
		const modal = new Modal()
			.setCustomId('reason')
			.setTitle('add new reason');
		// Add components to modal
		// Create the text input components
		const favoriteColorInput = new TextInputComponent()
			.setCustomId('reason-mute')
		    // The label is the prompt the user sees for this input
			.setLabel("reason")
		    // Short means only a single line of text
			.setStyle('PARAGRAPH');
		const hobbiesInput = new TextInputComponent()
			.setCustomId('Time')
			.setLabel("Time")
		    // Paragraph means multiple lines of text.
			.setStyle('SHORT');
            const hobbiesInput2 = new TextInputComponent()
			.setCustomId('Length')
			.setLabel("length")
		    // Paragraph means multiple lines of text.
			.setStyle('SHORT');
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
		const secondActionRow3 = new MessageActionRow().addComponents(hobbiesInput2);
		
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow,secondActionRow3);
		// Show the modal to the user
		await interaction.showModal(modal);
	
},
};