import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from 'src/entities/NormalTypes/deprecated/Period.entity';
import { CreatePeriodInput } from 'src/inputTypes/create-period.input';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  // Creates a new period and saves it in the database.
  async createPeriod(createPeriod: CreatePeriodInput): Promise<Period> {
    const period = await this.findOne(createPeriod.value);
    if (period) {
      throw new HttpException(
        `That period already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const newPeriod = this.periodRepository.create(createPeriod);
    return this.periodRepository.save(newPeriod);
  }

  // Find all periods from the period table.
  async findAll(): Promise<Period[]> {
    return this.periodRepository.find(); // SELECT * FROM period;
  }

  // Finds a specific period or returns null.
  async findOne(value: number): Promise<Period> {
    return await this.periodRepository.findOne({
      where: { value: value },
    });
  }
}
