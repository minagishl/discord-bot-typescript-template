import { type Client, Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client): void {
    // Log the username of the client when it is ready.
    console.log(`Logged in as ${client.user?.username}!`);
  },
};
