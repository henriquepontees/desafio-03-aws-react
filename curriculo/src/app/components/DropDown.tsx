import { useRef } from 'react';

interface User {
  name: string;
  avatar_url: string;
}

interface DropdownProps {
  filteredUsers: User[];
  showDropdown: boolean;
  handleDropdownItemClick: (user: User) => void;
}

const Dropdown = ({ filteredUsers, showDropdown, handleDropdownItemClick }: DropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  return (
    showDropdown && (
      <ul
        ref={dropdownRef}
        className="border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto bg-white w-max mx-auto"
        style={{
          width: '46rem',
          height: '56px',
          position: 'absolute',
          zIndex: 10,
          top: '35rem',
        }}
      >
        {filteredUsers.map((user, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleDropdownItemClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    )
  );
};

export default Dropdown;
