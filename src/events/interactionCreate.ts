import { Events, type Interaction } from 'discord.js';

// Map to keep track of user rate limits
const rateLimitMap = new Map();

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction): Promise<void> {
    // Check if the interaction is a chat input command
    if (!interaction.isChatInputCommand()) return;

    // If the interaction is not in a guild, send a DM block embed and delete it after 5 seconds
    if (interaction.guild == null) {
      await interaction.reply('This command can only be used in a server.');
      return;
    }

    // Check if the user has exceeded the rate limit
    const userRateLimit: number = rateLimitMap.get(interaction.user.id);
    // Slash commands that can be executed per second
    const rateLimit = parseInt(process.env.RATE_LIMIT ?? '3');
    if (userRateLimit !== 0 && userRateLimit > rateLimit) {
      await interaction.reply(
        'You are sending too many requests. Please wait a moment and try again.',
      );
      console.log(`${interaction.user.id} | command is currently restricted.`);
      return;
    }

    // Get the command object from the client's commands collection
    const command = interaction.client.commands.get(interaction.commandName);

    // If the command does not exist, log an error and return
    if (command === undefined) {
      console.error(`The command ${interaction.commandName} does not exist.`);
      return;
    }

    try {
      // Execute the command and log the result
      await command.execute(interaction);
      console.log(
        `The ${interaction.commandName} command has been executed <${interaction.user.id}>`,
      );
    } catch (err: any) {
      // If an error occurs, log the error and send an error message to the user
      console.error(err);
      await interaction.reply('An error occurred while executing the command.');
    }

    // Update the user's rate limit and delete it after 1 second
    rateLimitMap.set(interaction.user.id, (userRateLimit ?? 0) + 1);
    setInterval(() => {
      rateLimitMap.delete(interaction.user.id);
    }, 1000);
  },
};
