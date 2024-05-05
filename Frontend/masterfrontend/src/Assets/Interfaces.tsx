export interface universityJsonType {
  universityName: string;
}

export interface educationJsonType {
  educationName: string;
}

export interface startingYearJsonType {
  startingYear: string;
}

export interface createRegularuserInputJsonType {
  email: string;
  password: string;
  startingYear: number;
  universityName: string;
  educationName: string;
}

export interface CourseData {
  code: string;
  name: string;
  hp: string;
  level: string;
  period: string;
  block: string;
  vof: string;
}

// Define interfaces for strict typing with TypeScript to enhance code reliability and developer experience.
export interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number; // "hp" stands for "hours per period" or could be "honor points", depending on context
  priority: string;
}

export interface ProfileRequirements {
  minCourses: number;
  minAdvancedCourses: number;
  selectedEducations: string[];
  packageRequirements: {
    packageId: number;
    packageName: string;  // Added to show package names in the UI
    minCourses: number;
  }[];
}

export interface ProfileSectionProps {
  packages: CoursePackage[]; // Array of course packages to be displayed or edited
  courses: Course[];
}

export interface CourseListSectionProps {
  courses: Course[];
  removeCourse: (courseId: number) => void;
  updatePriority: (courseId: number, newPriority: string) => void;
}

export interface SearchSectionProps {
  onAddCourse: (course: Course) => void;
  availableCourses: Course[];
}

export interface CoursePackage {
  id: number;
  packageName: string;
  obligatoryCourses: number;
  courses: Course[];
  minCourses?: number;  // Optional if it might not be present on all packages initially
}

export interface PackageSectionProps {
  availableCourses: Course[];
  onPackageUpdate: (packages: CoursePackage[]) => void;
}

export interface PackageDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  courses: Course[];
  savePackage: (pkg: CoursePackage, id?: number) => void;
  packageToEdit?: CoursePackage;
}

export interface ProfileRequirementsDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  saveRequirements: (requirements: ProfileRequirements) => void;
  packages: CoursePackage[];  // List of existing packages
}

// Define the ProfileRequirementsEditorProps interface with the isEditing prop
export interface ProfileRequirementsEditorProps extends ProfileRequirementsDialogProps {
  isEditing: boolean;
  courses: Course[];
}

