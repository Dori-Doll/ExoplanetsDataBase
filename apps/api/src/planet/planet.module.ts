import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetResolver } from './planet.resolver';

@Module({
  providers: [PlanetService, PlanetResolver],
})
export class PlanetModule {}
