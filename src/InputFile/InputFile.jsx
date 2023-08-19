import { useState } from "react";

const InputFile = ({onNextStep} ) => {
    const [csvData, setCsvData] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result;
        const lines = csv.split('\n');
        const data = [];
        for (let i = 1; i < lines.length; i++) {
          const [KP, X, Y, Z] = lines[i].split(',');
          data.push({ KP, X, Y, Z });
        }
        setCsvData(data);
      };
      reader.readAsText(file);
    }
  };

  const handleNext = () => {
    onNextStep({ csvFile: csvData });
  };
    return (
        <div>
      <h2>Step 1: Input Fields</h2>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      <button onClick={handleNext}>Next</button>
    </div>
    );
};

export default InputFile;