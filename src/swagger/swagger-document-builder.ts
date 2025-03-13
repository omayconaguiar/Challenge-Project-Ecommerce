import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilder {
  constructor(private app: INestApplication) {}

  build() {
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API Documentation')
      .setVersion('1.0')
      // .addBearerAuth() se quiser
      .build();

    return SwaggerModule.createDocument(this.app, config);
  }
}
