import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('link a roblox account')

export async function execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
        .setTitle('Link a Roblox Account')
        .setDescription('Account management can only be done on the RoLinker website. Follow the steps below to link a new Roblox account.')
        .addFields(
            {name: 'Step 1', value: 'Tap on the link button and accept the redirection to the RoLinker website.'},
            {name: 'Step 2', value: 'Tap the sign in button on the top right of the website, and sign in with Discord.'},
            {name: 'Step 3', value: "Tap your Discord username, and select 'Manage' from the dropdown."},
            {name: 'Step 4', value: 'Tap the plus (+) icon to add a new Roblox account.'},
        )
        .setColor(Colors.DarkerGrey)

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL('https://rolinker.net/')
            .setLabel('Link'))

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
}