import express, { Express, Request, Response } from 'express';
import PlayersService from './services/players/players.service';

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(express.json()); // This parses JSON bodies

const playersService = new PlayersService();

app.get('/players', async (req: Request, res: Response) => {
  const data = await playersService.getAllPlayers();
  res.json({ data });
});

app.get('/players/:playerId', async (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const data = await playersService.getPlayer(playerId);
  res.json({ data });
});

app.post('/players', async (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;
  if (!name || !email || typeof name !== 'string' || typeof email !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const data = await playersService.createPlayer({
    name,
    email,
  });
  res.json({ data });
});

app.get('/players/:playerId/settings', async (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const data = await playersService.getPlayerSettings(playerId);
  res.json({ data });
});

app.listen(port, () => {
  console.log(`  🏎️  🏎  🏎   Car Derby API is running on port ${port}!`);
});
