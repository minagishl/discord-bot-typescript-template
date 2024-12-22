import express from 'express';
const DEFAULT_PORT = 3000;
const port = process.env.PORT ?? DEFAULT_PORT;

const app = express();
const appName = process.env.APP_NAME ?? 'Discord Bot';

app.get('/', (_req, res) => {
  res.send(`${appName} is alive!`);
});

function run(): void {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}

export default function keepAlive(): void {
  run();
}
