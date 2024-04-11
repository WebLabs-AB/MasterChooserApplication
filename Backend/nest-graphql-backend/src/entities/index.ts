import { Admin } from './NormalTypes/Admin.entity';
import { Course } from './NormalTypes/deprecated/Course.entity';
import { CourseEducations } from './NormalTypes/deprecated/CourseEducations.entity';
import { CourseMainAreas } from './NormalTypes/deprecated/CourseMainAreas.entity';
import { CoursePeriods } from './NormalTypes/deprecated/CoursePeriods.entity';
import { CourseStartingYears } from './NormalTypes/deprecated/CourseStartingYears.entity';
import { Education } from './NormalTypes/Education.entity';
import { GeneralRequirements } from './NormalTypes/deprecated/GeneralRequirements.entity';
import { MainArea } from './NormalTypes/deprecated/MainArea.entity';
import { MasterProfile } from './NormalTypes/MasterProfile.entity';
import { MasterSchema } from './NormalTypes/deprecated/MasterSchema.entity';
import { Period } from './NormalTypes/deprecated/Period.entity';
import { StartingYear } from './NormalTypes/StartingYear.entity';
import { Student } from './NormalTypes/Student.entity';
import { Teacher } from './NormalTypes/Teacher.entity';
import { University } from './NormalTypes/University.entity';

const entities = [
  Admin,
  Course,
  CourseEducations,
  CourseMainAreas,
  CoursePeriods,
  CourseStartingYears,
  Education,
  GeneralRequirements,
  MainArea,
  MasterProfile,
  MasterSchema,
  Period,
  StartingYear,
  Student,
  Teacher,
  University,
];

export {
  Admin,
  Course,
  CourseEducations,
  CourseMainAreas,
  CoursePeriods,
  CourseStartingYears,
  Education,
  GeneralRequirements,
  MainArea,
  MasterProfile,
  MasterSchema,
  Period,
  StartingYear,
  Student,
  Teacher,
  University,
};
export default entities;
