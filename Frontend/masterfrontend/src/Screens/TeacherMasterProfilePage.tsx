import React, { useState } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';

interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number;
  priority: string;
}

const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'High' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Medium' },
  // Add more courses as needed
];

const priorities = ['High', 'Medium', 'Low'];

export const TeacherCreateUpdateProfilePage = () => {
  const [courses, setCourses] = useState<Course[]>(fakeCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchResults, setSearchResults] = useState<Course[]>([]); // Placeholder state for search results

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

  const renderCourseHeadings = () => (
    <div className="grid grid-cols-5 gap-4 font-bold py-2">
      <span>Course period</span>
      <span>Course code</span>
      <span>Course name</span>
      <span>Hp</span>
      <span>Priority</span>
    </div>
  );

  const renderCourses = () => {
    return courses.map((course) => (
      <div key={course.id} className="grid grid-cols-5 gap-4 items-center py-2">
        <span>{course.period}</span>
        <span>{course.code}</span>
        <span>{course.name}</span>
        <span>{course.hp} hp</span>
        <div className="flex items-center">
          <Listbox as="div" value={course.priority} onChange={(newPriority) => updatePriority(course.id, newPriority)}>
            <Listbox.Button>{course.priority}</Listbox.Button>
            <Listbox.Options>
              {priorities.map((priority) => (
                <Listbox.Option key={priority} value={priority}>
                  {priority}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <button onClick={() => removeCourse(course.id)} className="ml-2">
            Remove
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow rounded space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">ProfileName</h1>
        <button className="px-4 py-2 rounded text-white bg-blue-500">Edit</button>
      </div>
      <div className="p-4 border rounded">Profile information and restrictions</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 p-4 border rounded">
          <div className="flex justify-between mb-4">
            <div>
              <span>Search for courses</span>
              {/* Placeholder for search input */}
              <input type="text" placeholder="Enter course name or code" className="border p-1 ml-2" />
            </div>
            <button className="px-4 py-2 rounded text-white bg-green-500">Add</button>
          </div>
          <button className="px-4 py-2 rounded border mb-4">Filter</button>
          {/* Placeholder for search results */}
          <div className="p-4 border rounded">Search results</div>
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-2">Added courses</h2>
          {renderCourseHeadings()}
          {renderCourses()}
        </div>
      </div>
      <button className="px-4 py-2 rounded text-white bg-red-500">Edit profile requirements</button>
    </div>
  );
};
