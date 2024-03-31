import { Express, Request, Response } from 'express';
import { Firestore } from 'firebase/firestore';
import PlayersService from './players.service';
import {
  validatePlayerCreate,
  validatePlayerUpdate,
  validatePlayerVehicleCreate,
} from '../../utils/players.utils';
import { getServiceMessage } from '../../utils/logging.utils';

class PlayersRouter {
  db: Firestore;
  service: PlayersService;

  constructor(db: Firestore) {
    this.db = db;
    this.service = new PlayersService(this.db);
  }

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ data });
  };

  create = async (req: Request, res: Response) => {
    const playerCreate = validatePlayerCreate(req.body);
    const data = await this.service.create(playerCreate);
    res.json({ data });
  };

  get = async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const data = await this.service.get(playerId);
    res.json({ data });
  };

  update = async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const playerUpdate = validatePlayerUpdate(req.body);
    const data = await this.service.update(playerId, playerUpdate);
    res.json({ data });
  };

  remove = async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const data = await this.service.remove(playerId);
    res.json({ data });
  };

  addVehicle = async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const vehicleId = req.params.vehicleId;
    const playerVehicleCreate = validatePlayerVehicleCreate(req.body);
    const data = await this.service.addVehicle(playerId, vehicleId, playerVehicleCreate);
    res.json({ data });
  };

  removeVehicle = async (req: Request, res: Response) => {
    const playerId = req.params.playerId;
    const vehicleId = req.params.vehicleId;
    const data = await this.service.removeVehicle(playerId, vehicleId);
    res.json({ data });
  };
}

function playersController(app: Express, db: Firestore) {
  const router = new PlayersRouter(db);

  // get all players
  app.get('/players', router.getAll);
  // create a player
  app.post('/players', router.create);
  // get a player
  app.get('/players/:playerId', router.get);
  // update a player
  app.put('/players/:playerId', router.update);
  // delete a player
  app.delete('/players/:playerId', router.remove);
  // add a vehicle to a player
  app.post('/players/:playerId/vehicles/:vehicleId', router.addVehicle);
  // remove a vehicle to a player
  app.delete('/players/:playerId/vehicles/:vehicleId', router.removeVehicle);

  console.log(getServiceMessage('Players'));
}

export default playersController;
