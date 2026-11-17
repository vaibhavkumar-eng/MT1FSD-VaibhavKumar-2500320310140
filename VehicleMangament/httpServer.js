
import http from 'http';

const vehicles = [
    {
        id: 1,
        vehicleName: 'Hyundai Creta',
        vehicleNumber: 'HR26AB1234',
        type: 'SUV',
        price: 1500000
    },
    {
        id: 2,
        vehicleName: 'Maruti Swift',
        vehicleNumber: 'DL8CAF5030',
        type: 'Hatchback',
        price: 750000
    },
    {
        id: 3,
        vehicleName: 'Honda City',
        vehicleNumber: 'DL10CD4567',
        type: 'Sedan',
        price: 1200000
    }
];

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Vehicle Management System</h1>');
    }

    else if (req.url === '/vehicles') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(vehicles));
    }

    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Vehicle Management System - Node.js Application');
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
