import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { Planet } from './planet.model';

@Injectable()
export class PlanetService implements OnModuleInit {
  private readonly logger = new Logger(PlanetService.name);
  private planets: Planet[] = [];

  onModuleInit() {
    this.logger.log('Loading exoplanets dataset from CSV...');
    
    // Path to the csv located at the root of the workspace
    const csvFilePath = path.join(process.cwd(), '../../exoplanets.csv');

    if (!fs.existsSync(csvFilePath)) {
      this.logger.error(`CSV file not found at ${csvFilePath}`);
      return;
    }

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
          this.planets.push({
            pl_name: data.pl_name,
            hostname: data.hostname,
            disc_year: data.disc_year ? parseInt(data.disc_year, 10) : null,
            pl_bmasse: data.pl_bmasse ? parseFloat(data.pl_bmasse) : null,
            sy_dist: data.sy_dist ? parseFloat(data.sy_dist) : null,
          });
        }
      })
      .on('end', () => {
        this.logger.log(`Successfully loaded ${this.planets.length} exoplanets.`);
      })
      .on('error', (err: any) => {
        this.logger.error('Error parsing CSV: ', err);
      });
  }

  findAll(): Planet[] {
    return this.planets;
  }
}
