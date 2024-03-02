import express, { Express, Request, Response } from 'express';
import PlayersService from './services/players/players.service';

const PORT = process.env.PORT || 8080;
const app: Express = express();
const playersService = new PlayersService();

app.get('/players', async (req: Request, res: Response) => {
  const allPlayers = await playersService.getAllPlayers();
  res.json({ allPlayers });
});

app.get('/players/:playerId', (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const data = playersService.getPlayerData(playerId);
  res.json({ data });
});

app.listen(PORT, () => {
  console.log(`  🏎️  🏎  🏎   Car Derby API is running on port ${PORT}!`);
});

/*

CRUD:
- app.post();   -> create
- app.get();    -> read 
- app.put();    -> update
- app.delete(); -> delete

*/
