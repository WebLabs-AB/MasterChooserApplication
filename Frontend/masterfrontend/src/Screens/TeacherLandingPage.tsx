import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
}

const profilesData = [
  { id: 1, name: 'Data Science' },
  { id: 2, name: 'Machine Learning' },
  { id: 3, name: 'Artificial Intelligence' },
];

export const TeacherLandingPage = () => {
  const navigate = useNavigate();
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

  const handleEdit = (profileId: number) => {
    navigate(`/teachermasterprofile`, { state: { profileId } });
  };

  const handleCreate = () => {
    navigate(`/teachermasterprofile`);
  };

  const renderProfiles = () => {
    return profiles.map(profile => (
      <div key={profile.id} className="flex justify-between items-center p-4 border-b-2 border-teal-200">
        <div className="flex-1 text-gray-700 font-medium">{profile.name}</div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition duration-300"
          onClick={() => handleEdit(profile.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          onClick={() => openRemoveDialog(profile)}
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="bg-teal-100 min-h-screen">
      <nav className="bg-teal-600 p-4 text-white">
        <div className="container mx-auto">
          <span className="font-semibold">Navigation bar</span>
        </div>
      </nav>

      <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-4 border-b-2 border-teal-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">List of created profiles</h1>
        </div>
        {renderProfiles()}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition duration-300"
          onClick={() => handleCreate()}  
        >
          Create new
        </button>
      </div>

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
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                  Are you sure you want to delete the master profile?
                </Dialog.Title>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700 transition duration-300"
                    onClick={handleRemoveConfirm}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
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
