import { ChildrenProp } from '../../TS Types/interfaces';

const MarginCard: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <main className="w-[90vw] m-auto mt-10 flex justify-center">
      {children}
    </main>
  );
};

export default MarginCard;
