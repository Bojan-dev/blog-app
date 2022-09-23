import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import NavigationLinks from './NavigationLinks';

const Navigation: React.FC = () => {
  const [isHamBarActive, setIsHamBarActive] = useState(false);
  return (
    <header className="w-screen py-6 sm:py-10 px-10% bg-main-purple text-white flex justify-between overflow-x-hidden items-center ">
      <Link to={'/'} className="lg:text-5xl text-4xl font-bold">
        Redux Blog
      </Link>
      <nav>
        <FontAwesomeIcon
          icon={faBars}
          size="3x"
          className="cursor-pointer hover:scale-105 block sm:hidden"
          onClick={() => setIsHamBarActive((prevState) => !prevState)}
        />
        {isHamBarActive && (
          <ul className="flex z-10 flex-col sm:hidden absolute bg-main-purple w-screen left-0 text-lg gap-8 py-8 text-center [&>*]:w-[50vw] [&>*]:py-2 [&>*]:bg-main-purple-light [&>*]:m-auto">
            <NavigationLinks setHamBar={setIsHamBarActive} />
          </ul>
        )}
        <ul className="list-none flex lg:text-2xl gap-8 text-lg ald hidden sm:flex">
          <NavigationLinks setHamBar={setIsHamBarActive} />
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
