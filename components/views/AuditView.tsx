
import React from 'react';
import { AuditLogEntry } from '../../types';
import DataTable from '../DataTable';

interface AuditViewProps {
  data: AuditLogEntry[];
}

const AuditView: React.FC<AuditViewProps> = ({ data }) => {
  const headers = [
    { key: 'index', label: 'Index' },
    { key: 'date', label: 'Date' },
    { key: 'host', label: 'Host' },
    { key: 'access', label: 'Access' },
    { key: 'type', label: 'Type' },
    { key: 'address', label: 'Address' },
    { key: 'category', label: 'Category' },
    { key: 'result', label: 'Result' },
    { key: 'user', label: 'User' },
    { key: 'message', label: 'Message' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
      <DataTable headers={headers} data={data} />
    </div>
  );
};

export default AuditView;
