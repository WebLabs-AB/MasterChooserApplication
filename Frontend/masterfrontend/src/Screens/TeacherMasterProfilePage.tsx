import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number;
  priority: string;
}

const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Required' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];

const priorities = ['Required', 'Optional'];

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

  const renderCourseHeadings = () => (
    <div className="grid grid-cols-5 gap-4 font-bold py-2 bg-gray-200 text-gray-700">
      <div>Course period</div>
      <div>Course code</div>
      <div>Course name</div>
      <div>Hp</div>
      <div>Priority</div>
    </div>
  );

  const renderCourses = () => {
    return courses.map((course) => (
      <div key={course.id} className="grid grid-cols-5 gap-4 items-center py-2">
        <div>{course.period}</div>
        <div>{course.code}</div>
        <div>{course.name}</div>
        <div>{`${course.hp} hp`}</div>
        <div className="flex gap-2 items-center justify-center">
          <Listbox as="div" value={course.priority} onChange={(newPriority) => updatePriority(course.id, newPriority)}>
            <Listbox.Button className="border rounded px-4 py-1 cursor-pointer text-center">
              {course.priority}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 bg-white border rounded shadow-lg">
              {priorities.map((priority) => (
                <Listbox.Option
                  key={priority}
                  value={priority}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-center"
                >
                  {priority}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <button onClick={() => removeCourse(course.id)} className="bg-red-500 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ProfileName</h1>
        <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
          Edit
        </button>
      </div>
      <div className="mb-6 p-4 border rounded">Profile information and restrictions</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border rounded">
          <div className="mb-6">
            <input type="text" placeholder="Search for courses" className="border p-2 mr-2 w-full" />
            <button className="text-white bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded">
              Add
            </button>
          </div>
          <button className="mb-6 text-white bg-indigo-500 hover:bg-indigo-700 font-bold py-2 px-4 rounded">
            Filter
          </button>
          <div className="p-4 border rounded h-64">Search results</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Added courses</h2>
          {renderCourseHeadings()}
          {renderCourses()}
        </div>
      </div>
      <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded w-full md:w-auto">
        Edit profile requirements
      </button>
    </div>
  );
};
