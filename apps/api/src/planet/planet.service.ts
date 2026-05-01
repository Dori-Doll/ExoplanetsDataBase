import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { Planet } from './planet.model';

@Injectable()
export class PlanetService implements OnModuleInit {
  private readonly logger = new Logger(PlanetService.name);

  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
  ) {}

  async onModuleInit() {
    this.logger.log('Loading exoplanets dataset from CSV...');
    
    // Check if database is already populated
    const count = await this.planetRepository.count();
    if (count > 0) {
      this.logger.log(`Database already contains ${count} exoplanets.`);
      return;
    }

    // Path to the csv located at the root of the workspace
    const csvFilePath = path.join(process.cwd(), '../../exoplanets.csv');

    if (!fs.existsSync(csvFilePath)) {
      this.logger.error(`CSV file not found at ${csvFilePath}`);
      return;
    }

    const planets: Partial<Planet>[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(
        csvParser({
          separator: ',',   // the file should be comma separated
          skipComments: true // Skips lines starting with '#'
        })
      )
      .on('data', (data: any) => {
        // Just extract the required fields, map to correct types
        if (data.pl_name && data.hostname) {
          planets.push({
            pl_name: data.pl_name,
            hostname: data.hostname,
            disc_year: data.disc_year ? parseInt(data.disc_year, 10) : null,
            pl_bmasse: data.pl_bmasse ? parseFloat(data.pl_bmasse) : null,
            sy_dist: data.sy_dist ? parseFloat(data.sy_dist) : null,
          });
        }
      })
      .on('end', async () => {
        try {
          await this.planetRepository.save(planets);
          this.logger.log(`Successfully loaded ${planets.length} exoplanets into database.`);
        } catch (err) {
          this.logger.error('Error saving planets to database: ', err);
        }
      })
      .on('error', (err: any) => {
        this.logger.error('Error parsing CSV: ', err);
      });
  }

  async findAll(): Promise<Planet[]> {
    return this.planetRepository.find();
  }

  async findByName(pl_name: string): Promise<Planet | null> {
    return this.planetRepository.findOne({ where: { pl_name } });
  }

  async findByHostname(hostname: string): Promise<Planet[]> {
    return this.planetRepository.find({ where: { hostname } });
  }
}
