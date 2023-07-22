const fs = require('node:fs');
const path = require('node:path');
const { MessageActionRow, MessageSelectMenu , MessageEmbed , Modal , TextInputComponent} = require('discord.js');

module.exports = {
	name:'status',
	async execute(interaction,client) {
		
		let value = interaction.values[0]
		const modal = new Modal()
			.setCustomId('status')
			.setTitle('set new status');
            let name = "name"
            if (value == "streaming") name = "url";
		// Add components to modal
		// Create the text input components
            const favoriteColorInput2 = new TextInputComponent()
			.setCustomId(`status-${value}`)
		    // The label is the prompt the user sees for this input
			.setLabel("status")
		    // Short means only a single line of text?
			.setStyle('SHORT');
            const hobbiesInput2 = new TextInputComponent()
			.setCustomId(`name-${value}`)
			.setLabel(`name`)

		    // Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
            const hobbiesInput = new TextInputComponent()
			.setCustomId(`${name}-${value}`)
			.setLabel(`${name}`)

		    // Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
            
		// An action row only holds one text input,
		// so you need one action row per text input.
		const secondActionRow = new MessageActionRow().addComponents(favoriteColorInput2);
		const secondActionRow2 = new MessageActionRow().addComponents(favoriteColorInput);
		
        const secondActionRow3 = new MessageActionRow().addComponents(hobbiesInput2);
		
		// Add inputs to the modal
		modal.addComponents(secondActionRow,secondActionRow2,secondActionRow3);
		// Show the modal to the user
		await interaction.showModal(modal);
	
},
};