import { Link } from 'react-router-dom';

const NoInfoFound: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col w-2/4 items-center ">
      <h2 className="text-xl">{text}</h2>
      <Link
        to={'/'}
        className="text-lg bg-second-blue py-3 px-20 br-5 rounded-md text-white mt-5 transition hover:scale-105  text-center"
      >
        All Posts
      </Link>
    </div>
  );
};

export default NoInfoFound;
