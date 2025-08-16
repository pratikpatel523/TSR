import React, { useState } from 'react';
import { ParsedLogs } from '../../types';
import DataTable from '../DataTable';

interface GeneralViewProps {
  data: ParsedLogs['general'];
}

type SubTab = 'Device Information' | 'MFG-INFO' | 'Health';
const SUB_TABS: SubTab[] = ['Device Information', 'MFG-INFO', 'Health'];

const PlainSection: React.FC<{title: string; lines: string[]}> = ({ title, lines }) => (
    <div className="bg-brand-surface rounded-lg shadow-lg my-6 p-4">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <pre className="bg-brand-bg p-4 rounded-md text-sm whitespace-pre-wrap font-mono">{lines.join('\n')}</pre>
    </div>
);


const GeneralView: React.FC<GeneralViewProps> = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(SUB_TABS[0]);

  const renderContent = () => {
    switch (activeSubTab) {
      case 'Device Information':
        return (
            <>
                <PlainSection title="Show Version" lines={data.deviceInfo.version} />
                <DataTable 
                    title="Show License"
                    headers={[
                        { key: 'feature', label: 'Feature' },
                        { key: 'permit', label: 'Permit' },
                        { key: 'expiration', label: 'Expiration' },
                        { key: 'activationCode', label: 'Activation Code' },
                        { key: 'details', label: 'Details' },
                    ]} 
                    data={data.deviceInfo.license} 
                />
            </>
        );
      case 'MFG-INFO':
        return <PlainSection title="Show MFG-INFO" lines={data.deviceInfo.mfgInfo} />;
      case 'Health':
        return (
            <>
                <DataTable title="Memory" headers={[{key: 'metric', label: 'Metric'}, {key: 'value', label: 'Value'}]} data={data.health.memory} />
                <PlainSection title="SAL Restarts" lines={data.health.salRestarts} />
                <PlainSection title="Port Links" lines={data.health.portLinks} />
                <DataTable title="Temperature" headers={[{key: 'thermometer', label: 'Thermometer'}, {key: 'health', label: 'Health'}, {key: 'warning', label: 'Warning (°C)'}, {key: 'critical', label: 'Critical (°C)'}]} data={data.health.temperature} />
                <DataTable title="Power Supply" headers={[{key: 'name', label: 'Name'}, {key: 'status', label: 'Status'}, {key: 'health', label: 'Health'}]} data={data.health.powerSupply} />
                <DataTable title="Voltages" headers={[{key: 'rail', label: 'Rail'}, {key: 'voltage', label: 'Voltage (V)'}, {key: 'health', label: 'Health'}]} data={data.health.voltages} />
                <DataTable title="Partitions" headers={[{key: 'partition', label: 'Partition'}, {key: 'percentUsed', label: '% Used'}, {key: 'currentUse', label: 'Use (GB)'}, {key: 'totalCapacity', label: 'Total (GB)'}, {key: 'health', label: 'Health'}, {key: 'warning', label: 'Warning %'}, {key: 'critical', label: 'Critical %'}]} data={data.health.partitions} />
                <DataTable title="FAN Health" headers={[{key: 'location', label: 'Location'}, {key: 'currentRpm', label: 'Current RPM'}, {key: 'health', label: 'Health'}, {key: 'warningRpm', label: 'Warning RPM'}, {key: 'criticalRpm', label: 'Critical RPM'}]} data={data.health.fanHealth} />
            </>
        );
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

export default GeneralView;