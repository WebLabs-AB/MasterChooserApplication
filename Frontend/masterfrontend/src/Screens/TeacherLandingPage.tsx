import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// Define a TypeScript interface for the profile
interface Profile {
  id: number;
  name: string;
}

// Define fake data for the profiles
const profilesData = [
  { id: 1, name: 'Data Science' },
  { id: 2, name: 'Machine Learning' },
  { id: 3, name: 'Artificial Intelligence' },
];

// Main Component for the Teacher Masterprofile Landing Page
export const TeacherLandingPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>(profilesData);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileName, setProfileName] = useState('');

  const openEditDialog = (profile: Profile) => {
    setIsEditMode(true);
    setProfileName(profile.name);
    setCurrentProfile(profile);
    setDialogOpen(true);
  };

  const openRemoveDialog = (profile: Profile) => {
    setIsEditMode(false);
    setCurrentProfile(profile);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentProfile(null);
    setProfileName('');
  };

  const handleEdit = () => {
    if (currentProfile) {
      setProfiles(
        profiles.map(p => (p.id === currentProfile.id ? { ...p, name: profileName } : p))
      );
      closeDialog();
    }
  };

  const handleRemove = () => {
    if (currentProfile) {
      setProfiles(profiles.filter(p => p.id !== currentProfile.id));
      closeDialog();
    }
  };

  const renderProfiles = () => {
    return profiles.map(profile => (
      <div key={profile.id} className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex-1">{profile.name}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => openEditDialog(profile)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => openRemoveDialog(profile)}
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto">
          <span>Navigation bar</span>
        </div>
      </nav>

      <div className="container mx-auto my-8 p-4 bg-white shadow rounded">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h1 className="text-xl font-bold text-gray-700">List of created profiles</h1>
        </div>
        {/* Render the list of profiles */}
        {renderProfiles()}
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Create new
        </button>
      </div>

      {/* Dialog for Edit and Remove actions */}
      <Transition appear show={isDialogOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Rest of the dialog component */}
          {/* ... */}
        </Dialog>
      </Transition>
    </div>
  );
};
