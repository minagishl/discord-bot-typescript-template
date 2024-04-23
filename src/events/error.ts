import { Events } from 'discord.js';

export default {
  name: Events.Error,
  async execute(err: any): Promise<void> {
    // Log the error when it occurs.
    console.error(err);
  },
};
