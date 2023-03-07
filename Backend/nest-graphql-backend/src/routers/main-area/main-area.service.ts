import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { MainArea } from 'src/entities/NormalTypes/MainArea.entity';
import { CreateMainAreaInput } from 'src/inputTypes/create-mainArea.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class MainAreaService {
  constructor(
    @InjectRepository(MainArea)
    private mainAreaRepository: Repository<MainArea>,
  ) {}

  // Creates a new mainarea and saves it in the database.
  async createMainArea(createMainArea: CreateMainAreaInput): Promise<MainArea> {
    const mainArea = await this.findOne(createMainArea.type);
    if (mainArea) {
      throw new UserInputError(`That main area already exists`);
    }

    const newMainArea = this.mainAreaRepository.create(createMainArea);
    return this.mainAreaRepository.save(newMainArea);
  }

  // Find all programs from the mainarea table.
  async findAll(): Promise<MainArea[]> {
    return this.mainAreaRepository.find(); // SELECT * FROM mainarea;
  }

  // Finds a specific mainarea or returns null.
  async findOne(type: string): Promise<MainArea> {
    return await this.mainAreaRepository.findOne({
      where: { type: type },
    });
  }
}
