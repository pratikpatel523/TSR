import React, { useState } from 'react';
import { ParsedLogs } from '../../types';
import DataTable from '../DataTable';

interface ConfigurationViewProps {
  data: ParsedLogs['configuration'];
}

type SubTab = 'Action Sets' | 'Ethernet' | 'Misc' | 'Profiles' | 'Reputation Profiles' | 'Segments' | 'Services' | 'Traffic Management';
const SUB_TABS: SubTab[] = ['Action Sets', 'Ethernet', 'Misc', 'Profiles', 'Reputation Profiles', 'Segments', 'Services', 'Traffic Management'];

const PlainSection: React.FC<{title: string; lines: string[]}> = ({ title, lines }) => (
    <div className="bg-brand-surface rounded-lg shadow-lg my-6 p-4">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <pre className="bg-brand-bg p-4 rounded-md text-sm whitespace-pre-wrap font-mono">{lines.join('\n')}</pre>
    </div>
);

const ConfigurationView: React.FC<ConfigurationViewProps> = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>(SUB_TABS[0]);

  const renderContent = () => {
    switch (activeSubTab) {
      case 'Action Sets':
        return <DataTable headers={[{key: 'name', label: 'Name'},{key: 'action', label: 'Action'},{key: 'tcpReset', label: 'TCP-Reset'},{key: 'packetTrace', label: 'Packet Trace'},{key: 'priority', label: 'Priority'},{key: 'verbosity', label: 'Verbosity'},{key: 'contacts', label: 'Contacts'},{key: 'quarantine', label: 'Quarantine'},{key: 'httpBlock', label: 'HTTP Block'},{key: 'nonHttpBlock', label: 'Non HTTP Block'}]} data={data.actionSets} />;
      case 'Ethernet':
        return <DataTable headers={[{key: 'iface', label: 'Interface'}, {key: 'description', label: 'Description'}, {key: 'state', label: 'State'}]} data={data.ethernet} />;
      case 'Misc':
        return Object.entries(data.misc).map(([title, lines]) => <PlainSection key={title} title={title} lines={lines} />);
      case 'Profiles':
        return data.profiles.map(p => <div key={p.name}><DataTable title={`Profile: ${p.name}`} headers={[{key:'category',label:'Category'}, {key:'state',label:'State'}, {key:'actionSet',label:'Action Set'}]} data={p.overview}/><DataTable headers={[{key:'name',label:'Name'}, {key:'actionSet',label:'Action Set'}, {key:'state',label:'State'}, {key:'afc',label:'AFC'}, {key:'exceptions',label:'Exceptions'}]} data={p.details} /></div>);
      case 'Reputation Profiles':
        return data.reputationProfiles.length > 0 ? data.reputationProfiles.map(p => <div key={p.name}><DataTable title={`Reputation Profile: ${p.name}`} headers={[{key:'category',label:'Category'}, {key:'state',label:'State'}, {key:'actionSet',label:'Action Set'}]} data={p.overview}/></div>) : <p>No Reputation Profiles found.</p>;
      case 'Segments':
        return (
            <>
                <DataTable title="Physical Segments" headers={[{key: 'name', label: 'Name'}, {key: 'description', label: 'Description'}, {key: 'position', label: 'Position'}, {key: 'profile', label: 'Profile'}, {key: 'reputationProfile', label: 'Reputation Profile'}, {key: 'inPort', label: 'In Port'}, {key: 'outPort', label: 'Out Port'}]} data={data.segments.physical} />
                <DataTable title="Virtual Segments" headers={[{key: 'name', label: 'Name'}, {key: 'description', label: 'Description'}, {key: 'position', label: 'Position'}, {key: 'profile', label: 'Profile'}, {key: 'reputationProfile', label: 'Reputation Profile'}, {key: 'inPort', label: 'In Port'}, {key: 'outPort', label: 'Out Port'}]} data={data.segments.virtual} />
            </>
        )
      case 'Services':
        return <DataTable headers={[{key: 'port', label: 'Port'}, {key: 'protocol', label: 'Protocol'}, {key: 'serviceName', label: 'Service Name'}]} data={data.services} />;
      case 'Traffic Management':
        return <DataTable headers={[{key: 'profileName', label: 'Profile Name'}, {key: 'filterName', label: 'Filter Name'}, {key: 'position', label: 'Position'}, {key: 'state', label: 'State'}, {key: 'action', label: 'Action'}, {key: 'match', label: 'Match'}, {key: 'protocol', label: 'Protocol'}]} data={data.trafficManagement} />;
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

export default ConfigurationView;