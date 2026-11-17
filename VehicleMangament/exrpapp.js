
import express from 'express';

const app = express();

app.use(express.json());

const vehicles = [
    { id: 1, vehicleName: 'Hyundai Creta', vehicleNumber: 'HR26AB1234', type: 'SUV', price: 1500000 },
    { id: 2, vehicleName: 'Maruti Swift', vehicleNumber: 'DL8CAF5030', type: 'Hatchback', price: 750000 },
    { id: 3, vehicleName: 'Honda City', vehicleNumber: 'DL10CD4567', type: 'Sedan', price: 1200000 }
];

// GET all vehicles
app.get('/vehicles', (req, res) => {
    res.status(200).json(vehicles);
});

// GET vehicle by ID
app.get('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
});

// POST add a new vehicle
app.post('/vehicles', (req, res) => {
    const { id, vehicleName, vehicleNumber, type, price } = req.body;

    if (id === undefined || !vehicleName || !vehicleNumber || !type || price === undefined) {
        return res.status(400).json({ message: 'All vehicle fields are required' });
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
        return res.status(400).json({ message: 'Price must be positive' });
    }

    if (vehicles.some(v => v.id === Number(id))) {
        return res.status(400).json({ message: 'Vehicle ID already exists' });
    }

    const newVehicle = {
        id: Number(id),
        vehicleName,
        vehicleNumber,
        type,
        price: Number(price)
    };

    vehicles.push(newVehicle);

    res.status(201).json({
        message: 'Vehicle added successfully',
        vehicle: newVehicle
    });
});

// PUT update a vehicle
app.put('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
    }

    const { vehicleName, vehicleNumber, type, price } = req.body;

    if (!vehicleName || !vehicleNumber || !type || price === undefined) {
        return res.status(400).json({ message: 'All vehicle fields are required' });
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
        return res.status(400).json({ message: 'Price must be positive' });
    }

    vehicle.vehicleName = vehicleName;
    vehicle.vehicleNumber = vehicleNumber;
    vehicle.type = type;
    vehicle.price = Number(price);

    res.status(200).json({
        message: 'Vehicle updated successfully',
        vehicle
    });
});

// DELETE a vehicle
app.delete('/vehicles/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = vehicles.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Vehicle not found' });
    }

    const deletedVehicle = vehicles.splice(index, 1);

    res.status(200).json({
        message: 'Vehicle deleted successfully',
        vehicle: deletedVehicle[0]
    });
});

app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
