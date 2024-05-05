import React, { useEffect, useState } from 'react';
import { PackageSectionProps, CoursePackage, PackageDialogProps } from '../../Assets/Interfaces';
import { Dialog, Listbox, Transition } from '@headlessui/react';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCourseSelection = (courseId: number) => {
      const index = selectedCourses.indexOf(courseId);
      if (index > -1) {
          setSelectedCourses(selectedCourses.filter(id => id !== courseId));
      } else {
          setSelectedCourses([...selectedCourses, courseId]);
      }
  };

  const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderSelectedCourses = () => {
      return (
          <div className="mt-4 p-4 border rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Courses in the package:</h3>
              <ul className="list-disc list-inside">
                  {selectedCourses.map(courseId => {
                      const course = courses.find(course => course.id === courseId);
                      return course ? (
                          <li key={courseId} className="flex justify-between items-center">
                              {course.name}
                              <button
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                                  onClick={() => handleCourseSelection(courseId)}
                              >
                                  Remove
                              </button>
                          </li>
                      ) : null;
                  })}
              </ul>
          </div>
      );
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
                      <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                              <input
                                  type="text"
                                  className="border mt-2 w-full rounded-md"
                                  placeholder="Search Courses"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                              />
                              {filteredCourses.length > 0 && (
                                  <div className="mt-4 max-h-60 overflow-auto">
                                      {filteredCourses.map(course => (
                                          <div key={course.id} className="flex justify-between items-center p-2 border-b">
                                              <span>{course.name}</span>
                                              <button
                                                  className={`px-3 py-1 rounded ${selectedCourses.includes(course.id) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                                                  onClick={() => handleCourseSelection(course.id)}
                                              >
                                                  {selectedCourses.includes(course.id) ? 'Remove' : 'Add'}
                                              </button>
                                          </div>
                                      ))}
                                  </div>
                              )}
                              {selectedCourses.length > 0 && renderSelectedCourses()}
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
    setEditablePackageIndex(null);
  };

  const savePackage = (pkg: CoursePackage, index: number | null) => {
    const updatedPackages = [...packages];
    if (index !== null) {
      updatedPackages[index] = pkg; // Update existing package
    } else {
      updatedPackages.push(pkg); // Add new package
    }
    setPackages(updatedPackages);
    onPackageUpdate(updatedPackages);
  };

  const deletePackage = (id: number) => {
    const updatedPackages = packages.filter(p => p.id !== id);
    setPackages(updatedPackages);
    onPackageUpdate(updatedPackages);
  };

  const renderPackages = () => (
    packages.map((pkg, index) => (
      <div key={pkg.id} className="flex justify-between items-center p-2">
        <div onClick={() => handleOpenPackageDialog(index)}>{pkg.packageName}</div>
        <button onClick={() => deletePackage(pkg.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    ))
  );

  return (
    <div>
      <div className="mb-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Course packages</h2>
        {renderPackages()}
      </div>
      <button onClick={() => handleOpenPackageDialog(null)} className="bg-blue-500 text-white px-4 py-2 rounded">Create Package</button>
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

export default PackageSection;
