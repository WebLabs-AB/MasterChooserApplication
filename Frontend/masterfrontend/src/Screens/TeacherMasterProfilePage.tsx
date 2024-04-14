import React, { useState } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';

interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number;
  priority: string;
}

interface CourseListSectionProps {
  courses: Course[];
  removeCourse: (courseId: number) => void;
  updatePriority: (courseId: number, newPriority: string) => void;
}

interface SearchSectionProps {
  onAddCourse: (course: Course) => void;
  availableCourses: Course[];
}

interface CoursePackage {
  packageName: string;
  obligatoryCourses: number;
  courses: Course[];
}

const priorities = ['Required', 'Optional'];

const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Required' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];

const ProfileSection = () => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-gray-800">ProfileName</h1>
      <button className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Edit
      </button>
    </div>
    <div className="p-4 border rounded-lg bg-teal-50 shadow">Profile information and restrictions</div>
  </div>
);

const CourseListSection: React.FC<CourseListSectionProps> = ({ courses, removeCourse, updatePriority }) => {
  const renderCourseHeadings = () => (
    <div className="grid grid-cols-12 font-bold py-2 bg-gray-100 text-gray-800">
      <div className="col-span-3">Course period</div>
      <div className="col-span-2">Course code</div>
      <div className="col-span-3">Course name</div>
      <div className="col-span-1">Hp</div>
      <div className="col-span-2">Priority</div>
      <div className="col-span-1">Actions</div>
    </div>
  );

  const renderCourses = () => (
    courses.map((course: Course) => (
      <div key={course.id} className="grid grid-cols-12 items-center py-2">
        <div className="col-span-3">{course.period}</div>
        <div className="col-span-2">{course.code}</div>
        <div className="col-span-3">{course.name}</div>
        <div className="col-span-1">{`${course.hp} hp`}</div>
        <div className="col-span-2 relative mr-2">
          <Listbox value={course.priority} onChange={(newPriority) => updatePriority(course.id, newPriority)}>
            <Listbox.Button className="border rounded text-center w-full py-1 bg-white">
              {course.priority}
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 overflow-auto">
              {priorities.map((priority) => (
                <Listbox.Option
                  key={priority}
                  value={priority}
                  className="px-4 py-2 text-center cursor-pointer hover:bg-gray-50"
                >
                  {priority}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="col-span-1">
          <button onClick={() => removeCourse(course.id)} className="bg-red-500 text-white px-3 py-1 rounded w-full transition duration-300 ease-in-out hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    ))
  );

  return (
    <div className="mb-8 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Added courses</h2>
      {renderCourseHeadings()}
      {renderCourses()}
    </div>
  );
};

const SearchSection: React.FC<SearchSectionProps> = ({ onAddCourse, availableCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = searchTerm
    ? availableCourses.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : availableCourses;

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <input
        type="text"
        placeholder="Search for courses"
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="p-4 border rounded-lg h-64 overflow-auto bg-teal-50">
        {filteredCourses.map(course => (
          <div key={course.id} className="flex justify-between items-center p-2 bg-white mb-2 rounded shadow">
            <span>{course.code} - {course.name}</span>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={() => onAddCourse(course)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TeacherCreateUpdateProfilePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>(fakeCourses);

  const removeCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
    const removedCourse = fakeCourses.find(course => course.id === courseId);
    if (removedCourse) {
      setAvailableCourses(prev => [...prev, removedCourse]);
    }
  };

  const updatePriority = (courseId: number, newPriority: string) => {
    setCourses(courses.map(course => (
      course.id === courseId ? { ...course, priority: newPriority } : course
    )));
  };

  const addCourseToProfile = (courseToAdd: Course) => {
    if (!courses.find(course => course.id === courseToAdd.id)) {
      setCourses(prevCourses => [...prevCourses, { ...courseToAdd, priority: 'Required' }]);
      setAvailableCourses(prevAvailableCourses =>
        prevAvailableCourses.filter(course => course.id !== courseToAdd.id)
      );
    }
  };

  // New state for handling package creation
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [isPackageDialogOpen, setPackageDialogOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState<number | null>(null);

  const openPackageDialog = (index: number | null) => {
    setCurrentPackageIndex(index);
    setPackageDialogOpen(true);
  };

  const closePackageDialog = () => {
    setPackageDialogOpen(false);
    setCurrentPackageIndex(null); // Reset current package index
  };

  const handleSavePackage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPackage = {
      packageName: formData.get('packageName') as string,
      obligatoryCourses: parseInt(formData.get('obligatoryCourses') as string, 10),
      courses: Array.from(formData.getAll('courses')).map(id => courses.find(course => course.id === Number(id))) as Course[],
    };
    
    if (currentPackageIndex !== null) {
      // Update existing package
      setPackages(packages.map((pkg, index) => index === currentPackageIndex ? newPackage : pkg));
    } else {
      // Add new package
      setPackages([...packages, newPackage]);
    }
    
    closePackageDialog();
  };

  const renderPackageForm = (packageData?: CoursePackage) => {
    return (
      <form onSubmit={handleSavePackage}>
        <input
          type="text"
          name="packageName"
          defaultValue={packageData?.packageName || ''}
          placeholder="Package Name"
          className="border p-2 rounded w-full mb-4"
          required
        />
        <input
          type="number"
          name="obligatoryCourses"
          defaultValue={packageData?.obligatoryCourses || 0}
          placeholder="Number of Obligatory Courses"
          className="border p-2 rounded w-full mb-4"
          required
        />
        {courses.map(course => (
          <div key={course.id}>
            <label>
              <input
                type="checkbox"
                name="courses"
                value={course.id}
                defaultChecked={packageData?.courses.some(pkgCourse => pkgCourse.id === course.id)}
              />
              {course.name}
            </label>
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Save
        </button>
        <button type="button" onClick={closePackageDialog} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
          Cancel
        </button>
      </form>
    );
  };

  const renderPackages = () => {
    return packages.map((pkg, index) => (
      <div key={index} className="p-2 border-b cursor-pointer" onClick={() => openPackageDialog(index)}>
        {pkg.packageName}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-8 bg-teal-100 min-h-screen">
      <ProfileSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseListSection
            courses={courses}
            removeCourse={removeCourse}
            updatePriority={updatePriority}
          />

          {/* Display the packages */}
          <div className="mt-4">        
            <div className="mb-8 bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Course packages</h2>
              {renderPackages()}
            </div>
          </div>

          <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-6 align-left hover:bg-orange-600 transition duration-300 ease-in-out">
            Edit profile requirements
          </button>

          <div className="container mx-auto p-8 bg-teal-100 min-h-screen">
            <button onClick={() => openPackageDialog(null)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Create package
            </button>

            
              <Transition show={isPackageDialogOpen} as={React.Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closePackageDialog}>
                  <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                      &#8203;
                    </span>
                    <Transition.Child
                      as={React.Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          {currentPackageIndex !== null ? 'Edit Package' : 'Create New Package'}
                        </Dialog.Title>
                        <div className="mt-2">
                          {renderPackageForm(packages[currentPackageIndex as number])}
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
          <div className="lg:col-span-1">
          <SearchSection onAddCourse={addCourseToProfile} availableCourses={availableCourses} />
        </div>
      </div>
    </div>
  );
};
