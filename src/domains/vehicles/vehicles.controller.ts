import { Express, Request, Response } from 'express';
import { Firestore } from 'firebase/firestore';
import VehiclesService from './vehicles.service';
import { getServiceMessage } from '../../utils/logging.utils';

class VehiclesRouter {
  db: Firestore;
  service: VehiclesService;

  constructor(db: Firestore) {
    this.db = db;
    this.service = new VehiclesService(this.db);
  }

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ data });
  };

  get = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId;
    const data = await this.service.get(vehicleId);
    res.json({ data });
  };
}

function vehiclesController(app: Express, db: Firestore) {
  const router = new VehiclesRouter(db);

  // get all vehicles
  app.get('/vehicles', router.getAll);
  // get a vehicle
  app.get('/vehicles/:vehicleId', router.get);

  console.log(getServiceMessage('Vehicles'));
}

export default vehiclesController;
