import { Express, Request, Response } from 'express';
import { Firestore } from 'firebase/firestore';
import PlayersService from './players.service';
import {
  validatePlayerCreate,
  validatePlayerUpdate,
  validatePlayerVehicleCreate,
} from '../../utils/players.utils';

function playersController(app: Express, db: Firestore) {
  const playersService = new PlayersService(db);

  // get all players
  app.get('/players', async (req: Request, res: Response) => {
    const data = await playersService.getAll();
    res.json({ data });
  });

  // create a player
  app.post('/players', async (req: Request, res: Response) => {
    const playerCreate = validatePlayerCreate(req.body);
    const data = await playersService.create(playerCreate);
    res.json({ data });
  });

  // get a player
  app.get('/players/:playerId', async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const data = await playersService.get(playerId);
    res.json({ data });
  });

  // update a player
  app.put('/players/:playerId', async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const playerUpdate = validatePlayerUpdate(req.body);
    const data = await playersService.update(playerId, playerUpdate);
    res.json({ data });
  });

  // delete a player
  app.delete('/players/:playerId', async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const data = await playersService.delete(playerId);
    res.json({ data });
  });

  // add a vehicle to a player
  app.post(
    '/players/:playerId/vehicles/:vehicleId',
    async (req: Request, res: Response) => {
      const playerId = req.params.playerId;
      const vehicleId = req.params.vehicleId;
      const playerVehicleCreate = validatePlayerVehicleCreate(req.body);
      const data = await playersService.addVehicle(
        playerId,
        vehicleId,
        playerVehicleCreate,
      );
      res.json({ data });
    },
  );

  // remove a vehicle to a player
  app.delete(
    '/players/:playerId/vehicles/:vehicleId',
    async (req: Request, res: Response) => {
      const playerId = req.params.playerId;
      const vehicleId = req.params.vehicleId;
      const data = await playersService.removeVehicle(playerId, vehicleId);
      res.json({ data });
    },
  );

  console.log('Players controller instantiated!');
}

export default playersController;
