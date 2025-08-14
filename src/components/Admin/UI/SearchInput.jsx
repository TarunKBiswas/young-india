/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";

const SearchInput = ({ search, setSearch, handler }) => {
  return (
    <div className="w-full flex border rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm outline-none focus:ring-0 focus:shadow-none bg-transparent border-none rounded-none text-slate-800"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="bg-gray-300 w-[0.2px]"></div>
      <button
        className="py-[16px] px-[20px] bg-transparent rounded-md rounded-l-none text-sm transition-all duration-150"
        onClick={() => handler(search)}
      >
        <BsSearch className="text-[#222222] font-bold h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchInput;
