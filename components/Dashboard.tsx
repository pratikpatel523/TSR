
import React, { useState } from 'react';
import { ParsedLogs } from '../types';
import AuditView from './views/AuditView';
import SystemLogView from './views/SystemLogView';
import GeneralView from './views/GeneralView';
import ConfigurationView from './views/ConfigurationView';
import StatisticsView from './views/StatisticsView';
import SecurityEventsView from './views/SecurityEventsView';
import NetworkView from './views/NetworkView';
import MemoryView from './views/MemoryView';
import RRDGraphsView from './views/RRDGraphsView';
import ConvisView from './views/ConvisView';


interface DashboardProps {
  data: ParsedLogs;
}

const TABS = [
  'General', 'Configuration', 'Audit', 'System Log', 'Security Events', 
  'Statistics', 'Network', 'Memory', 'RRD Graphs', 'Convis'
];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <GeneralView data={data.general} />;
      case 'Configuration':
        return <ConfigurationView data={data.configuration} />;
      case 'Audit':
        return <AuditView data={data.audit} />;
      case 'System Log':
        return <SystemLogView data={data.system} />;
      case 'Security Events':
        return <SecurityEventsView data={data.securityEvents} />;
      case 'Statistics':
        return <StatisticsView data={data.statistics} />;
      case 'Network':
        return <NetworkView data={data.network} />;
      case 'Memory':
        return <MemoryView data={data.memory} />;
      case 'RRD Graphs':
        return <RRDGraphsView data={data.rrdGraphs} />;
      case 'Convis':
        return <ConvisView data={data.convis} />;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  return (
    <div>
      <div className="border-b border-brand-primary mb-4">
        <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-brand-accent text-brand-accent'
                  : 'border-transparent text-brand-secondary hover:text-brand-text hover:border-gray-500'
              } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
