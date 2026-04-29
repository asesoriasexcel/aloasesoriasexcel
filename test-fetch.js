fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{id:"1", nombre:"test", cantidad:1, precio:1000}] })
}).then(r => r.text()).then(console.log).catch(console.error);
