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
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between">
        <input
          type="number"
          onChange={(e) => setNumberExcel(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-print"
          placeholder="Input number excel"
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 no-print p-1"
        />
        <button
          onClick={handlePrint}
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 no-print"
        >
          Print
        </button>
      </div>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="text-[10px] text-[#3876BF]">
              <th className="border w-[30px]">No</th>
              <th className="border">Nama</th>
              <th className="border w-[100px]">No HP</th>
              <th className="border">Email</th>
              <th className="border w-[80px]">Ceklis Diterima</th>
              <th className="border w-[80px]">Ceklis Kembali</th>
            </tr>
          </thead>
          <tbody className="text-[7px]">
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
