const AssignStaff = (lead, assignStaffHandler, staff) => {
  return (
    <select
      className="border px-2 py-1"
      onChange={(e) => assignStaffHandler(lead?.id, e.target.value)}
      defaultValue={lead?.name}
    >
      <option value={lead?.name} className="text-sm" disabled>
        {lead?.name || lead?.username}
      </option>
      {staff?.map((staff) => (
        <option key={staff?.id} value={staff?.id}>
          {staff?.name || staff?.username}
        </option>
      ))}
    </select>
  );
};

export default AssignStaff;
