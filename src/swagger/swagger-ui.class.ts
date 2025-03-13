import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export class SwaggerUI {
  static setup(app: INestApplication, doc: any, options?: any) {
    SwaggerModule.setup('api/docs', app, doc, options);
  }
}
