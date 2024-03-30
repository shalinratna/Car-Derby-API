import { Express, Request, Response } from 'express';
import { Firestore } from 'firebase/firestore';
import VehiclesService from './vehicles.service';

function vehiclesController(app: Express, db: Firestore) {
  const vehiclesService = new VehiclesService(db);

  // get all vehicles
  app.get('/vehicles', async (req: Request, res: Response) => {
    const data = await vehiclesService.getAll();
    res.json({ data });
  });

  // get a vehicle
  app.get('/vehicles/:vehicleId', async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId;
    const data = await vehiclesService.get(vehicleId);
    res.json({ data });
  });

  console.log('Vehicles controller instantiated!');
}

export default vehiclesController;
