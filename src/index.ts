import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { deployCommands } from './deploy-commands';
import { config } from './config';
import { commands } from './commands';
import { prisma } from './db';

dotenv.config();

deployCommands();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildInvites]
});

client.once(Events.ClientReady, async () => {
  console.log('Bot is ready');
});

client.on(Events.GuildUpdate, async (oldGuild, guild) => {
  try {
    await prisma.server.update({
      where: {
        id: guild.id
      },
      data: {
        name: guild.name,
        ownerId: guild.ownerId,
        imageUrl: guild.iconURL()
      }
    });
  } catch (error) {
    console.error(error);
  };
})

client.on(Events.GuildCreate, async (guild) => {
  try {
    await prisma.server.create({
      data: {
        id: guild.id,
        name: guild.name,
        ownerId: guild.ownerId,
        imageUrl: guild.iconURL()
      }
    });
  } catch (error) {
    console.error(error)
  };
});

client.on(Events.GuildDelete, async (guild) => {
  try {
    await prisma.server.delete({
      where: {
        id: guild.id
      }
    });
  } catch (error) {
    console.error(error);
  };
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  };

  const { commandName } = interaction;

  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  };
});

client.login(config.BOT_TOKEN);