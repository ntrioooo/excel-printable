import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);
  const [numberExcel, setNumberExcel] = useState();

  const handlePrint = () => {
    window.print();
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (event) => {
        const bufferArray = event.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsName = wb.SheetNames[numberExcel]; // array worksheet

        const ws = wb.Sheets[wsName];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      console.log(numberExcel);
      setItems(d);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <input
          type="number"
          onChange={(e) => setNumberExcel(e.target.value)}
          className="input-field"
          placeholder="Input number for print"
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          className="input-field"
        />
        <button onClick={handlePrint} className="btn-print">
          Print
        </button>
      </div>

      <div className="mt-8">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Ceklis Diterima</th>
              <th>Ceklis Kembali</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {items.map((d) => (
              <tr key={d.No}>
                <td>{d.No}</td>
                <td>{d.Nama}</td>
                <td>{d.HP}</td>
                <td>{d.Email}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
