import { Admin } from './NormalTypes/Admin.entity';
import { CourseMainArea } from './NormalTypes/CourseMainArea.entity';
import { CoursePeriod } from './NormalTypes/CoursePeriod.entity';
import { CourseStartingYear } from './NormalTypes/CourseStartingYear.entity';
import { Education } from './NormalTypes/Education.entity';
import { EducationCourse } from './NormalTypes/EducationCourse.entity';
import { EducationMainArea } from './NormalTypes/EducationMainArea.entity';
import { MainArea } from './NormalTypes/MainArea.entity';
import { MasterProfile } from './NormalTypes/MasterProfile.entity';
import { MasterProfileCourseOptional } from './NormalTypes/MasterProfileCourseOptional.entity';
import { MasterProfileCourseRequired } from './NormalTypes/MasterProfileCourseRequired.entity';
import { MasterSchema } from './NormalTypes/MasterSchema.entity';
import { MasterSchemaCourse } from './NormalTypes/MasterSchemaCourse.entity';
import { Package } from './NormalTypes/Package.entity';
import { PackageCourse } from './NormalTypes/PackageCourse.entity';
import { Period } from './NormalTypes/Period.entity';
import { StartingYear } from './NormalTypes/StartingYear.entity';
import { Student } from './NormalTypes/Student.entity';
import { Teacher } from './NormalTypes/Teacher.entity';
import { University } from './NormalTypes/University.entity';

const entities = [
  Admin,
  Education,
  MainArea,
  MasterProfile,
  MasterSchema,
  Package,
  Period,
  StartingYear,
  Student,
  Teacher,
  University,
  CourseMainArea,
  CoursePeriod,
  CourseStartingYear,
  EducationCourse,
  EducationMainArea,
  MasterProfileCourseRequired,
  MasterProfileCourseOptional,
  MasterSchemaCourse,
  PackageCourse,
];

export {
  Admin,
  Education,
  MainArea,
  MasterProfile,
  MasterSchema,
  Package,
  Period,
  StartingYear,
  Student,
  Teacher,
  University,
  CourseMainArea,
  CoursePeriod,
  CourseStartingYear,
  EducationCourse,
  EducationMainArea,
  MasterProfileCourseRequired,
  MasterProfileCourseOptional,
  MasterSchemaCourse,
  PackageCourse,
};
export default entities;
