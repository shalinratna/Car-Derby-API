import express, { Express, Request, Response } from 'express';

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: '🎉 Hello from TypeScript! 🎉' });
});

app.get('/users/:userId/games/:gameId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const gameId = req.params.gameId;
  res.json({ userId, gameId });
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
