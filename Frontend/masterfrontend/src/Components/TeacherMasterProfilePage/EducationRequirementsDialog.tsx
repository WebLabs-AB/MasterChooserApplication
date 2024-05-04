import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Course, CoursePackage } from '../../Assets/Interfaces';

interface EducationRequirementsDialogProps {
  isOpen: boolean;
  courses: Course[];
  packages: CoursePackage[];
  onClose: () => void;
  saveEducationRequirements: (selectedCourses: Course[], updatedPackages: CoursePackage[]) => void;
}

const EducationRequirementsDialog: React.FC<EducationRequirementsDialogProps> = ({
  isOpen,
  courses,
  packages,
  onClose,
  saveEducationRequirements
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [packageRequirements, setPackageRequirements] = useState<CoursePackage[]>(packages.map(pkg => ({
    ...pkg,
    minCourses: pkg.minCourses || 0  // Initialize minCourses if undefined
  })));

  const handleCourseSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleCourseSelection = (course: Course) => {
    const isSelected = selectedCourses.some(c => c.id === course.id);
    setSelectedCourses(isSelected ? selectedCourses.filter(c => c.id !== course.id) : [...selectedCourses, course]);
  };

  const handlePackageMinChange = (packageId: number, minCourses: number) => {
    const updatedPackages = packageRequirements.map(pkg =>
      pkg.id === packageId ? { ...pkg, minCourses } : pkg);
    setPackageRequirements(updatedPackages);
  };

  const saveChanges = () => {
    saveEducationRequirements(selectedCourses, packageRequirements);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Education Requirements</Dialog.Title>
              <input
                type="text"
                className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Search for courses"
                value={searchTerm}
                onChange={handleCourseSearchChange}
              />
              <div className="mt-4">
                {courses.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase())).map(course => (
                  <div key={course.id} className="flex justify-between items-center p-2">
                    <span>{course.name}</span>
                    <button
                      className={`px-3 py-1 rounded ${selectedCourses.some(c => c.id === course.id) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                      onClick={() => toggleCourseSelection(course)}
                    >
                      {selectedCourses.some(c => c.id === course.id) ? 'Deselect' : 'Select'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mt-4">Package requirements:</label>
                {packageRequirements.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between items-center mt-2">
                    <span>{pkg.packageName}</span>
                    <input
                      type="number"
                      className="ml-4 w-24 px-2 py-1 border border-gray-300 rounded-md"
                      value={pkg.minCourses}
                      onChange={e => handlePackageMinChange(pkg.id, Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveChanges}>
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EducationRequirementsDialog;
