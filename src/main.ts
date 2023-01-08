import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type:VersioningType.URI,
    defaultVersion:'1',
    prefix:'v'
  });
  const config = new DocumentBuilder().setTitle('API Application')
                      .setDescription("Learn API Application")
                      .setVersion('v1')
                      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(3000);
}
bootstrap();
