/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

export const XTable = ({ children, style }) => {
  return (
    <div className="relative overflow-x-auto scrollbar-hide sm:rounded-lg w-full">
      <table
        className={`w-full text-sm text-left border-hidden divide-y ${style} `}
      >
        {children}
      </table>
    </div>
  );
};

export const THead = ({ children }) => {
  return (
    <thead className="text-xs text-gray-500 uppercase font-medium bg-gray-50">
      {children}
    </thead>
  );
};

export const TR = ({ className, children }) => {
  return <tr className={className}>{children}</tr>;
};

export const TH = ({ children }) => {
  return (
    <th scope="col" className="p-3 font-semibold ">
      {children}
    </th>
  );
};

export const TBody = ({ children }) => {
  return <tbody className="divide-y text-xs ">{children}</tbody>;
};

export const TD = ({ children, style }) => {
  return <td className={`px-3 py-4 text-sm ${style}`}>{children}</td>;
};
