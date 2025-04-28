// Function when scan is successful
function onScanSuccess(decodedText) {
  console.log(`Scanned code: ${decodedText}`);

  // Load the CSV from OneDrive using the direct link
  Papa.parse("https://docs.google.com/file/d/1TDlnxlqHmAjGjG4KnpCCAayNs9nFEpGU/edit?usp=docslist_api&filetype=msexcel", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      // Search for the scanned barcode
      const match = data.find(row => row['Barcode'] === decodedText);

      if (match) {
        document.getElementById('result').innerHTML = `
          <strong>Quantity:</strong> ${match.StockQuantity}<br>
          <strong>Value:</strong> ${match.StockValue}
        `;
      } else {
        document.getElementById('result').textContent = "No match found.";
      }
    },
    error: function(err) {
      console.error(err);
      document.getElementById('result').textContent = "Error loading CSV.";
    }
  });
}

// Create the scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });

html5QrcodeScanner.render(onScanSuccess);
