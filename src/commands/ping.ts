import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { COLOR } from '~/config';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns the response speed to the server.'),

  async execute(interaction: ChatInputCommandInteraction) {
    const MIN = 0;
    const MAX = 999;

    try {
      let ping: number = interaction.client.ws.ping;
      ping = Math.min(ping > MIN ? ping : MIN, MAX);

      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Pong!')
        .setDescription(`WebSocket Ping: ${ping}ms\nAPI Endpoint Ping: ...`);
      const msg = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      });

      const apiPing = Math.min(
        msg.createdTimestamp - interaction.createdTimestamp,
        MAX,
      );

      embed.setDescription(
        `WebSocket Ping: ${ping}ms\nAPI Endpoint Ping: ${apiPing}ms`,
      );
      await interaction.editReply({ embeds: [embed] });
    } catch (err: unknown) {
      console.error(err);
    }
  },
};
