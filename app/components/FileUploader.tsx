import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'


// rather than creating the whole logic for the upload of document we will use the npm react-dropzone-Simple React hook to create a HTML5-compliant drag'n'drop zone for files.

interface FileUploaderProps {
    //this will be optional and fave function that have type file
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Function to format file size in human readable format
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    //WHAT HAPPENS WHEN WE DROP THE FILE
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const uploadedFile = acceptedFiles[0] || null; //extract the first file
        setSelectedFile(uploadedFile);
        onFileSelect?.(uploadedFile);
    }, [onFileSelect]); //runs whenvever on file select changes i.e file uploaded

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 20 * 1024 * 1024 //20mb
    })
    //hook from npm which takes on drop function and gives us properties as destructured

    const handleRemoveFile = () => {
        setSelectedFile(null);
        onFileSelect?.(null);
    };


    return (
        <div className='w-full gradient-border'>
            {selectedFile ? (
                <div className='space-y-4'>
                    <div className='uploader-selected-file'>
                        <img src="images/pdf.png" alt="pdf" className='size-10' />
                        <div className='flex items-center space-x-3'>
                            <div>
                                <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>
                                    {selectedFile.name}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>

                        <button className="p-2 cursor-pointer" onClick={handleRemoveFile}>
                            <img src="icons/cross.svg" alt="remove" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div {...getRootProps()}>
                    <input {...getInputProps()} id="uploader" />
                    <div className='space-y-4 cursor-pointer'>
                        <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                            <img src="icons/info.svg" alt="upload" className='size-20' />
                        </div>
                        <p className='text-lg text-gray-500'>
                            <span className='font-semibold'>Click to upload / </span>
                            drag n drop
                        </p>
                        <p className='text-lg text-gray-500'>PDF (max 20 MB)</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUploader
