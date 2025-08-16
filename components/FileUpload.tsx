
import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  }, [onFileUpload]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-100">Upload Your TSR Log File</h2>
      <p className="text-brand-secondary mb-8">
        Drag and drop your <code className="bg-brand-primary px-2 py-1 rounded-md text-brand-accent">.tgz</code> archive file here to begin analysis.
      </p>
      <form 
        id="form-file-upload" 
        className={`relative w-full h-64 border-4 border-dashed rounded-lg flex flex-col justify-center items-center transition-colors duration-300 ${dragActive ? 'border-brand-accent bg-brand-primary' : 'border-brand-primary hover:border-brand-accent'}`}
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          type="file" 
          id="input-file-upload" 
          className="hidden" 
          accept=".tgz"
          onChange={handleChange}
        />
        <label htmlFor="input-file-upload" className="h-full w-full flex flex-col justify-center items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v1m-1 8l-2-2m0 0l-2 2m2-2v6" />
          </svg>
          <p className="font-semibold text-lg">Drag & Drop or <span className="text-brand-accent">Click to Upload</span></p>
          <p className="text-sm text-brand-secondary mt-1">.tgz files only</p>
        </label>
      </form>
    </div>
  );
};

export default FileUpload;
