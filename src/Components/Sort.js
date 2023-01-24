import React from "react";

function Sort({ selectedSort, handleSort, sortOptions }) {
  return (
    <div className="text-right">
      <label className="text-sm text-slate-500">Sort by:&ensp;</label>
      <select
        className="text-xs px-2 py-1 rounded-xl shadow"
        value={selectedSort}
        onChange={(e) => handleSort(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
