// App.js
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserListPDF from './UserListPDF';
import * as XLSX from 'xlsx'; // Import all functions and objects from 'xlsx'


const generateMockUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `123-456-${(i + 1000).toString().substring(1)}`, // Generates phone number in the format 123-456-0xxx
      // Add more properties as needed
    });
  }
  return users;
};

const users = generateMockUsers(500);

const generateXLSFile = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

const handleDownloadXLSX = () => {
  generateXLSFile(users, 'user_data');
};

const downloadJSONFile = (data, filename) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const handleDownloadJSON = () => {
  downloadJSONFile(users, 'user_data');
};



const App = () => (
  <div>
    <h1>My React User List</h1>
    <PDFDownloadLink document={<UserListPDF users={users} />} fileName="userlist.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
    <button onClick={handleDownloadXLSX}>Download XLSX</button>
    <button onClick={handleDownloadJSON}>Download JSON</button>
  </div>
);

export default App;
