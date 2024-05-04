// Import necessary React and Headless UI components
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';

// Define interfaces for strict typing with TypeScript to enhance code reliability and developer experience.
interface Course {
  id: number;
  period: string;
  code: string;
  name: string;
  hp: number; // "hp" stands for "hours per period" or could be "honor points", depending on context
  priority: string;
}

interface ProfileRequirements {
  minCourses: number;
  minAdvancedCourses: number;
  selectedEducations: string[];
  packageRequirements: {
    packageId: number;
    packageName: string;  // Added to show package names in the UI
    minCourses: number;
  }[];
}

interface ProfileSectionProps {
  packages: CoursePackage[]; // Array of course packages to be displayed or edited
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
  id: number;
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
  packages: CoursePackage[];  // List of existing packages
}

// Priority options available for courses
const priorities = ['Required', 'Optional'];

// Sample course data to populate the initial state
const fakeCourses = [
  { id: 1, period: 'Fall 2024', code: 'CS101', name: 'Introduction to Computer Science', hp: 5, priority: 'Required' },
  { id: 2, period: 'Spring 2025', code: 'CS102', name: 'Data Structures', hp: 5, priority: 'Optional' },
];

// Component to handle profile requirement editing directly in the profile section
const ProfileRequirementsEditor: React.FC<Omit<ProfileRequirementsDialogProps, "isOpen" | "closeDialog"> & {saveRequirements: (requirements: ProfileRequirements) => void; packages: CoursePackage[];}> = ({
  saveRequirements,
  packages,
}) => {
  // Local state to manage input fields within the profile section
  const [minCourses, setMinCourses] = useState<number>(0);
  const [minAdvancedCourses, setMinAdvancedCourses] = useState<number>(0);
  const [packageRequirements, setPackageRequirements] = useState<ProfileRequirements['packageRequirements']>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync package options with the passed-down props whenever they change
  useEffect(() => {
    setPackageRequirements(packages.map(pkg => ({
      packageId: pkg.id,
      packageName: pkg.packageName,
      minCourses: 0,
    })));
  }, [packages]);

  // Save the updated requirements and propagate the update upwards
  const handleSave = () => {
    saveRequirements({
      minCourses,
      minAdvancedCourses,
      selectedEducations: [], // Placeholder for selected educations, adjust as needed
      packageRequirements
    });
    setIsEditing(false); // Disable editing mode after saving
  };

  // Render the input fields for editing profile requirements
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Minimum number of courses:</label>
      <input
        type="number"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        value={minCourses}
        onChange={(e) => setMinCourses(Number(e.target.value))}
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Minimum number of advanced courses:</label>
      <input
        type="number"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        value={minAdvancedCourses}
        onChange={(e) => setMinAdvancedCourses(Number(e.target.value))}
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Package requirements:</label>
      {packageRequirements.map((req, index) => (
        <div key={req.packageId} className="flex justify-between items-center mt-2">
          <span>{req.packageName}</span>
          <input
            type="number"
            className="ml-4 w-24 px-2 py-1 border border-gray-300 rounded-md"
            value={req.minCourses}
            onChange={e => {
              const updated = [...packageRequirements];
              updated[index].minCourses = Number(e.target.value);
              setPackageRequirements(updated);
            }}
          />
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

// Main section of the profile, handling editing and viewing of profile details
const ProfileSection: React.FC<ProfileSectionProps & { saveRequirements: (requirements: ProfileRequirements) => void }> = ({ packages, saveRequirements }) => {
  // Local state for managing edit mode, profile name, and temporary profile name
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState('ProfileName');
  const [tempProfileName, setTempProfileName] = useState(profileName);

  // Function to handle changes to the profile name
  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfileName(e.target.value);
  };

  // Function to open the edit mode for profile name
  const handleEditProfileName = () => {
    setIsEditingName(true);
  };

  // Function to save the edited profile name
  const handleSaveProfileName = () => {
    setProfileName(tempProfileName);
    setIsEditingName(false);
  };

  // Function to cancel editing the profile name
  const handleCancelEditProfileName = () => {
    setIsEditingName(false);
    setTempProfileName(profileName);
  };

  // Render the profile section UI with conditional display based on edit state
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        {isEditingName ? (
          <>
            <input
              type="text"
              value={tempProfileName}
              onChange={handleProfileNameChange}
              className="text-3xl font-bold text-gray-800 mr-4 border-b-2 border-blue-500"
            />
            <button
              onClick={handleSaveProfileName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={handleCancelEditProfileName}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mr-4">{profileName}</h1>
            <button
              onClick={handleEditProfileName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Edit
            </button>
          </>
        )}
      </div>
      <div className="p-4 border rounded-lg bg-teal-50 shadow flex flex-col justify-between h-auto">
        <span>Profile information and restrictions</span>
        {/* The ProfileRequirementsEditor component remains unchanged */}
        <ProfileRequirementsEditor
          saveRequirements={saveRequirements}
          packages={packages}
        />
      </div>
    </div>
  );
};

// Component to list and manage courses in the profile
const CourseListSection: React.FC<CourseListSectionProps> = ({ courses, removeCourse, updatePriority }) => {
  // Render headings for the course list
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

  // Render individual courses with options to remove or change priority
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
          // Button to remove a course from the list, triggering state update
          <button onClick={() => removeCourse(course.id)} className="bg-red-500 text-white px-3 py-1 rounded w-full transition duration-300 ease-in-out hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    ))
  );

  // Main render block for CourseListSection, showing course details and management options
  return (
    <div className="mb-8 bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Added courses</h2>
      {renderCourseHeadings()}
      {renderCourses()}
    </div>
  );
};

// SearchSection allows searching and adding courses to the profile
const SearchSection: React.FC<SearchSectionProps> = ({ onAddCourse, availableCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on the search term input by the user
  const filteredCourses = searchTerm
    ? availableCourses.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : availableCourses;

  // Render the search input and list of filtered courses
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

// PackageDialog manages creation and editing of course packages
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

  // Reset form state when a package is not being edited
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

  // Handle form submission to save or update a package
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

  // Manage course selection for the package
  const handleCourseSelection = (selectedIds: number[]) => {
    setSelectedCourses(selectedIds);
  };

  // Render the package creation/edit dialog
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

// The PackageSection component handles the listing, creation, and deletion of course packages
const PackageSection: React.FC<PackageSectionProps> = ({ availableCourses, onPackageUpdate }) => {
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [isPackageDialogOpen, setPackageDialogOpen] = useState(false);
  const [editablePackageIndex, setEditablePackageIndex] = useState<number | null>(null);

  // Open dialog for creating or editing a package
  const handleOpenPackageDialog = (index: number | null) => {
    setEditablePackageIndex(index);
    setPackageDialogOpen(true);
  };

  // Close the package dialog and reset editable index
  const handleClosePackageDialog = () => {
    setPackageDialogOpen(false);
    setEditablePackageIndex(null);
  };

  // Save or update a package in the local state and propagate the update upwards
  const savePackage = (pkg: CoursePackage, index: number | null) => {
    let updatedPackages = [...packages];
    if (index !== null) {
      // Update existing package
      updatedPackages = updatedPackages.map((p, i) => (i === index ? { ...pkg, id: p.id } : p));
    } else {
      // Add new package
      updatedPackages.push({ ...pkg, id: packages.reduce((maxId, p) => Math.max(p.id, maxId), -1) + 1 });
    }
    setPackages(updatedPackages);
    onPackageUpdate(updatedPackages);
  };

  // Delete a package from the list
  const deletePackage = (id: number) => {
    const updatedPackages = packages.filter(p => p.id !== id);
    setPackages(updatedPackages);
    onPackageUpdate(updatedPackages);
  };

  // Render a list of packages with options to edit or delete
  const renderPackages = () => (
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

  // Main render block for PackageSection
  return (
    <div>
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
    setAvailableCourses([...availableCourses, ...updatedCourses.filter(c => c.id === courseId)]);
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
      setCourses([...courses, { ...courseToAdd, priority: 'Required' }]);
    }
  };

  // Define the saveRequirements function within the TeacherCreateUpdateProfilePage component
  const saveRequirements = (requirements: ProfileRequirements) => {
    // Implement the logic to save requirements here, such as sending them to a backend API
    console.log('Saving requirements:', requirements);
  };

  // Main render function for the TeacherCreateUpdateProfilePage, organizing the layout and components
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <ProfileSection packages={packages} saveRequirements={saveRequirements} />
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
