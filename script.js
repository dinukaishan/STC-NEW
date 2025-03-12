document.getElementById('attendanceForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Get form values
    const epfNo = document.getElementById('epfNo').value;
    const name = document.getElementById('name').value;
    const attendanceDate = document.getElementById('attendanceDate').value;
    const timeIn = document.getElementById('timeIn').value;
    const timeOut = document.getElementById('timeOut').value;
    const visitTippingBar = document.getElementById('visitTippingBar').value;
    
    // Add new row to table
    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td>${epfNo}</td>
        <td>${name}</td>
        <td>${attendanceDate}</td>
        <td>${timeIn}</td>
        <td>${timeOut}</td>
        <td>${visitTippingBar}</td>
    `;
    
    // Clear the form
    document.getElementById('attendanceForm').reset();
});

// Export to CSV
document.getElementById('exportCSV').addEventListener('click', function () {
    const rows = Array.from(document.querySelectorAll('table tr'));
    const csvContent = rows.map(row => {
        return Array.from(row.children).map(cell => cell.textContent).join(',');
    }).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.csv';
    link.click();
});

// Export to HTML
document.getElementById('exportHTML').addEventListener('click', function () {
    const tableHTML = document.querySelector('table').outerHTML;
    const blob = new Blob([tableHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.html';
    link.click();
});

// Export to DOC
document.getElementById('exportDOC').addEventListener('click', function () {
    const tableHTML = document.querySelector('table').outerHTML;
    const docContent = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Attendance Record</title>
            </head>
            <body>
                ${tableHTML}
            </body>
        </html>
    `;
    
    const blob = new Blob([docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.doc';
    link.click();
});
s