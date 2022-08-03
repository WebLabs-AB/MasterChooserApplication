import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { StartingYear } from 'src/entities/StartingYear.entity';
import { CreateStartingYearInput } from 'src/inputTypes/create-startingYear.input';

@Injectable()
export class StartingYearService {
  constructor(
    @InjectRepository(StartingYear)
    private startingYearRepository: Repository<StartingYear>,
  ) {}

  async createStartingYear(
    createStartingYearInput: CreateStartingYearInput,
  ): Promise<StartingYear> {
    const newStartingYear = this.startingYearRepository.create(
      createStartingYearInput,
    );
    return this.startingYearRepository.save(newStartingYear);
  }

  async findAll(): Promise<StartingYear[]> {
    return this.startingYearRepository.find(); // SELECT * FROM startingYear;
  }
}
