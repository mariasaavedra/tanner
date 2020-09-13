fetch('http://localhost:3000/reports')
  .then(response => response.json())
  .then(data => console.log(data));