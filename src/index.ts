// Import the required packages
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import path from 'node:path';
import getFiles from '~/utils/getFiles';
import keepAlive from './utils/keepAlive';

// Load the environment variables
dotenv.config();

if (process.env.TOKEN == null) {
  console.error(new Error('The environment variable "TOKEN" is not set.'));
  process.exit();
}

// Keep the bot alive
if (process.env.KEEP_ALIVE === 'true') {
  void keepAlive();
}

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function loadCommands(): Promise<void> {
  // Get all the command files
  const commandFiles = await getFiles(path.join(__dirname, '/commands'));

  const commands: any[] = await Promise.all(
    commandFiles.map(async (file) => {
      // Import the command file
      const { default: command } = await import(file);
      // Check if the command has the required "data" and "execute" properties
      if ('data' in command && 'execute' in command) {
        return [command.data.name, command];
      } else {
        console.error(
          `${file} command does not have the required "data" or "execute" properties.`,
        );
        return undefined;
      }
    }),
  );

  // Add the commands to the client.commands collection
  client.commands = new Collection(
    commands
      .filter((command) => command !== null)
      .map(([name, command]) => [name, command]),
  );
}

/**
 * Get all the event files and register them with the client.
 */
async function loadEvents(): Promise<void> {
  // Get all the event files
  const eventFiles = await getFiles(path.join(__dirname, '/events'));

  type EventType = [string, (...args: any[]) => void, { once: boolean }?];

  const events = await Promise.all(
    eventFiles.map(async (file) => {
      // Import the event file
      const { default: event } = await import(file);
      if (event?.once === true) {
        return [
          event.name,
          (...args: any[]) => event.execute(...args),
          { once: true },
        ] as EventType;
      } else {
        return [
          event.name,
          (...args: any[]) => event.execute(...args),
        ] as EventType;
      }
    }),
  );

  events.forEach((event: EventType) => {
    if (event[2]?.once === true) {
      client.once(event[0], event[1]);
    } else {
      client.on(event[0], event[1]);
    }
  });
}

client.login(process.env.TOKEN).catch((err: any) => {
  console.error(new Error(`Failed to login ${err}`));
});

// Load commands and events
Promise.all([loadCommands(), loadEvents()])
  .then(() => {
    // Log a success message when the commands and events are loaded.
    console.log('Successfully loaded commands and events.');
  })
  .catch((err: any) => {
    // Log an error if the commands and events fail to load.
    console.error(new Error(`Failed to load commands and events:\n${err}`));
  });
