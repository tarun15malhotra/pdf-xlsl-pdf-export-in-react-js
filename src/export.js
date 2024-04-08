import React, { useState, useEffect } from 'react';

// Utility function to download JSON data
const downloadJSONFile = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};



const ActivityLogList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allPagesData = [];
        let currentPage = 1;
        let totalPages = 1;
        const formData = new FormData();
        // Fetch all pages of data
        while (currentPage <= totalPages) {
          const response = await fetch(`http://appnox-tm.it:9090/api/activity-log-list-with-page-filter?page=${currentPage}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: formData,
            //body: JSON.stringify({ page: currentPage })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const { result, pagination } = await response.json();
          allPagesData = [...allPagesData, ...result];
          totalPages = pagination.total_pages;
          currentPage++;
        }

        setAllData(allPagesData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportAllData = () => {
    downloadJSONFile(allData, 'activity_logs');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Activity Log List</h1>
      <button onClick={handleExportAllData}>Export All Data</button>
      <ul>
        {allData.map((log) => (
          <li key={log.activityLogId}>
            <strong>{log.description}</strong>
            <p>Activity Date: {log.activityDate}</p>
            <p>Method Name: {log.methodName}</p>
            <p>Request Type: {log.requestType}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogList;

