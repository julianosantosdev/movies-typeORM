import app from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database is Connected!');

    const appPort: number = Number(process.env.PORT) || 3000;

    app.listen(appPort, () => {
      console.log(`Server is running on https://localhost:${appPort}`);
    });
  })
  .catch((error) => console.error(error));
