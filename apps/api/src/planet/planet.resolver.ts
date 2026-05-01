import { Query, Resolver, Args } from '@nestjs/graphql';
import { Planet } from './planet.model';
import { PlanetService } from './planet.service';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private planetService: PlanetService) {}

  @Query(() => [Planet])
  async planets(): Promise<Planet[]> {
    return this.planetService.findAll();
  }

  @Query(() => Planet, { nullable: true })
  async planetByName(@Args('name') name: string): Promise<Planet | null> {
    return this.planetService.findByName(name);
  }

  @Query(() => [Planet])
  async planetsByHostname(@Args('hostname') hostname: string): Promise<Planet[]> {
    return this.planetService.findByHostname(hostname);
  }
}
