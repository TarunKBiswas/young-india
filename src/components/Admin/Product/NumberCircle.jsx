/* eslint-disable react/prop-types */
import { TD } from "../UI/Table/XTable";

const NumberCircle = ({ prod }) => {
  return (
    <TD className="relative">
      <span className="text-sm font-medium">{prod || 0}</span>
    </TD>
  );
};

export default NumberCircle;
