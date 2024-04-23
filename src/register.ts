import { REST, Routes } from 'discord.js';
import path from 'node:path';
import dotenv from 'dotenv';
import getFile from '~/utils/getFiles';

dotenv.config();

const deployCommands = async (): Promise<void> => {
  if (process.env.TOKEN == null) {
    console.error('The environment variable TOKEN is not set.');
    process.exit();
  } else if (process.env.CLIENT_ID == null) {
    console.error('The environment variable CLIENT_ID is not set.');
    process.exit();
  }

  try {
    const commands: any = [];
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
      `Successfully reloaded ${(data as any[]).length} application (/) commands.`,
    );
  } catch (err: any) {
    console.error(new Error(`An error has occurred: ${err}`));
  }
};

void Promise.all([deployCommands()]);
