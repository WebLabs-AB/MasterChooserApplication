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
    <div className="grid grid-cols-12 gap-2 font-bold py-2 bg-gray-200 text-gray-700">
      <div className="col-span-2">Course period</div>
      <div className="col-span-2">Course code</div>
      <div className="col-span-3">Course name</div>
      <div className="col-span-1">Hp</div>
      <div className="col-span-2">Priority</div>
      <div className="col-span-2">Actions</div>
    </div>
  );

  const renderCourses = () => {
    return courses.map((course) => (
      <div key={course.id} className="grid grid-cols-12 gap-2 items-center py-2">
        <div className="col-span-2">{course.period}</div>
        <div className="col-span-2">{course.code}</div>
        <div className="col-span-3">{course.name}</div>
        <div className="col-span-1">{`${course.hp} hp`}</div>
        <div className="col-span-2">
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
        </div>
        <div className="col-span-2 text-center">
          <button onClick={() => removeCourse(course.id)} className="bg-red-500 text-white px-4 py-1 rounded">
            Remove
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ProfileName</h1>
        <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
          Edit
        </button>
      </div>
      <div className="mb-6 p-4 border rounded-lg">Profile information and restrictions</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border rounded-lg">
          <input type="text" placeholder="Search for courses" className="border p-2 w-full mb-4" />
          <div className="flex gap-4 mb-4">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
            <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
              Filter
            </button>
          </div>
          <div className="p-4 border rounded-lg h-64">Search results</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Added courses</h2>
          {renderCourseHeadings()}
          {renderCourses()}
        </div>
      </div>
      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded w-full lg:w-auto">
        Edit profile requirements
      </button>
    </div>
  );
};
