/* eslint-disable react/prop-types */
import Multiselect from "multiselect-react-dropdown";

const MultiSelect = ({
  data,
  selectDataHandler,
  unSelectedHandler,
  alignStyle,
  required,
  title,
  labelSize,
  inputSize,
  displayValue,
}) => {
  return (
    <div className={alignStyle}>
      <label className={labelSize}>
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className={inputSize}>
        <Multiselect
          displayValue={displayValue}
          options={data?.map((data) => data)}
          isObject={true}
          onSelect={(e) => selectDataHandler(e)}
          onRemove={(e) => unSelectedHandler(e)}
          showCheckbox
        />
      </div>
    </div>
  );
};

export default MultiSelect;
