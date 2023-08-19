import jsPDF from "jspdf";
import 'jspdf-autotable';

const Table = ({formData}) => {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
          head: [['Field', 'Value']],
          body: Object.entries(formData).map(([field, value]) => [field, value]),
        });
        doc.save('form_data.pdf');
      };
    
      const dataArray = Object.values(formData);
      console.log(dataArray);
    return (
        <div>
      <h2>Step 2: Result Page</h2>
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
          {dataArray.map((item, index) => (
            <tr key={index}>
              <td>{item.KP}</td>
              <td>{item.X}</td>
              <td>{item.Y}</td>
              <td>{item.Z}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
    );
};

export default Table;