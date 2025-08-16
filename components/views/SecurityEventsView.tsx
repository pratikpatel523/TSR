import React, { useState } from 'react';
import { ParsedLogs, SecurityEvent } from '../../types';
import DataTable from '../DataTable';

interface SecurityEventsViewProps {
  data: ParsedLogs['securityEvents'];
}

type SubTab = 'IPS Alert' | 'IPS Block' | 'Reputation Alert' | 'Reputation Block';
const SUB_TABS: SubTab[] = ['IPS Alert', 'IPS Block', 'Reputation Alert', 'Reputation Block'];

const SecurityEventsView: React.FC<SecurityEventsViewProps> = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(SUB_TABS[0]);
  
  const headers = [
    { key: 'index', label: 'Index' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'host', label: 'Host' },
    { key: 'severity', label: 'Severity' },
    { key: 'signatureUuid', label: 'Signature' },
    { key: 'protocol', label: 'Protocol' },
    { key: 'sourceIp', label: 'Source IP' },
    { key: 'sourcePort', label: 'Source Port' },
    { key: 'destinationIp', label: 'Destination IP' },
    { key: 'destinationPort', label: 'Destination Port' },
    { key: 'hitCount', label: 'Hits' },
    { key: 'actionType', label: 'Action' },
    { key: 'virtualSegment', label: 'Virtual Segment' },
  ];

  const renderContent = () => {
    let tableData: SecurityEvent[] = [];
    switch(activeSubTab) {
        case 'IPS Alert':
            tableData = data.ipsAlert;
            break;
        case 'IPS Block':
            tableData = data.ipsBlock;
            break;
        case 'Reputation Alert':
            tableData = data.reputationAlert;
            break;
        case 'Reputation Block':
            tableData = data.reputationBlock;
            break;
    }
    return <DataTable title={activeSubTab} headers={headers} data={tableData} />;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="md:w-64 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-4">Security Events</h2>
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

export default SecurityEventsView;