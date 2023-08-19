import { useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    client: "",
    contractor: "",
    max_X: "",
    min_X: "",
    max_Y: "",
    min_Y: "",
    max_Z: "",
    min_Z: "",
  });
  console.log(formData);
  const [fileData, setFileData] = useState([]);
  console.log(fileData);
  const [csvUploaded, setCsvUploaded] = useState(false);
   console.log(csvUploaded);
   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const csvData = result.data.slice(1); // Remove header row
        setFileData(csvData);
        setCsvUploaded(true);
        const xValues = csvData.map((item) => parseFloat(item[1]));
        const yValues = csvData.map((item) => parseFloat(item[2]));
        const zValues = csvData.map((item) => parseFloat(item[3]));

        const calculateMaxX = xValues.filter(value => !isNaN(value));
        const maxX = Math.max(...calculateMaxX);
        const minX = Math.min(...calculateMaxX);
        console.log("max",maxX, "min_X", minX);
       
        const calculateMaxY = yValues.filter(value => !isNaN(value));
        const maxY = Math.max(...calculateMaxY);
        const minY = Math.min(...calculateMaxY);
        console.log("max",maxY,"min",minY);

        const calculateMaxZ = zValues.filter(value => !isNaN(value));
        const maxZ = Math.max(...calculateMaxZ);
        const minZ = Math.min(...calculateMaxZ);
        console.log("max", maxZ, "min", minZ);
  
        setFormData({
          ...formData,
          max_X: isNaN(maxX) ? "" : maxX.toString(),
          min_X: isNaN(minX) ? "" : minX.toString(),
          max_Y: isNaN(maxY) ? "" : maxY.toString(),
          min_Y: isNaN(minY) ? "" : minY.toString(),
          max_Z: isNaN(maxZ) ? "" : maxZ.toString(),
          min_Z: isNaN(minZ) ? "" : minZ.toString(),
        });
      },
    });
  };

  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.text("Step 2: Result Page", 10, 10);
  
  // Create a table for form data
  doc.autoTable({
    head: [["Field", "Value"]],
    body: Object.entries(formData).map(([field, value]) => [field, value]),
  });

  // Add a line break
  doc.addPage();
  
  // Create a table for CSV data
  doc.text("CSV Data", 10, 10);
  doc.autoTable({
    head: [["KP", "X", "Y", "Z"]],
    body: fileData.map((item) => [item[0], item[1], item[2], item[3]]),
  });

  // Add a line break
  doc.addPage();
  
  // Create a table for max and min values
  doc.text("Maximum and Minimum Values", 10, 10);
  doc.autoTable({
    head: [["Field", "Maximum", "Minimum"]],
    body: [
      ["Max X", formData.max_X, formData.min_X],
      ["Max Y", formData.max_Y, formData.min_Y],
      ["Max Z", formData.max_Z, formData.min_Z],
    ],
  });

  doc.save("form_data.pdf");
};

  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Basic Information</h2>
          <label>
            Project Name:
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  projectName: e.target.value,
                }))
              }
            />
          </label>
          {/* Add input fields for Project Description, Client, and Contractor */}
          <label>
            Project Description:
            <input
              type="text"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  projectDescription: e.target.value,
                }))
              }
            />
          </label>
          {/* ... (Add other input fields) */}
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {/* Add input fields for max_X, min_X, max_Y, min_Y, max_Z, min_Z */}
          <label>
  Max X:
  <input
    type="number"
    name="max_X"
    value={formData.max_X}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        max_X: e.target.value,
      }))
    }
  />
</label>
<label>
  Min X:
  <input
    type="number"
    name="min_X"
    value={formData.min_X}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        min_X: e.target.value,
      }))
    }
  />
</label>
<label>
  Max Y:
  <input
    type="number"
    name="max_Y"
    value={formData.max_Y}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        max_Y: e.target.value,
      }))
    }
  />
</label>
<label>
  Min Y:
  <input
    type="number"
    name="min_Y"
    value={formData.min_Y}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        min_Y: e.target.value,
      }))
    }
  />
</label>
<label>
  Max Z:
  <input
    type="number"
    name="max_Z"
    value={formData.max_Z}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        max_Z: e.target.value,
      }))
    }
  />
</label>
<label>
  Min Z:
  <input
    type="number"
    name="min_Z"
    value={formData.min_Z}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        min_Z: e.target.value,
      }))
    }
  />
</label>
          {/* Add other input fields for min_X, max_Y, min_Y, max_Z, min_Z */}
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Result Page</h2>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formData).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {csvUploaded && (
            <div>
              <h3>CSV Data</h3>
              <table>
                <thead>
                  <tr>
                    <th>KP</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>Z</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((item, index) => (
                    <tr key={index}>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;