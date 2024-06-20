import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService;
  const insightDbUri = configService.get<string>('database.insight.uri');
  const patientsDbUri = configService.get<string>('database.patients.uri');
  const healthDbUri = configService.get<string>('database.health.uri');
  console.log(`Insight DB URI: ${insightDbUri}`);
  console.log(`Patients DB URI: ${patientsDbUri}`);
  console.log(`Health DB URI: ${healthDbUri}`);
  await app.listen(3001);
}
bootstrap();
