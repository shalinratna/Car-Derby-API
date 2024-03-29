import express, { Express, Request, Response } from 'express';
import PlayersService from './services/players/players.service';
import { validatePlayerCreate, validatePlayerUpdate } from './utils/players.utils';

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(express.json()); // This parses JSON bodies

const playersService = new PlayersService();

// get all players
app.get('/players', async (req: Request, res: Response) => {
  const data = await playersService.getAllPlayers();
  res.json({ data });
});

// create a player
app.post('/players', async (req: Request, res: Response) => {
  const playerCreate = validatePlayerCreate(req.body);
  const data = await playersService.createPlayer(playerCreate);
  res.json({ data });
});

// get a player
app.get('/players/:playerId', async (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const data = await playersService.getPlayer(playerId);
  res.json({ data });
});

// update a player
app.put('/players/:playerId', async (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const playerUpdate = validatePlayerUpdate(req.body);
  const data = await playersService.updatePlayer(playerId, playerUpdate);
  res.json({ data });
});

// delete a player
app.delete('/players/:playerId', async (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const data = await playersService.deletePlayer(playerId);
  res.json({ data });
});

app.listen(port, () => {
  console.log(`  🏎️  🏎  🏎   Car Derby API is running on port ${port}!`);
});
