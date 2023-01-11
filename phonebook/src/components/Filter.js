import React from "react";

const Filter = ({ searchTerm, onSearchTermChange }) => (
  <div>
    search:{" "}
    <input
      value={searchTerm || ""}
      onChange={e => onSearchTermChange(e.target.value)}
    />
  </div>
);

// lets make it writable

// const Filter = ({ searchTerm, onSearchTermChange }) => {
//   const handleSearchTermChange = event => {
//     onSearchTermChange(event.target.value);
//   };

//   return (
//     <div>
//       search: <input value={searchTerm} onChange={handleSearchTermChange} />
//     </div>
//   );
// };

export default Filter;
