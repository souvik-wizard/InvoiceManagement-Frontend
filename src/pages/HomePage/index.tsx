import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../../store/slices/dataSlice";

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false); // Track upload state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validMimeTypes = [
    "application/pdf", // PDF
    "image/jpeg", // JPEG
    "image/png", // PNG
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB MAX

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    for (const file of Array.from(files)) {
      if (!validMimeTypes.includes(file.type)) {
        setError(
          "Invalid file type. Only PDF, Images(JPEG/PNG), and Excel files are allowed."
        );
        continue;
      }

      if (file.size > maxFileSize) {
        setError("File size exceeds the 5MB limit.");
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      uploadFilesToBackend(validFiles); // Pass validFiles directly to backend
    }
  };

  const uploadFilesToBackend = async (files: File[]) => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      setUploadedFiles(files);
      setError(null); // Clear any previous errors
      const response = await fetch("http://localhost:5000/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const data = await response.json();
      setSuccessMessage("Files uploaded successfully!");
      const parsedData = data.data;
      console.log(parsedData, "parsedData");
      dispatch(setData(parsedData));

      navigate("/table");
    } catch (error) {
      setError(
        `Failed to upload files: ${error || "Please upload one file at a time"}`
      );
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFileUpload(files); // Pass the FileList to handleFileUpload
  };

  const handleDismissButton = () => {
    setError(null);
    setUploadedFiles([]);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center flex-col w-full">
      {/* File Upload Section */}
      <h1 className="text-2xl font-bold mb-4">Upload your file here</h1>
      {/* File Upload Section */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed border-gray-400 bg-white p-8 rounded-lg flex flex-col items-center justify-center w-10/12 ${
          uploading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <label
          htmlFor="file-upload"
          className={`${
            uploading
              ? "cursor-not-allowed"
              : "cursor-pointer hover:text-blue-700"
          } text-blue-500  font-semibold`}
        >
          Drag & drop or click here to upload files
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.xlsx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          disabled={uploading} // Disable the file input during upload
        />
        <p className="text-sm text-gray-500 mt-2">
          Only PDF, Images(JPEG/PNG), and Excel files are allowed. Max size:
          5MB.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error} &nbsp;
          <button
            onClick={handleDismissButton}
            className=" border-blue-400 border text-blue-500 p-1 rounded hover:bg-blue-500 hover:text-white transition-all ease-in-out delay-100
            "
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Uploading Indicator */}
      {uploading && (
        <div className="mt-4 text-green-500 font-medium">Uploading ...</div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 text-green-500 font-medium">{successMessage}</div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8 flex items-center justify-center flex-col">
          <h3 className="text-lg font-bold mb-4">File Details:</h3>
          <ul>
            {uploadedFiles.map((file, idx) => (
              <li key={idx} className="text-gray-700">
                <span>{idx + 1}. </span>
                <span className="font-semibold text-blue-500">
                  File name:{" "}
                </span>{" "}
                {file.name},{" "}
                <span className="font-semibold text-blue-500">File size: </span>{" "}
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
