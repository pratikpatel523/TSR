import React, { useState } from 'react';
import { ParsedLogs } from '../../types';
import DataTable from '../DataTable';

interface NetworkViewProps {
  data: ParsedLogs['network'];
}

type SubTab = 'Interfaces' | 'IP';
const SUB_TABS: SubTab[] = ['Interfaces', 'IP'];

const PlainSection: React.FC<{title: string; lines: string[]}> = ({ title, lines }) => (
    <div className="bg-brand-surface rounded-lg shadow-lg my-6 p-4">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <pre className="bg-brand-bg p-4 rounded-md text-sm whitespace-pre-wrap font-mono">{lines.join('\n')}</pre>
    </div>
);

const NetworkView: React.FC<NetworkViewProps> = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(SUB_TABS[0]);
  
  const interfaceHeaders = [
    { key: 'iface', label: 'Interface' },
    { key: 'ipAddress', label: 'IP Address' },
    { key: 'ipv6Address', label: 'IPv6 Address' },
    { key: 'macAddress', label: 'MAC Address' },
    { key: 'enabled', label: 'Enabled' },
    { key: 'link', label: 'Link' },
    { key: 'speed', label: 'Speed' },
    { key: 'duplex', label: 'Duplex' },
    { key: 'mtu', label: 'MTU' },
    { key: 'autoNegotiate', label: 'Auto Negotiate' },
    { key: 'lineType', label: 'Line Type' },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'Interfaces':
        return <DataTable headers={interfaceHeaders} data={data.interfaces} />;
      case 'IP':
        return <PlainSection title="/usr/local/6bin/ip route" lines={data.ipRoute} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="md:w-64 flex-shrink-0">
        <nav className="space-y-1">
          {SUB_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                activeSubTab === tab 
                ? 'bg-brand-accent text-white' 
                : 'text-brand-text hover:bg-brand-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default NetworkView;