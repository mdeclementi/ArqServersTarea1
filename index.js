const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); app.use(cors());
const EmployeesRoutes = require('./Routers/Employees');

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://api:Mgv3DsML0k0WEUZf@cluster0.w1wifjo.mongodb.net/tareaBACKEND?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//SE INICIA LA APLICACION EN PUERTO 3000
app.listen(3000, () => {
    console.log('server is running')
})

app.use('/api/employees/', EmployeesRoutes);