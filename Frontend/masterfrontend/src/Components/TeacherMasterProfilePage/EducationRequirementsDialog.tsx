import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Course, CoursePackage, EducationRequirementsDialogProps } from '../../Assets/Interfaces';

const EducationRequirementsDialog: React.FC<EducationRequirementsDialogProps> = ({
  isOpen,
  courses,
  packages,
  onClose,
  saveEducationRequirements
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [packageRequirements, setPackageRequirements] = useState<CoursePackage[]>([]);
  const [selectedEducation, setSelectedEducation] = useState('');

  const educations = [
    { id: 'edu1', name: 'Data Science' },
    { id: 'edu2', name: 'Computer Science' },
    { id: 'edu3', name: 'Information Technology' }
  ];

  useEffect(() => {
    setPackageRequirements(packages.map(pkg => ({
      ...pkg,
      minCourses: pkg.minCourses || 0
    })));
  }, [packages]);

  const toggleCourseSelection = (course: Course) => {
    const isSelected = selectedCourses.find(c => c.id === course.id);
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
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

  const filteredCourses = courses.filter(course => 
    (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !selectedCourses.some(c => c.id === course.id));

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
              <select
                value={selectedEducation}
                onChange={(e) => setSelectedEducation(e.target.value)}
                className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Education</option>
                {educations.map(edu => (
                  <option key={edu.id} value={edu.id}>{edu.name}</option>
                ))}
              </select>
              <input
                type="text"
                className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Search for courses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
              <div className="mt-4">
              {filteredCourses.length > 0 && (
                  <div className="mt-4 max-h-60 overflow-auto">
                    {filteredCourses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-2 border-b">
                        {course.code} - {course.name}
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => toggleCourseSelection(course)}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4">
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

