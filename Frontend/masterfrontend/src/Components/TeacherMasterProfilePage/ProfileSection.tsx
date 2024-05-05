import React, { useEffect, useState } from 'react';
import { ProfileRequirements, ProfileSectionProps, ProfileRequirementsEditorProps } from '../../Assets/Interfaces';
import EducationRequirementsDialog from './EducationRequirementsDialog';

const ProfileRequirementsEditor: React.FC<ProfileRequirementsEditorProps> = ({
  saveRequirements,
  courses,
  packages,
  minCourses,
  minAdvancedCourses,
  setMinCourses,
  setMinAdvancedCourses,
  isEditing,
  closeDialog
}) => {
  const [packageRequirements, setPackageRequirements] = useState<ProfileRequirements['packageRequirements']>([]);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);

  useEffect(() => {
      setPackageRequirements(packages.map(pkg => ({
          packageId: pkg.id,
          packageName: pkg.packageName,
          minCourses: 0,
      })));
  }, [packages]);

  const handleSave = () => {
      saveRequirements({
          minCourses: Number(minCourses),
          minAdvancedCourses: Number(minAdvancedCourses),
          selectedEducations: [], // Placeholder for selected educations, adjust as needed
          packageRequirements
      });
      closeDialog();
  };

  const handleMinCoursesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinCourses(value === "" ? "" : Number(value));
  };
  
  const handleMinAdvancedCoursesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinAdvancedCourses(value === "" ? "" : Number(value));
  };

  return (
      <div className={`mt-4 ${isEditing ? 'block' : 'hidden'}`}>
          <label className="block text-sm font-medium text-gray-700">Minimum number of courses:</label>
          <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={minCourses}
              onChange={handleMinCoursesChange}
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">Minimum number of advanced courses:</label>
          <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={minAdvancedCourses}
              onChange={handleMinAdvancedCoursesChange}
          />
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
              onClick={() => setIsEducationDialogOpen(true)}
          >
              Add Education Requirements
          </button>
          <div className="mt-4 space-x-2 justify-end">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600 transition duration-300 ease-in-out" onClick={closeDialog}>
                  Cancel
              </button>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out" onClick={handleSave}>
                  Save
              </button>
          </div>
          <EducationRequirementsDialog
              isOpen={isEducationDialogOpen}
              courses={courses} // Assume this gets updated to pass actual courses
              packages={packages}
              onClose={() => setIsEducationDialogOpen(false)}
              saveEducationRequirements={(selectedCourses, updatedPackages) => {
                  console.log('Selected Courses:', selectedCourses);
                  console.log('Updated Packages:', updatedPackages);
              }}
          />
      </div>
  );
};
  
const ProfileSection: React.FC<ProfileSectionProps & { saveRequirements: (requirements: ProfileRequirements) => void }> = ({ packages, saveRequirements, courses }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState('Placeholder ProfileName');
  const [tempProfileName, setTempProfileName] = useState(profileName);
  const [minCourses, setMinCourses] = useState<number | string>(0);
  const [minAdvancedCourses, setMinAdvancedCourses] = useState<number | string>(0);
  const [isEditingRequirements, setIsEditingRequirements] = useState(false);

  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfileName(e.target.value);
  };

  const handleEditProfileName = () => {
    setIsEditingName(true);
  };

  const handleSaveProfileName = () => {
    setProfileName(tempProfileName);
    setIsEditingName(false);
  };

  const handleCancelEditProfileName = () => {
    setIsEditingName(false);
    setTempProfileName(profileName);
  };

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
        {isEditingRequirements ? (
          <ProfileRequirementsEditor
            isOpen={isEditingRequirements}
            saveRequirements={saveRequirements}
            packages={packages}
            courses={courses}
            minCourses={minCourses}
            minAdvancedCourses={minAdvancedCourses}
            setMinCourses={setMinCourses}
            setMinAdvancedCourses={setMinAdvancedCourses}
            isEditing={isEditingRequirements}
            closeDialog={() => setIsEditingRequirements(false)}
          />
        ) : (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Minimum number of courses:</label>
            <p>{minCourses}</p>
            <label className="block text-sm font-medium text-gray-700 mt-4">Minimum number of advanced courses:</label>
            <p>{minAdvancedCourses}</p>
          </div>
        )}
        {!isEditingRequirements && (
          <div style={{ width: 'fit-content' }}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setIsEditingRequirements(true)}
            >
              Edit Profile Requirements
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
