import express, { Express } from 'express';
import { db } from './clients/firebase.client';
import playersController from './services/players/players.controller';
import vehiclesController from './services/vehicles/vehicles.controller';

const port = process.env.PORT || 8080;
const app: Express = express();

app.use(express.json()); // This parses JSON bodies

// Example Players
// - Shalin: nchskFoPBYcvKzIz2JpI
// - Kevin: zPnsbd1TWu0CraQZlCDO
playersController(app, db);

// Example Vehicles
// - Merope: YGbzbsBQWO2ibN37WKKs
// - Pheme: kY3fKHxOtuHgyuPI6bm5
vehiclesController(app, db);

app.listen(port, () => {
  console.log(`  🏎️  🏎  🏎   Car Derby API is running on port ${port}!`);
});
