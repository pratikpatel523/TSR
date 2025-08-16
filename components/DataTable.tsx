
import React from 'react';

interface DataTableProps<T> {
  headers: { key: keyof T | string, label: string }[];
  data: T[];
  title?: string;
  getRowClassName?: (item: T) => string;
}

const DataTable = <T extends object,>({ headers, data, title, getRowClassName }: DataTableProps<T>): React.ReactNode => {
  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden my-6">
      {title && <h3 className="text-xl font-bold p-4 bg-brand-primary">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-brand-text">
          <thead className="text-xs text-gray-300 uppercase bg-brand-primary">
            <tr>
              {headers.map((header) => (
                <th key={String(header.key)} scope="col" className="px-6 py-3 whitespace-nowrap">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b border-brand-primary ${getRowClassName ? getRowClassName(item) : 'hover:bg-brand-primary'}`}
              >
                {headers.map((header) => (
                  <td key={`${index}-${String(header.key)}`} className="px-6 py-4 whitespace-nowrap">
                    {String(item[header.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
             {data.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center py-8 text-brand-secondary">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
