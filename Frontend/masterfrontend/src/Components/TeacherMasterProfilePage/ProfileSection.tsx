import React, { useEffect, useState } from 'react';
import { ProfileRequirements, ProfileSectionProps, ProfileRequirementsEditorProps } from '../../Assets/Interfaces';

// Component to handle profile requirement editing directly in the profile section
const ProfileRequirementsEditor: React.FC<ProfileRequirementsEditorProps> = ({
    saveRequirements,
    packages,
    isEditing, // Add the isEditing prop here
    closeDialog
  }) => {
    // Local state to manage input fields within the profile section
    const [minCourses, setMinCourses] = useState<number>(0);
    const [minAdvancedCourses, setMinAdvancedCourses] = useState<number>(0);
    const [packageRequirements, setPackageRequirements] = useState<ProfileRequirements['packageRequirements']>([]);
  
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
      closeDialog(); // Close the dialog after saving
    };
  
    // Render the input fields for editing profile requirements
    return (
      <div className={`mt-4 ${isEditing ? 'block' : 'hidden'}`}>
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
        <div className="mt-4 space-x-2 justify-end">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600 transition duration-300 ease-in-out" onClick={closeDialog}>
            Cancel
          </button>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  };
  

const ProfileSection: React.FC<ProfileSectionProps & { saveRequirements: (requirements: ProfileRequirements) => void }> = ({ packages, saveRequirements }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState('ProfileName');
  const [tempProfileName, setTempProfileName] = useState(profileName);
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
            saveRequirements={saveRequirements}
            packages={packages}
            isEditing={isEditingRequirements}
            isOpen={isEditingRequirements}
            closeDialog={() => setIsEditingRequirements(false)}
          />
        ) : (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Minimum number of courses:</label>
            <p>{/* Display minimum number of courses */}</p>
            <label className="block text-sm font-medium text-gray-700 mt-4">Minimum number of advanced courses:</label>
            <p>{/* Display minimum number of advanced courses */}</p>
            <label className="block text-sm font-medium text-gray-700 mt-4">Package requirements:</label>
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex justify-between items-center mt-2">
                <span>{pkg.packageName}</span>
                <p>{/* Display minimum courses for package */}</p>
              </div>
            ))}
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
