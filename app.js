// Function when scan is successful
function onScanSuccess(decodedText) {
  console.log(`Scanned code: ${decodedText}`);

  // Load the CSV file
  Papa.parse("sample.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      // Search for the scanned barcode
      const match = data.find(row => row['barcode'] === decodedText);

      if (match) {
        document.getElementById('result').innerHTML = `
          <strong>Item:</strong> ${match.name}<br>
          <strong>Price:</strong> ${match.price}
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