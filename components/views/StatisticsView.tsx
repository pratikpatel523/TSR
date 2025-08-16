import React, { useState } from 'react';
import { ParsedLogs, StatTable } from '../../types';
import DataTable from '../DataTable';

interface StatisticsViewProps {
  data: ParsedLogs['statistics'];
}

type SubTab = 
    | 'Engine Filter' | 'Engine Packet' | 'Engine Parse' | 'Engine Reputation IP'
    | 'Engine Reputation DNS' | 'Engine Rule' | 'Gen Stats' | 'Protocol Mix'
    | 'Reassembly IP' | 'Reassembly TCP' | 'Regex' | 'Rule Stats'
    | 'Stat Show All' | 'Softlinx' | 'Tier Stats';

const SUB_TABS: SubTab[] = [
    'Engine Filter', 'Engine Packet', 'Engine Parse', 'Engine Reputation IP',
    'Engine Reputation DNS', 'Engine Rule', 'Gen Stats', 'Protocol Mix',
    'Reassembly IP', 'Reassembly TCP', 'Regex', 'Rule Stats', 'Stat Show All',
    'Softlinx', 'Tier Stats'
];

const PlainSection: React.FC<{title: string; lines: string[]}> = ({ title, lines }) => (
    <div className="bg-brand-surface rounded-lg shadow-lg my-6 p-4">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <pre className="bg-brand-bg p-4 rounded-md text-sm whitespace-pre-wrap font-mono">{lines.join('\n')}</pre>
    </div>
);

// Helper to render a StatTable
const renderTable = (tableData: StatTable, key: string) => {
    const dataForTable = tableData.rows.map(row => {
        const obj: { [key: string]: string | number } = {};
        tableData.headers.forEach((h, i) => {
            obj[h] = row[i];
        });
        return obj;
    });

    return <DataTable
        key={key}
        title={tableData.title || key}
        headers={tableData.headers.map(h => ({ key: h, label: h }))}
        data={dataForTable}
    />
};


const StatisticsView: React.FC<StatisticsViewProps> = ({ data }) => {
    const [activeSubTab, setActiveSubTab] = useState<SubTab>(SUB_TABS[0]);
    
    const renderContent = () => {
        switch (activeSubTab) {
            case 'Engine Filter':
                return renderTable(data.engineFilter, 'Engine Filter');
            case 'Engine Packet':
                return renderTable(data.enginePacket, 'Engine Packet');
            case 'Engine Parse':
                return renderTable(data.engineParse, 'Engine Parse');
            case 'Engine Reputation IP':
                return <PlainSection title="Engine Reputation IP" lines={data.engineReputationIp} />;
            case 'Engine Reputation DNS':
                return <PlainSection title="Engine Reputation DNS" lines={data.engineReputationDns} />;
            case 'Engine Rule':
                return <PlainSection title="Engine Rule" lines={data.engineRule} />;
            case 'Gen Stats':
                return <PlainSection title="Gen Stats" lines={data.genStats} />;
            case 'Protocol Mix':
                return (
                    <>
                        {renderTable(data.protocolMix.ethType, 'EthType')}
                        {renderTable(data.protocolMix.ipVersion, 'IP Version')}
                        {renderTable(data.protocolMix.ipProtocol, 'IP Protocol (IPv4)')}
                        {renderTable(data.protocolMix.ipv6Protocol, 'IPv6 Protocol')}
                    </>
                );
            case 'Reassembly IP':
                return <PlainSection title="Reassembly IP" lines={data.reassemblyIp} />;
            case 'Reassembly TCP':
                return <PlainSection title="Reassembly TCP" lines={data.reassemblyTcp} />;
            case 'Regex':
                return renderTable(data.regex, 'Regex');
            case 'Rule Stats':
                return renderTable(data.ruleStats, 'Rule Stats');
            case 'Stat Show All':
                return data.statShowAll.map((table, index) => renderTable(table, table.title || `Table ${index}`));
            case 'Softlinx':
                return <PlainSection title="Softlinx" lines={data.softlinx} />;
            case 'Tier Stats':
                return (
                    <>
                        {renderTable(data.tierStats.tier1, 'Tier 1')}
                        {renderTable(data.tierStats.tier2, 'Tier 2')}
                        {renderTable(data.tierStats.tier3, 'Tier 3')}
                        {renderTable(data.tierStats.tier4, 'Tier 4')}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-64 flex-shrink-0">
                 <h2 className="text-2xl font-bold mb-4">Statistics</h2>
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

export default StatisticsView;