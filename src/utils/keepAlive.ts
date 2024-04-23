import express from 'express';
const port = process.env.PORT ?? 3000;

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

export default async function keepAlive(): Promise<void> {
  run();
}
