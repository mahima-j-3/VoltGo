const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// CHARGING STATIONS

let stations = [
  {
    id: 1,
    name: "VoltGo Central",
    location: "Mangalore",
    address: "Kavoor Road, Mangalore",
    chargingType: "DC Fast",
    availableSlots: 4,
    totalSlots: 6,
    operatingHours: "24 Hours",
    contact: "9876543210",
  },

  {
    id: 2,
    name: "GreenCharge Hub",
    location: "Bantwal",
    address: "BC Road, Bantwal",
    chargingType: "AC",
    availableSlots: 2,
    totalSlots: 4,
    operatingHours: "6 AM - 11 PM",
    contact: "9988776655",
  },

  {
    id: 3,
    name: "E-Power Station",
    location: "Mangalore",
    address: "Bejai, Mangalore",
    chargingType: "DC Fast",
    availableSlots: 1,
    totalSlots: 5,
    operatingHours: "24 Hours",
    contact: "9123456789",
  },
];

// BOOKINGS

let bookings = [];

// GET ALL STATIONS

app.get("/stations", function (req, res) {
  res.json(stations);
});

// GET ONE STATION

app.get("/stations/:id", function (req, res) {
  let id = req.params.id;

  let station = stations.find(function (item) {
    return item.id == id;
  });

  if (!station) {
    res.status(404).json({
      message: "Station not found",
    });
    return;
  }

  res.json(station);
});

// ADD STATION

app.post("/stations", function (req, res) {
  let station = req.body;

  if (
    !station.name ||
    !station.location ||
    !station.address ||
    !station.chargingType
  ) {
    res.status(400).json({
      message: "Please provide all station details",
    });
    return;
  }

  station.id = stations.length + 1;

  stations.push(station);

  res.status(201).json({
    message: "Station added successfully",
    station: station,
  });
});

// UPDATE STATION

app.put("/stations/:id", function (req, res) {
  let id = req.params.id;

  let station = stations.find(function (item) {
    return item.id == id;
  });

  if (!station) {
    res.status(404).json({
      message: "Station not found",
    });
    return;
  }

  if (req.body.name) {
    station.name = req.body.name;
  }

  if (req.body.location) {
    station.location = req.body.location;
  }

  if (req.body.address) {
    station.address = req.body.address;
  }

  if (req.body.chargingType) {
    station.chargingType = req.body.chargingType;
  }

  if (req.body.operatingHours) {
    station.operatingHours = req.body.operatingHours;
  }

  if (req.body.contact) {
    station.contact = req.body.contact;
  }

  res.json({
    message: "Station updated successfully",
    station: station,
  });
});

// DELETE STATION

app.delete("/stations/:id", function (req, res) {
  let id = req.params.id;

  let index = stations.findIndex(function (item) {
    return item.id == id;
  });

  if (index == -1) {
    res.status(404).json({
      message: "Station not found",
    });
    return;
  }

  stations.splice(index, 1);

  res.json({
    message: "Station deleted successfully",
  });
});

// GET ALL BOOKINGS

app.get("/bookings", function (req, res) {
  res.json(bookings);
});

// GET ONE BOOKING

app.get("/bookings/:id", function (req, res) {
  let id = req.params.id;

  let booking = bookings.find(function (item) {
    return item.id == id;
  });

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });
    return;
  }

  res.json(booking);
});

// CREATE BOOKING

app.post("/bookings", function (req, res) {
  let booking = req.body;

  if (
    !booking.name ||
    !booking.phone ||
    !booking.stationId ||
    !booking.date ||
    !booking.time ||
    !booking.vehicleNumber ||
    !booking.vehicleType
  ) {
    res.status(400).json({
      message: "Please provide all booking details",
    });
    return;
  }

  if (booking.phone.length != 10) {
    res.status(400).json({
      message: "Phone number must contain 10 digits",
    });
    return;
  }

  let station = stations.find(function (item) {
    return item.id == booking.stationId;
  });

  if (!station) {
    res.status(404).json({
      message: "Station not found",
    });
    return;
  }

  if (station.availableSlots <= 0) {
    res.status(400).json({
      message: "No charging slots available",
    });
    return;
  }

  booking.id = bookings.length + 1;

  booking.status = "Confirmed";

  booking.stationName = station.name;

  bookings.push(booking);

  station.availableSlots--;

  res.status(201).json({
    message: "Booking created successfully",

    booking: booking,
  });
});

// UPDATE BOOKING

app.put("/bookings/:id", function (req, res) {
  let id = req.params.id;

  let booking = bookings.find(function (item) {
    return item.id == id;
  });

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });
    return;
  }

  if (booking.status == "Cancelled") {
    res.status(400).json({
      message: "Cancelled booking cannot be updated",
    });
    return;
  }

  if (req.body.date) {
    booking.date = req.body.date;
  }

  if (req.body.time) {
    booking.time = req.body.time;
  }

  if (req.body.vehicleNumber) {
    booking.vehicleNumber = req.body.vehicleNumber;
  }

  if (req.body.vehicleType) {
    booking.vehicleType = req.body.vehicleType;
  }

  res.json({
    message: "Booking updated successfully",
    booking: booking,
  });
});

// CANCEL BOOKING

app.delete("/bookings/:id", function (req, res) {
  let id = req.params.id;

  let booking = bookings.find(function (item) {
    return item.id == id;
  });

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });
    return;
  }

  if (booking.status == "Cancelled") {
    res.status(400).json({
      message: "Booking is already cancelled",
    });
    return;
  }

  booking.status = "Cancelled";

  let station = stations.find(function (item) {
    return item.id == booking.stationId;
  });

  if (station) {
    station.availableSlots++;
  }

  res.json({
    message: "Booking cancelled successfully",
  });
});

// START SERVER

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
