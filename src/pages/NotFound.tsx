import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main className="flex justify-center flex-col items-center mt-20 ">
      <h1 className="text-6xl font-bold">404</h1>
      <h4 className="text-lg mt-2">Page not Found</h4>
      <Link
        to={'/'}
        className="text-lg bg-second-blue py-3 px-8 br-5 rounded-md text-white mt-5 transition hover:scale-105"
      >
        Go to Homepage
      </Link>
    </main>
  );
};

export default NotFound;
