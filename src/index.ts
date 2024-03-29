import express, { Express, Request, Response } from 'express';
import PlayersService from './services/players/players.service';
import VehiclesService from './services/vehicles/vehicles.service';
import { validatePlayerCreate, validatePlayerUpdate } from './utils/players.utils';

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(express.json()); // This parses JSON bodies

const playersService = new PlayersService();
const vehiclesService = new VehiclesService();

// get all players
app.get('/players', async (req: Request, res: Response) => {
  const data = await playersService.getAllPlayers();
  res.json({ data });
});

// get all vehicles
app.get('/vehicles', async (req: Request, res: Response) => {
  const data = await vehiclesService.getAllVehicles();
  res.json({ data });
});

// get a vehicle
app.get('/vehicles/:vehicleId', async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  const data = await vehiclesService.getVehicle(vehicleId);
  res.json({ data });
});

// add a vehicle to a player
app.post(
  '/players/:playerId/vehicles/:vehicleId',
  async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const vehicleId = req.params.vehicleId;
    const data = await playersService.addVehicleToPlayer(playerId, vehicleId);
    res.json({ data });
  },
);

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
