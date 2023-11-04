import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const port = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ credentials: true, origin: '*' });
    await app.listen(port, () => {
      console.log(`Server is litening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
