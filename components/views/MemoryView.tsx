
import React from 'react';
import { ParsedLogs } from '../../types';

interface MemoryViewProps {
  data: ParsedLogs['memory'];
}

const PlainSection: React.FC<{title: string; lines: string[]}> = ({ title, lines }) => (
    <div className="bg-brand-surface rounded-lg shadow-lg my-6 p-4">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <pre className="bg-brand-bg p-4 rounded-md text-sm whitespace-pre-wrap font-mono">{lines.join('\n')}</pre>
    </div>
);


const MemoryView: React.FC<MemoryViewProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Memory Information</h2>
      <PlainSection title="/proc/meminfo" lines={data.meminfo} />
      <PlainSection title="show system xms memory all" lines={data.memoryAll} />
      <PlainSection title="/proc/slabinfo" lines={data.slabinfo} />
    </div>
  );
};

export default MemoryView;
