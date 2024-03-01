import express, { Express, Request, Response } from 'express';
import PlayersService from './services/players/players.service';

const PORT = process.env.PORT || 8080;
const app: Express = express();
const playersService = new PlayersService();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: '🎉 Hello from TypeScript! 🎉' });
});

app.get('/players/:playerId/vehicles/', (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const vehicles = playersService.getPlayerVehicles(playerId);
  res.json({ vehicles });
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
