import React, { useCallback } from 'react';
import { FaUser } from 'react-icons/fa';

interface User {
  name: string;
  avatar_url: string;
}

interface DropdownProps {
  filteredUsers: User[];
  showDropdown: boolean;
  handleDropdownItemClick: (user: User) => void;
}

const Dropdown: React.FC<DropdownProps> = React.memo(({ filteredUsers, showDropdown, handleDropdownItemClick }) => { console.log("chamou drop")

    const handleClick = useCallback((user: User) => {
        handleDropdownItemClick(user);
    }, [handleDropdownItemClick]);

    if (!showDropdown) return null;

  return (
    <ul
      className="border border-gray-300 rounded-md mt-2 overflow-y-auto bg-white absolute z-10 top-1/2 right-0 md:right-1/3"
      style={{
        width: '46rem',
        maxHeight: '300px',
        color: '#C9CACC'
      }}
    >
      {filteredUsers.map((user) => (
        <li
          key={user.name}
          className="flex items-center p-2 m-2 border-b cursor-pointer"
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

export default Dropdown;
