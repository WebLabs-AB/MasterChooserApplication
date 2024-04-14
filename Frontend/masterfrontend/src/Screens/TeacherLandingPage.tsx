import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const navigate = useNavigate(); // Initialize the navigate function
  const [profiles, setProfiles] = useState<Profile[]>(profilesData);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const [profileToRemove, setProfileToRemove] = useState<Profile | null>(null);

  const openRemoveDialog = (profile: Profile) => {
    setProfileToRemove(profile);
    setRemoveDialogOpen(true);
  };

  const closeRemoveDialog = () => {
    setRemoveDialogOpen(false);
  };

  const handleRemoveConfirm = () => {
    if (profileToRemove) {
      setProfiles(profiles.filter(p => p.id !== profileToRemove.id));
      closeRemoveDialog();
    }
  };

  // Function to navigate to the edit page
  const handleEdit = (profileId: number) => {
    navigate(`/teachermasterprofile`, { state: { profileId } });
  };

  const renderProfiles = () => {
    return profiles.map(profile => (
      <div key={profile.id} className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex-1">{profile.name}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleEdit(profile.id)} // Navigate to edit page
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

      {/* Dialog for Remove confirmation */}
      <Transition appear show={isRemoveDialogOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRemoveDialog}>
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
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Are you sure you want to delete the master profile?
                </Dialog.Title>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleRemoveConfirm}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={closeRemoveDialog}
                  >
                    No
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
