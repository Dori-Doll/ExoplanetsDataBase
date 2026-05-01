import { Query, Resolver } from '@nestjs/graphql';
import { Planet } from './planet.model';
import { PlanetService } from './planet.service';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private planetService: PlanetService) {}

  @Query(() => [Planet])
  planets(): Planet[] {
    return this.planetService.findAll();
  }
}
