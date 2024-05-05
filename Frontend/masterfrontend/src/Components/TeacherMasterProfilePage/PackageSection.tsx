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

  // Adjusted to handle multiple selection directly
  const handleCourseSelection = (courseIds: number[]) => {
      setSelectedCourses(courseIds);
  };

  const renderSelectedCourses = () => {
      return (
          <ul className="mt-4 list-disc list-inside">
              {selectedCourses.map(courseId => {
                  const course = courses.find(course => course.id === courseId);
                  return course ? (
                      <li key={courseId} className="flex justify-between items-center">
                          {course.name}
                          <button
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                              onClick={() => handleCourseSelection(selectedCourses.filter(id => id !== courseId))}
                          >
                              Remove
                          </button>
                      </li>
                  ) : null; // Safeguard against undefined courses
              })}
          </ul>
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
                              <Listbox value={selectedCourses} onChange={handleCourseSelection} multiple>
                                  <Listbox.Button className="border rounded px-4 py-2 w-full text-left">
                                      Select Courses
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
)};

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
