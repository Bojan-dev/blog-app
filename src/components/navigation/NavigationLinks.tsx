import { NavLink } from 'react-router-dom';

const LINKS = [
  { path: 'posts', text: 'Posts' },
  { path: 'new-post', text: 'Create Post' },
  { path: 'users', text: 'Authors' },
];

type Props = {
  setHamBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavigationLinks = ({ setHamBar }: Props) => {
  return (
    <>
      {LINKS.map((link) => (
        <li key={link.path}>
          <NavLink
            onClick={() => setHamBar(false)}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'underline w-full block' : 'block w-full'
            }
          >
            {link.text}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default NavigationLinks;
