
import React from 'react';
import { SystemLogEntry } from '../../types';
import DataTable from '../DataTable';

interface SystemLogViewProps {
  data: SystemLogEntry[];
}

const SystemLogView: React.FC<SystemLogViewProps> = ({ data }) => {
  const headers = [
    { key: 'index', label: 'Index' },
    { key: 'date', label: 'Date' },
    { key: 'host', label: 'Host' },
    { key: 'severity', label: 'Service Severity' },
    { key: 'message', label: 'Message' },
  ];

  const getRowClassName = (item: SystemLogEntry) => {
    const severity = item.severity.toLowerCase();
    if (severity.includes('critical')) {
      return 'bg-red-900/50 hover:bg-red-800/50';
    }
    if (severity.includes('warning')) {
      return 'bg-yellow-900/50 hover:bg-yellow-800/50';
    }
    return 'hover:bg-brand-primary';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Log</h2>
      <DataTable headers={headers} data={data} getRowClassName={getRowClassName} />
    </div>
  );
};

export default SystemLogView;
