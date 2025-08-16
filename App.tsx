
import React, { useState, useCallback } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { ParsedLogs } from './types';
import { useLogParser } from './hooks/useLogParser';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedLogs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);

  const { parseFile } = useLogParser();

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await parseFile(file);
      setParsedData(data);
    } catch (err) {
      setError('Failed to parse the log file. Please ensure it is a valid .tgz archive.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [parseFile]);

  const resetState = () => {
    setParsedData(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      <header className="bg-brand-surface shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-100">TippingPoint IPS Log Analyser</h1>
        </div>
        {parsedData && (
             <div className="flex items-center space-x-4">
                 <button 
                     onClick={() => setIsAIAssistantOpen(true)}
                     className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
                 >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                     AI Assistant
                 </button>
                <button 
                    onClick={resetState}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Load New File
                </button>
            </div>
        )}
      </header>
      <main className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-accent"></div>
          </div>
        ) : error ? (
          <div className="text-center p-10 bg-red-900/50 rounded-lg">
            <h2 className="text-2xl font-bold text-red-400 mb-4">An Error Occurred</h2>
            <p className="text-red-300">{error}</p>
            <button 
                onClick={resetState}
                className="mt-6 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Try Again
            </button>
          </div>
        ) : parsedData ? (
          <Dashboard data={parsedData} />
        ) : (
          <FileUpload onFileUpload={handleFileUpload} />
        )}
      </main>
      {parsedData && <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} logs={parsedData} />}
    </div>
  );
};

export default App;
