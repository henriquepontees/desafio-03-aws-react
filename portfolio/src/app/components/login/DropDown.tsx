import React, { useCallback } from 'react';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { UnauthUser } from '@/store/types';

interface DropdownProps {
  filteredUsers: UnauthUser[];
  showDropdown: boolean;
  handleDropdownItemClick: (user: UnauthUser) => void;
}

const Dropdown: React.FC<DropdownProps> = React.memo(({ filteredUsers, showDropdown, handleDropdownItemClick }) => { 
  const router = useRouter();

  const handleClick = useCallback((user: UnauthUser) => {
      handleDropdownItemClick(user);
      router.push("/portfolio");
  }, [handleDropdownItemClick, router]);

  if (!showDropdown) return null;

  return (
    <ul
      className="border border-gray-300 rounded-md  pb-6 mt-2 overflow-y-auto bg-white absolute z-10 top-1/2 right-0 md:right-1/3"
      style={{
        width: '46rem',
        maxHeight: '300px',
        color: '#C9CACC'
      }}
    >
      {filteredUsers.map((user) => (
        <li
          key={user.name}
          className="flex items-center pb-2 m-4 border-b cursor-pointer"
          onClick={() => handleClick(user)}
          style={{ borderBottom: '1.5px solid' }}
        >
          <FaUser className="mr-2" size={20} />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
