
import React from 'react';
import { ConvisEntry } from '../../types';
import DataTable from '../DataTable';

interface ConvisViewProps {
  data: ConvisEntry[];
}

const ConvisView: React.FC<ConvisViewProps> = ({ data }) => {
  const headers = [
    { key: 'time', label: 'Time' },
    { key: 'ipType', label: 'IP Type' },
    { key: 'sourceIp', label: 'Source IP' },
    { key: 'sourcePort', label: 'Source Port' },
    { key: 'destinationIp', label: 'Destination IP' },
    { key: 'destinationPort', label: 'Destination Port' },
    { key: 'protocol', label: 'Protocol' },
    { key: 'totalDrop', label: 'Total Drop' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Convis Log</h2>
      <DataTable headers={headers} data={data} />
    </div>
  );
};

export default ConvisView;
