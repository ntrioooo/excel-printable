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

      <div className="mt-2 overflow-x-auto">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-[10px]">
              <th className="border">No</th>
              <th className="border">No HP</th>
              <th className="border">Email</th>
              <th className="border">Nama</th>
              <th className="border">Ceklis Diterima</th>
              <th className="border">Ceklis Kembali</th>
            </tr>
          </thead>
          <tbody className="text-center text-[7px]">
            {items.map((d) => (
              <tr key={d.No}>
                <td className="border">{d.No}</td>
                <td className="border">{d.Nama}</td>
                <td className="border">{d.HP}</td>
                <td className="border">{d.Email}</td>
                <td className="border"></td>
                <td className="border"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
