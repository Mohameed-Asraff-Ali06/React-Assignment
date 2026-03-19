import { FiBarChart2 } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-blue-600 text-xl" />
          <h1 className="text-lg font-semibold text-gray-800">
            Rewards Dashboard
          </h1>
        </div>

      </div>
    </header>
  );
};

export default Header;