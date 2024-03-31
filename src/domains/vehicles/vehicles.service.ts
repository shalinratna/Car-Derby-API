import { Vehicle } from '../../types/vehicles.types';
import { collection, getDocs, doc, getDoc, Firestore } from 'firebase/firestore';

export class VehiclesService {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  getAll = async () => {
    const ref = collection(this.db, 'vehicles');
    const snapshot = await getDocs(ref);
    const vehiclesList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Vehicle[];

    return vehiclesList;
  };

  get = async (id: string) => {
    const ref = doc(this.db, 'vehicles', id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error(`Vehicle with id ${id} does not exist`);
    }

    const vehicle = {
      id: snapshot.id,
      ...snapshot.data(),
    } as Vehicle;

    return vehicle;
  };
}

export default VehiclesService;
