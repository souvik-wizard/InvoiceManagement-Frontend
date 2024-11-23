import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { updateDataField } from "../../store/slices/dataSlice";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // Icon for missing fields

const DashboardTabs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "Invoices" | "Products" | "Customers"
  >("Invoices");

  const dispatch = useDispatch();

  // Fetching data from the Redux store
  const dataFromStore = useSelector((state: RootState) => state.data);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const value = e.target.type === "number" ? +e.target.value : e.target.value;

    // Dispatch the action to update the Redux store
    dispatch(updateDataField({ index, field, value }));
  };

  // Render table dynamically based on activeTab
  const renderTable = () => {
    // Determine the columns to display based on the active tab
    const columns =
      activeTab === "Invoices"
        ? [
            "SerialNumber",
            "CustomerName",
            "ProductName",
            "Quantity",
            "Tax",
            "TotalAmount",
            "Date",
          ]
        : activeTab === "Products"
        ? ["ProductName", "Quantity", "UnitPrice", "Tax", "PriceWithTax"]
        : ["CustomerName", "PhoneNumber", "TotalPurchaseAmount"];

    // Check if there is data to display
    if (dataFromStore.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No data available for <b>{activeTab}</b>. Please upload a file.
        </div>
      );
    }

    // Check if any fields are missing
    const missingFields = dataFromStore.some((item) =>
      columns.some(
        (key) =>
          item[key] === null || item[key] === undefined || item[key] === "N/A"
      )
    );

    return (
      <div>
        {missingFields && (
          <div className="mb-4  text-red-500 flex items-center space-x-2">
            <FaExclamationCircle className="text-red-500" />
            <span>
              Some fields are missing. Please fill all highlighted fields below.
            </span>
          </div>
        )}

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((key) => (
                <th key={key} className="border border-gray-300 px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataFromStore.map((item: any, index: number) => (
              <tr key={index}>
                {columns.map((key) => {
                  const isMissingValue =
                    item[key] === null ||
                    item[key] === undefined ||
                    item[key] === "N/A";
                  return (
                    <td
                      key={key}
                      className="relative border border-gray-300 px-4 py-2"
                    >
                      <input
                        type={typeof item[key] === "number" ? "number" : "text"}
                        value={
                          item[key] === null ||
                          item[key] === undefined ||
                          item[key] === "N/A"
                            ? ""
                            : item[key]
                        }
                        onChange={(e) => handleInputChange(e, index, key)}
                        className={`border px-2 py-1 w-full ${
                          isMissingValue
                            ? "bg-yellow-100 border-yellow-500"
                            : ""
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8 border-b flex justify-between">
        <ul className="flex space-x-6">
          {["Invoices", "Products", "Customers"].map((tab) => (
            <li key={tab}>
              <button
                className={`inline-block py-2 px-4 font-semibold ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Upload a file
        </button>
      </div>

      <div className="p-4 border rounded-lg bg-white">{renderTable()}</div>
    </div>
  );
};

export default DashboardTabs;
