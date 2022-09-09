import { NavLink } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <>
      <li className="">
        <NavLink
          to={'posts'}
          className={({ isActive }) =>
            isActive ? 'underline block w-full' : 'block w-full'
          }
        >
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'new-post'}
          className={({ isActive }) =>
            isActive ? 'underline w-full block' : 'block w-full'
          }
        >
          Create Post
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'users'}
          className={({ isActive }) =>
            isActive ? 'underline w-full block' : 'block w-full'
          }
        >
          Authors
        </NavLink>
      </li>
    </>
  );
};

export default NavigationLinks;
