import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // ✅ 추가
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [AppController, BlogController], // ✅ AppController 포함
  providers: [BlogService],
})
export class AppModule {}
