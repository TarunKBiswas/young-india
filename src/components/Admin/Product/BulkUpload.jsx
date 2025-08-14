/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FailureAlert, SuccessAlert } from "../../Toast";
import { baseURL } from "../../../utils/const_API";
import axios from "axios";
import SimpleModal from "../Modals/SimpleModal";

const BulkUpload = ({ setShowModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setSelectedFile(file);
    } else {
      FailureAlert("Please select a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setSelectedFile(file);
    } else {
      FailureAlert("Please drop a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return FailureAlert("Please select a valid Excel file");
    }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(`${baseURL}/products/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) {
        SuccessAlert("File Uploaded");
        closeModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-lg"}>
      <div className="mt-3 text-center">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Excel Data
        </h3>
        <div className="mt-2 px-7 py-3">
          <form onSubmit={handleSubmit}>
            <div
              className={`mb-6 p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition duration-300 ease-in-out ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile ? (
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
              ) : (
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Excel files only (.xlsx or .xls)
                  </p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-500 ease-in-out transform "
            >
              Upload
            </button>
          </form>
          <button className="mt-4 w-full py-3 px-4 bg-themecolor text-white font-bold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-500 ease-in-out transform ">
            <a
              href="/dummy-upload.xlsx"
              download="Sample Leads Template.xlsx"
              className="block text-center"
            >
              Download Sample File
            </a>
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default BulkUpload;
