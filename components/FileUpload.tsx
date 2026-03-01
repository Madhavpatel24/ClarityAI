// 'use client';

// import { useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Upload, FileText } from 'lucide-react';

// interface FileUploadProps {
//   onFileSelect: (file: File, content: string) => void;
//   isLoading?: boolean;
// }

// export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFile = (file: File) => {
//     setFileName(file.name);
//     onFileSelect(file, ""); // no text mode anymore
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-xl p-10 transition-all duration-200 ${
//           dragActive
//             ? 'border-primary bg-primary/5 scale-[1.01]'
//             : 'border-border hover:border-primary/50'
//         }`}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".pdf,.doc,.docx,.txt"
//           onChange={handleInputChange}
//           className="hidden"
//           disabled={isLoading}
//         />

//         <div className="flex flex-col items-center justify-center space-y-5">
//           <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
//             <Upload className="w-10 h-10 text-primary" />
//           </div>

//           <div className="text-center space-y-1">
//             <h3 className="text-lg font-semibold text-foreground">
//               Upload Policy Document
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               Drag & drop your file here or browse manually
//             </p>
//           </div>

//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isLoading}
//             size="lg"
//           >
//             {isLoading ? "Uploading..." : "Browse Files"}
//           </Button>

//           <p className="text-xs text-muted-foreground">
//             Supported formats: PDF, DOCX
//           </p>

//           {fileName && (
//             <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-muted rounded-lg">
//               <FileText className="w-4 h-4 text-primary" />
//               <span className="text-sm">{fileName}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File, content: string) => void;
  isLoading?: boolean;
}

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);

    try {
      const text = await file.text();
      onFileSelect(file, text);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-10 text-center shadow-sm
        ${
          dragActive
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border hover:border-primary/50 hover:shadow-lg'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleInputChange}
          className="hidden"
          disabled={isLoading}
        />

        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-9 h-9 text-primary" />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Upload Policy Document
        </h3>

        <p className="text-muted-foreground text-sm mb-6">
          Drag & drop your file here or browse manually
        </p>

        {/* Selected file */}
        {fileName && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-foreground bg-muted/40 px-4 py-2 rounded-lg">
            <FileText className="w-4 h-4 text-primary" />
            {fileName}
          </div>
        )}

        {/* Button */}
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          size="lg"
          className="px-8 shadow-md"
        >
          {isLoading ? 'Analyzing...' : 'Choose File'}
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          Supported formats: PDF, DOCX, TXT
        </p>
      </div>
    </div>
  );
}