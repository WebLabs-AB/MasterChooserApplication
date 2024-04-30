import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';

interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number;
  priority: string;
}

interface ProfileRequirements {
  minCourses: number;
  minAdvancedCourses: number;
  selectedEducations: string[];
  packageRequirements: {
    packageId: number;
    minCourses: number;
  }[];
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
  id: number;  // Add this line
  packageName: string;
  obligatoryCourses: number;
  courses: Course[];
}

interface PackageSectionProps {
  availableCourses: Course[];
  onPackageUpdate: (packages: CoursePackage[]) => void;
}

interface PackageDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  courses: Course[];
  savePackage: (pkg: CoursePackage, id?: number) => void;
  packageToEdit?: CoursePackage;
}

interface ProfileRequirementsDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  saveRequirements: (requirements: ProfileRequirements) => void;
}

const priorities = ['Required', 'Optional'];

const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Required' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];

const ProfileRequirementsDialog: React.FC<ProfileRequirementsDialogProps> = ({ isOpen, closeDialog, saveRequirements }) => {
  const [minCourses, setMinCourses] = useState<number>(0);
  const [minAdvancedCourses, setMinAdvancedCourses] = useState<number>(0);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [packageRequirements, setPackageRequirements] = useState<{ packageId: number; minCourses: number }[]>([]);

  const handleSave = () => {
    saveRequirements({
      minCourses,
      minAdvancedCourses,
      selectedEducations,
      packageRequirements
    });
    closeDialog();
  };

  // Dummy data for educations and packages - replace with actual data as needed
  const educations = ['Software Engineering', 'Data Science', 'Computer Science'];
  const packages = [{ id: 1, name: "Package A" }, { id: 2, name: "Package B" }];

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeDialog}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Edit Profile Requirements</Dialog.Title>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Minimum number of courses:</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={minCourses}
                    onChange={(e) => setMinCourses(Number(e.target.value))}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Minimum number of advanced courses:</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={minAdvancedCourses}
                    onChange={(e) => setMinAdvancedCourses(Number(e.target.value))}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Select educations:</label>
                  <Listbox value={selectedEducations} onChange={setSelectedEducations} multiple>
                    {educations.map((education) => (
                      <Listbox.Option key={education} value={education}>
                        {({ selected }) => (
                          <div className={`cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'bg-teal-100' : 'bg-white'}`}>
                            {selected && (
                              <span className="text-teal-600 absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l-.094.083L9 13.585l7.293-7.292 a1 1 0 011.497-.083z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                            {education}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Package requirements:</label>
                  {/* Implement package selection logic similar to educations, storing the package id and minimum courses required */}
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave}>
                    Save
                  </button>
                  <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={closeDialog}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState('ProfileName');
  const [tempProfileName, setTempProfileName] = useState(profileName);
  const [isRequirementsDialogOpen, setIsRequirementsDialogOpen] = useState(false);

  const handleEditClick = () => {
    setTempProfileName(profileName); // Initialize temporary state with current profile name
    setIsEditing(true); // Show input field
  };

  const handleSaveClick = () => {
    setProfileName(tempProfileName); // Update profile name with the edited value
    setIsEditing(false); // Hide input field
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Hide input field without saving changes
  };

  const handleEditProfileRequirements = () => {
    setIsRequirementsDialogOpen(true);
  };

  const closeRequirementsDialog = () => {
    setIsRequirementsDialogOpen(false);
  };

  const saveRequirements = (requirements: ProfileRequirements) => {
    console.log('Saved Requirements:', requirements);
    closeRequirementsDialog();
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              value={tempProfileName}
              onChange={(e) => setTempProfileName(e.target.value)}
              className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-600 mr-4"
            />
            <button
              className="text-white bg-green-600 hover:bg-green-700 font-bold py-1 px-3 rounded transition duration-300 ease-in-out mr-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="text-white bg-red-600 hover:bg-red-700 font-bold py-1 px-3 rounded transition duration-300 ease-in-out"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mr-4">{profileName}</h1>
            <button
              className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div className="p-4 border rounded-lg bg-teal-50 shadow flex flex-col justify-between h-auto">
        <span>Profile information and restrictions</span>
        <button
          onClick={handleEditProfileRequirements}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out self-start mt-4"
        >
          Edit profile requirements
        </button>
        <ProfileRequirementsDialog
          isOpen={isRequirementsDialogOpen}
          closeDialog={closeRequirementsDialog}
          saveRequirements={saveRequirements}
        />
      </div>
    </div>
  );
};


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

const PackageDialog: React.FC<PackageDialogProps> = ({
  isOpen,
  closeDialog,
  courses,
  savePackage,
  packageToEdit,
}) => {
  const [packageName, setPackageName] = useState('');
  const [obligatoryCourses, setObligatoryCourses] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  useEffect(() => {
    if (packageToEdit) {
      setPackageName(packageToEdit.packageName);
      setObligatoryCourses(packageToEdit.obligatoryCourses);
      setSelectedCourses(packageToEdit.courses.map(course => course.id));
    } else {
      resetForm();
    }
  }, [packageToEdit]);

  const resetForm = () => {
    setPackageName('');
    setObligatoryCourses(0);
    setSelectedCourses([]);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const packageData: CoursePackage = {
      id: packageToEdit ? packageToEdit.id : Math.max(0, ...courses.map(p => p.id)) + 1,
      packageName,
      obligatoryCourses,
      courses: selectedCourses.map(id => courses.find(course => course.id === id)!),
    };
    savePackage(packageData);
    closeDialog();
    resetForm();
  };

  const handleCourseSelection = (selectedIds: number[]) => {
    setSelectedCourses(selectedIds);
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeDialog}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
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
                {packageToEdit ? 'Edit Package' : 'Create New Package'}
              </Dialog.Title>
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  className="border mt-2 w-full rounded-md"
                  placeholder="Package Name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
                <input
                  type="number"
                  className="border mt-2 w-full rounded-md"
                  placeholder="Number of Obligatory Courses"
                  value={obligatoryCourses}
                  onChange={(e) => setObligatoryCourses(parseInt(e.target.value))}
                />
                <div className="mt-4">
                  <Listbox value={selectedCourses} onChange={handleCourseSelection} multiple>
                    <Listbox.Button className="border rounded px-4 py-2 w-full text-left">
                      {selectedCourses.length} courses selected
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 overflow-auto">
                      {courses.map(course => (
                        <Listbox.Option key={course.id} value={course.id}>
                          {({ selected }) => (
                            <div className={`cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'bg-teal-100' : 'bg-white'}`}>
                              {selected && (
                                <span className="text-teal-600 absolute inset-y-0 left-0 flex items-center pl-3">
                                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l-.094.083L9 13.585l7.293-7.292 a1 1 0 011.497-.083z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              )}
                              {course.name}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                  <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={closeDialog}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const PackageSection: React.FC<PackageSectionProps> = ({ availableCourses, onPackageUpdate }) => {
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [isPackageDialogOpen, setPackageDialogOpen] = useState(false);
  const [editablePackageIndex, setEditablePackageIndex] = useState<number | null>(null);

  const handleOpenPackageDialog = (index: number | null) => {
    setEditablePackageIndex(index);
    setPackageDialogOpen(true);
  };

  const handleClosePackageDialog = () => {
    setPackageDialogOpen(false);
  };

  // Ensure to handle the 'id' properly
  const savePackage = (pkg: CoursePackage, index: number | null) => {
    if (index !== null) {
      // Edit existing package
      const updatedPackages = packages.map((p, i) => i === index ? {...pkg, id: packages[index].id} : p);
      setPackages(updatedPackages);
    } else {
      // Add new package with a new 'id'
      const newId = packages.length + 1; // Simple example to generate id
      setPackages([...packages, {...pkg, id: newId}]);
    }
    onPackageUpdate(packages); // Update state callback
    handleClosePackageDialog();
  };

  const deletePackage = (id: number) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== id);
    setPackages(updatedPackages);
    onPackageUpdate(updatedPackages);
  };

  // Function to render the packages list with delete buttons
  const renderPackages = () => {
    return (
      <div>
        {packages.map((pkg, index) => (
          <div key={pkg.id} className="flex justify-between items-center p-2">
            <div onClick={() => handleOpenPackageDialog(index)}>
              {pkg.packageName}
            </div>
            <button onClick={() => deletePackage(pkg.id)} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        ))}
        {isPackageDialogOpen && (
          <PackageDialog
            isOpen={isPackageDialogOpen}
            closeDialog={handleClosePackageDialog}
            courses={availableCourses}
            savePackage={(pkg) => savePackage(pkg, editablePackageIndex)}
            packageToEdit={editablePackageIndex !== null ? packages[editablePackageIndex] : undefined}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Display the packages */}
      <div className="mt-4">        
        <div className="mb-8 bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Course packages</h2>
          {renderPackages()}
        </div>
      </div>

      <button onClick={() => handleOpenPackageDialog(null)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Package
      </button>
    </div>
  );
};

export const TeacherCreateUpdateProfilePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>(fakeCourses);

  const removeCourse = (courseId: number) => {
    // Update the courses list by removing the selected course
    setCourses(prevCourses => {
      // Find the course that is being removed
      const courseToRemove = prevCourses.find(course => course.id === courseId);

      // Update the available courses list to include the removed course if it's not already included
      if (courseToRemove) {
        setAvailableCourses(prevAvailableCourses => {
          // Check if the course is already in the available courses list
          const isAlreadyAvailable = prevAvailableCourses.some(course => course.id === courseId);

          // Add the course back to available courses if it's not already there
          return isAlreadyAvailable ? prevAvailableCourses : [...prevAvailableCourses, courseToRemove];
        });
      }

      // Return the new list of courses excluding the removed one
      return prevCourses.filter(course => course.id !== courseId);
    });
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

  const handlePackageUpdate = (updatedPackages: CoursePackage[]) => {
    // Handle updated package data, possibly sync with server or local storage
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <ProfileSection />
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
