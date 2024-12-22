# Discord Bot TypeScript Template

This repository provides a template for creating a Discord bot using TypeScript. It is designed to be easy to manage and extend.

## Features

- **TypeScript**: Strongly typed language for building robust applications.
- **Biome**: Code formatter that works at high speed
- **Vitest**: Testing framework for ensuring code quality.
- **Docker**: Containerization for easy deployment.

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/minagishl/discord-bot-typescript-template.git
   cd discord-bot-typescript-template
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

### Usage

1. Create a `.env` file in the root directory and add your Discord bot token:

   ```env
   DISCORD_TOKEN=your-token-here
   ```

2. Start the bot:
   ```sh
   yarn start
   ```

## Scripts

- `yarn start`: Starts the bot.
- `yarn lint`: Lints the code.
- `yarn format`: Formats the code.
- `yarn test`: Runs tests.

## Project Structure

- `src/`: Source code of the bot.
- `scripts/`: Scripts for managing the project.
- `tests/`: Unit and integration tests.

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Inspired by the community and contributors of TypeScript and Discord.js.

---

For more information, visit the [repository](https://github.com/minagishl/discord-bot-typescript-template).
