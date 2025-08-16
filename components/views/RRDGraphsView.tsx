
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ParsedLogs } from '../../types';

interface RRDGraphsViewProps {
  data: ParsedLogs['rrdGraphs'];
}

const ChartCard: React.FC<{title: string, data: any[], xKey: string, yKey: string, yLabel: string}> = ({title, data, xKey, yKey, yLabel}) => (
    <div className="bg-brand-surface rounded-lg shadow-lg p-4 my-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey={xKey} stroke="#e2e8f0" />
                <YAxis stroke="#e2e8f0" />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} 
                    labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey={yKey} name={yLabel} stroke="#38b2ac" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);


const RRDGraphsView: React.FC<RRDGraphsViewProps> = ({ data }) => {
    const [days, setDays] = useState(30);

    const slicedData = (d: any[]) => d.slice(0, days);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">RRD Graphs</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="days-slider" className="text-sm font-medium">Days to display: {days}</label>
                    <input 
                        id="days-slider"
                        type="range" 
                        min="1" 
                        max="30" 
                        value={days} 
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-48"
                    />
                </div>
            </div>
            <ChartCard title="CPU Utilization" data={slicedData(data.cpuutil)} xKey="day" yKey="util" yLabel="Utilization %" />
            <ChartCard title="Fan Speed" data={slicedData(data.fanspeed)} xKey="day" yKey="speed" yLabel="RPM" />
            <ChartCard title="Memory Utilization" data={slicedData(data.memutil)} xKey="day" yKey="util" yLabel="Utilization %" />
        </div>
    );
};

export default RRDGraphsView;
