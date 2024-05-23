import React, { useState } from "react";

const ReusableTable = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-blue-900 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-2 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-2 text-left">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
