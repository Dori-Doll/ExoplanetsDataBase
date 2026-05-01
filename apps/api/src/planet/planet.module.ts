import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetService } from './planet.service';
import { PlanetResolver } from './planet.resolver';
import { Planet } from './planet.model';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetService, PlanetResolver],
})
export class PlanetModule {}
