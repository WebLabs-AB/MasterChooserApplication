// Import necessary React and Headless UI components
import { useState } from 'react';
import { Course, CoursePackage, ProfileRequirements } from '../Assets/Interfaces';
import ProfileSection from '../Components/TeacherMasterProfilePage/ProfileSection';
import CourseListSection from '../Components/TeacherMasterProfilePage/CourseListSection';
import PackageSection from '../Components/TeacherMasterProfilePage/PackageSection';
import SearchSection from '../Components/TeacherMasterProfilePage/SearchSection';

// Sample course data to populate the initial state
const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Optional' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];


// Entry component for the teacher's page, managing state and components for creating and updating course profiles
export const TeacherCreateUpdateProfilePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>(fakeCourses);
  const [packages, setPackages] = useState<CoursePackage[]>([]); // Local state to manage packages

  // Function to handle updates to packages, potentially synchronizing with a backend service
  const handlePackageUpdate = (updatedPackages: CoursePackage[]) => {
    setPackages(updatedPackages);
  };

  // Function to remove a course from the profile
  const removeCourse = (courseId: number) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    // Add back to availableCourses
    setAvailableCourses(prev => [...prev, ...fakeCourses.filter(c => c.id === courseId)]);
  };

  // Update course priority within the profile
  const updatePriority = (courseId: number, newPriority: string) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId ? { ...course, priority: newPriority } : course
    );
    setCourses(updatedCourses);
  };

  // Add a course to the profile, setting the default priority
  const addCourseToProfile = (courseToAdd: Course) => {
    if (!courses.some(course => course.id === courseToAdd.id)) {
      setCourses(prev => [...prev, { ...courseToAdd, priority: 'Optional' }]);
      // Remove from availableCourses
      setAvailableCourses(prev => prev.filter(c => c.id !== courseToAdd.id));
    }
  };

  // Define the saveRequirements function within the TeacherCreateUpdateProfilePage component
  const saveRequirements = (requirements: ProfileRequirements) => {
    // Implement the logic to save requirements here, such as sending them to a backend API
    console.log('Saving requirements:', requirements);
  };

  // Main render function for the TeacherCreateUpdateProfilePage, organizing the layout and components
  return (
    <div className="p-8 bg-teal-100 min-h-screen">
      <ProfileSection packages={packages} saveRequirements={saveRequirements} courses={availableCourses} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseListSection courses={courses} removeCourse={removeCourse} updatePriority={updatePriority} />
          <PackageSection availableCourses={availableCourses} onPackageUpdate={handlePackageUpdate} />
        </div>
        <div className="lg:col-span-1">
          <SearchSection onAddCourse={addCourseToProfile} availableCourses={availableCourses} />
        </div>
      </div>
    </div>
  );
};
