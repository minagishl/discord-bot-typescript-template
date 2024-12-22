import { Events } from 'discord.js';

export default {
  name: Events.Error,
  execute(err: unknown): void {
    // Log the error when it occurs.
    console.error(err);
  },
};
