import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

// Interfaces and types
interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number;
  priority: string;
}

type CourseListSectionProps = {
  courses: Course[];
  removeCourse: (courseId: number) => void;
  updatePriority: (courseId: number, newPriority: string) => void;
};


const priorities = ['Required', 'Optional'];

// Fake data
const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Required' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];

// Profile Section Component
const ProfileSection = () => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-3xl font-bold">ProfileName</h1>
      <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
        Edit
      </button>
    </div>
    <div className="p-4 border rounded-lg bg-white shadow">Profile information and restrictions</div>
  </div>
);

// Course List Section Component
const CourseListSection: React.FC<CourseListSectionProps> = ({ courses, removeCourse, updatePriority }) => {
  const renderCourseHeadings = () => (
    <div className="grid grid-cols-12 font-bold py-2 bg-gray-200 text-gray-700">
      <div className="col-span-3">Course period</div>
      <div className="col-span-2">Course code</div>
      <div className="col-span-3">Course name</div>
      <div className="col-span-1">Hp</div>
      <div className="col-span-2">Priority</div>
      <div className="col-span-1">Actions</div>
    </div>
  );

  const renderCourses = () => {
    return courses.map((course: Course) => (
      <div key={course.id} className="grid grid-cols-12 items-center py-2">
        <div className="col-span-3">{course.period}</div>
        <div className="col-span-2">{course.code}</div>
        <div className="col-span-3">{course.name}</div>
        <div className="col-span-1">{`${course.hp} hp`}</div>
        <div className="col-span-2 relative mr-2"> {/* Added margin-right here */}
          <Listbox value={course.priority} onChange={(newPriority) => updatePriority(course.id, newPriority)}>
            <Listbox.Button className="border rounded text-center w-full py-1">
              {course.priority}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 overflow-auto">
              {priorities.map((priority) => (
                <Listbox.Option
                  key={priority}
                  value={priority}
                  className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
                >
                  {priority}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="col-span-1">
          <button onClick={() => removeCourse(course.id)} className="bg-red-500 text-white px-3 py-1 rounded w-full">
            Remove
          </button>
        </div>
      </div>
    ));
  };  

  return (
    <div className="mb-8 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Added courses</h2>
      {renderCourseHeadings()}
      {renderCourses()}
    </div>
  );
};

// Search Section Component
const SearchSection = () => (
  <div className="mb-8">
    <div className="p-4 border rounded-lg bg-white shadow">
      <input type="text" placeholder="Search for courses" className="border p-2 w-full mb-4" />
      <div className="flex gap-4 mb-4">
        <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
          Filter
        </button>
      </div>
      <div className="p-4 border rounded-lg h-64">Search results</div>
    </div>
  </div>
);

// Main TeacherCreateUpdateProfilePage Component
export const TeacherCreateUpdateProfilePage = () => {
  const [courses, setCourses] = useState<Course[]>(fakeCourses);

  const removeCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const updatePriority = (courseId: number, newPriority: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return { ...course, priority: newPriority };
      }
      return course;
    }));
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileSection />
          <CourseListSection courses={courses} removeCourse={removeCourse} updatePriority={updatePriority} />
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-6 align-left">
            Edit profile requirements
          </button>
        </div>
        <div className="lg:col-span-1">
          <SearchSection />
        </div>
      </div>
    </div>
  );
};
