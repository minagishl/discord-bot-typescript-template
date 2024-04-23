import { Events, type Client } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client): Promise<void> {
    // Log the username of the client when it is ready.
    console.log(`Logged in as ${client.user?.username}!`);
  },
};
