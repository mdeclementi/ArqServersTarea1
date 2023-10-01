const express = require('express');
const app = express();
const cors = require('cors'); app.use(cors());
const EmployeesRoutes = require('./Routers/Employees');

app.use(express.json());

app.listen(8000, () => {
    console.log('server is running')
})

app.use('/api/employees/', EmployeesRoutes);