
import http from 'http';
import fs from 'fs';

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

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Vehicle Management System</h1>');
    }

    else if (req.url === '/vehicles' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(vehicles));
    }

    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Vehicle Management System - Node.js Application');
    }

    else if (req.url === '/add-vehicle' && req.method === 'POST') {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            try {
                const vehicle = JSON.parse(body);

                const requiredFields = [
                    'id',
                    'vehicleName',
                    'vehicleNumber',
                    'type',
                    'price'
                ];

                const missingField = requiredFields.some(field =>
                    vehicle[field] === undefined ||
                    vehicle[field] === null ||
                    vehicle[field] === ''
                );

                if (missingField) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'All vehicle fields are required'
                    }));

                    return;
                }

                vehicles.push(vehicle);

                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Vehicle added successfully',
                    vehicle: vehicle
                }));

            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON data'
                }));
            }
        });
    }

    else if (req.url === '/info' && req.method === 'GET') {

        fs.readFile('public/info.html', 'utf8', (error, data) => {

            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.end('Internal Server Error');
            }

            else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.end(data);
            }
        });
    }

    else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
