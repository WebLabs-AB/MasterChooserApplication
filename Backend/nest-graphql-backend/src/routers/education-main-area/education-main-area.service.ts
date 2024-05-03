import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationMainArea, Education, MainArea } from 'src/entities';
import { CreateEducationMainAreaInput } from 'src/inputTypes/create/create-education-mainArea.input';
import { RemoveEducationMainAreaInput } from 'src/inputTypes/remove/remove-education-mainArea.input';
import { UpdateEducationMainAreaInput } from 'src/inputTypes/update/update-education-mainArea.input';
import { Repository } from 'typeorm';

@Injectable()
export class EducationMainAreaService {
  constructor(
    @InjectRepository(EducationMainArea)
    private educationMainAreaRepository: Repository<EducationMainArea>,
    @InjectRepository(MainArea)
    private mainAreaRepository: Repository<MainArea>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  /**
   * Description: Finds all EducationMainArea objects in the database
   * Input: Null
   * @returns All EducationMainArea objects
   */
  async findAll(): Promise<EducationMainArea[]> {
    return this.educationMainAreaRepository.find();
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: mainAreaName & educationId
   * @param createEducationMainAreaInput Information needed to create new EducationMainArea
   * @returns The saved new EducationMainArea
   */
  async createEducationMainArea(
    createEducationMainAreaInput: CreateEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    if (
      await this.doesEducationMainAreaExists(
        createEducationMainAreaInput.mainAreaName,
        createEducationMainAreaInput.educationId,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newEducationMainArea = this.educationMainAreaRepository.create(
      createEducationMainAreaInput,
    );
    return this.educationMainAreaRepository.save(newEducationMainArea);
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: educationId & list with MainArea primary keys.
   * @param updateEducationMainAreaInput An object containing the educationId and
   * a list of educationIds..
   * @returns The new updated EducationMainAreas.
   */
  async updateEducationMainArea(
    updateEducationMainAreaInput: UpdateEducationMainAreaInput,
  ): Promise<EducationMainArea[]> {
    const mainAreaName = updateEducationMainAreaInput.mainAreaName;
    const educationId = updateEducationMainAreaInput.educationId;

    // Find the course we want to update its relationship.
    const mainArea = await this.mainAreaRepository.findOneBy({ mainAreaName });
    if (!mainArea) {
      throw new Error(`Course with ID ${mainAreaName} not found`);
    }

    // Remove existing EducationMainArea connections for this course.
    await this.educationMainAreaRepository.delete({ mainArea });

    // Create a new EducationMainArea entity for each educationId.
    const updatedEducationMainAreas = educationId.map(async (educationId) => {
      const education = await this.educationRepository.findOneBy({
        name: educationId,
      });

      if (!education) {
        throw new Error(`MainArea with name ${educationId} not found`);
      }

      // Create a new EducationMainArea connection.
      const educationMainArea = this.educationMainAreaRepository.create({
        mainArea,
        education,
        mainAreaName: mainArea.name,
        educationId: education.educationId,
      });

      // Save the new EducationMainArea connection.
      return this.educationMainAreaRepository.save(educationMainArea);
    });

    return Promise.all(updatedEducationMainAreas);
  }

  /**
   * Description: Deletes a EducationMainArea entity
   * from the database based on the provided criteria.
   * @param removeEducationMainAreaInput An object containing the educationId and
   * mainAreaName of the EducationMainArea to be deleted.
   * @returns A Promise that resolves to the deleted EducationMainArea entity.
   */
  async removeEducationMainArea(
    removeEducationMainAreaInput: RemoveEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    // Check if EducationMainArea exists in the database.
    const existingEducationMainArea =
      await this.educationMainAreaRepository.findOne({
        where: {
          mainAreaName: removeEducationMainAreaInput.mainAreaName,
          educationId: removeEducationMainAreaInput.educationId,
        },
      });

    if (!existingEducationMainArea) {
      throw new HttpException(
        'Course main area do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If EducationMainArea exists, delete it.
    return this.educationMainAreaRepository.remove(existingEducationMainArea);
  }

  /**
   * Description: Retrieves EducationMainArea entities from the database based
   * on the provided main area name.
   * @param mainAreaName The name of the main area to retrieve EducationMainArea
   * entities for.
   * @returns A Promise that resolves to an array of EducationMainArea entities
   * matching the provided main area name.
   */
  async educationFromMainArea(
    mainAreaName: string,
  ): Promise<EducationMainArea[]> {
    return await this.educationMainAreaRepository.find({
      where: { mainAreaName: mainAreaName },
    });
  }

  /**
   * Description: Check if a specific EducationMainArea exists in the database.
   * @param educationId The ID of the course associated with the EducationMainArea.
   * @param mainAreaName The name of the main area associated with the EducationMainArea.
   * @returns A Promise that resolves to a boolean indicating whether the EducationMainArea exists.
   */
  async doesEducationMainAreaExists(
    mainAreaName: string,
    educationId: string,
  ): Promise<boolean> {
    const educationMainArea = await this.educationMainAreaRepository.findOne({
      where: { mainAreaName: mainAreaName, educationId: educationId },
    });

    if (!educationMainArea) {
      return false;
    } else {
      return true;
    }
  }
}
