import path from 'node:path';
import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import getFile from '~/utils/getFiles';

dotenv.config();

interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void;
}

const deployCommands = async (): Promise<void> => {
  if (process.env.TOKEN == null) {
    console.error('The environment variable TOKEN is not set.');
    process.exit();
  } else if (process.env.CLIENT_ID == null) {
    console.error('The environment variable CLIENT_ID is not set.');
    process.exit();
  }

  try {
    const commands: Command[] = [];
    const commandFiles = await getFile(path.join(__dirname, 'commands'));

    for (const file of commandFiles) {
      const { default: command } = await import(file);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands,
      },
    );

    console.log(
      `Successfully reloaded ${Array(data).length} application (/) commands.`,
    );
  } catch (err: unknown) {
    console.error(new Error(`An error has occurred: ${String(err)}`));
  }
};

void Promise.all([deployCommands()]);
