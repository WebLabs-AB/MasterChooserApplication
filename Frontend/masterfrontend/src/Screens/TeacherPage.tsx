import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

// Define a TypeScript interface for the profile
interface Profile {
    id: number;
    name: string;
  }

// Define fake data for the profiles
const profiles = [
  { id: 1, name: 'Data Science' },
  { id: 2, name: 'Machine Learning' },
  { id: 3, name: 'Artificial Intelligence' },
];

// Main Component for the Teacher Masterprofile Landing Page
const TeacherPage = () => {
  // Dialog state for edit and remove actions
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [currentProfile, setCurrentProfile] = React.useState<Profile | null>(null);

  const openDialog = (profile: Profile) => {
    setCurrentProfile(profile);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentProfile(null);
  };

  // Render the list of profiles
  const renderProfiles = () => {
    return profiles.map((profile) => (
      <div key={profile.id} className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex-1">{profile.name}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => openDialog(profile)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => openDialog(profile)}
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow rounded">
      <div className="mb-4 border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-gray-700">List of created profiles</h1>
      </div>
      {renderProfiles()}
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Create new
      </button>

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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {currentProfile ? `Edit ${currentProfile.name}` : 'Remove this profile?'}
                </Dialog.Title>
                {/* Form or confirmation buttons go here */}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeDialog}
                  >
                    Close
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

export default TeacherPage;
