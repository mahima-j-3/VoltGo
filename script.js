// CHARGING STATION DATA

let stations = [
  {
    id: 1,
    name: "VoltGo Central",
    location: "Mangalore",
    address: "Kavoor Road, Mangalore",
    type: "DC Fast",
    available: 4,
    total: 6,
    hours: "24 Hours",
    contact: "9876543210",
  },
  {
    id: 2,
    name: "GreenCharge Hub",
    location: "Bantwal",
    address: "BC Road, Bantwal",
    type: "AC",
    available: 2,
    total: 4,
    hours: "6 AM - 11 PM",
    contact: "9988776655",
  },
  {
    id: 3,
    name: "E-Power Station",
    location: "Mangalore",
    address: "Bejai, Mangalore",
    type: "DC Fast",
    available: 1,
    total: 5,
    hours: "24 Hours",
    contact: "9123456789",
  },
  {
    id: 4,
    name: "ChargeNest",
    location: "Udupi",
    address: "Manipal Road, Udupi",
    type: "AC",
    available: 5,
    total: 5,
    hours: "7 AM - 10 PM",
    contact: "9012345678",
  },
];

// ============================================
// BOOKINGS
// ============================================

let bookings = [];

// ============================================
// DISPLAY STATIONS
// ============================================

function displayStations(list) {
  let output = "";

  for (let i = 0; i < list.length; i++) {
    let station = list[i];

    let status;

    if (station.available > 0) {
      status = `<p class="available">🟢 ${station.available}/${station.total} slots available</p>`;
    } 
    else {
      status = `<p class="full">🔴 Fully occupied</p>`;
    }

    output += `
            <div class="station-card">
                <div class="station-top">
                    <div>
                        <span class="station-icon">
                            ⚡
                        </span>
                    </div>

                    <span class="type">
                        ${station.type}
                    </span>

                </div>

                <h3>${station.name}</h3>
                <p>📍 ${station.location}</p>
                <p>${station.address}</p>
                <p>⏰ ${station.hours}</p>
                ${status}

                <button onclick="showDetails(${station.id})">View Station</button>
            </div>
        `;
  }

  if (list.length == 0) {
    output = `
            <p>No charging stations found.</p>
        `;
  }
  document.getElementById("stationList").innerHTML = output;
}

// ============================================
// SHOW STATION DETAILS
// ============================================

function showDetails(id) {
  let station = null;

  for (let i = 0; i < stations.length; i++) {
    if (stations[i].id == id) {
      station = stations[i];
    }
  }

  if (station == null) {
    return;
  }

  let status;

  if (station.available > 0) {
    status = `<p class="available">🟢 ${station.available} slots available</p>`;
  } 
  else {
    status = `<p class="full">🔴 No slots available</p>`;
  }

  document.getElementById("stationDetails").innerHTML = `

            <div class="detail-card">

                <p class="tag">STATION DETAILS</p>
                <h2>⚡ ${station.name}</h2>
                <p>📍 ${station.address}</p>
                <p>🔌 Charging Type:${station.type}</p>
                <p>⏰ Operating Hours:${station.hours}</p>
                <p>📞 Contact:${station.contact}</p>
                ${status}

                <button onclick="selectStation(${station.id})">Book This Station ⚡</button>
            </div>

        `;
  document.querySelector(".details-section").scrollIntoView();
}

// SELECT STATION

function selectStation(id) {
  let station;

  for (let i = 0; i < stations.length; i++) {
    if (stations[i].id == id) {
      station = stations[i];
    }
  }

  if (station.available == 0) {
    alert("This station is currently full.");

    return;
  }

  document.getElementById("selectedStation").innerText = station.name;
  document.getElementById("selectedStationId").value = station.id;
  document.getElementById("booking").scrollIntoView();
}

// SEARCH AND FILTER

function filterStations() {
  let search = document.getElementById("search").value.toLowerCase();
  let type = document.getElementById("typeFilter").value;
  let availability = document.getElementById("availabilityFilter").value;
  let result = [];

  for (let i = 0; i < stations.length; i++) {
    let station = stations[i];

    let matchesSearch =
      station.name.toLowerCase().includes(search) ||
      station.location.toLowerCase().includes(search);

    let matchesType = type == "All" || station.type == type;

    let matchesAvailability = true;

    if (availability == "Available") {
      matchesAvailability = station.available > 0;
    }

    if (availability == "Full") {
      matchesAvailability = station.available == 0;
    }

    if (matchesSearch && matchesType && matchesAvailability) {
      result.push(station);
    }
  }
  displayStations(result);
}

// ============================================
// QUICK FILTER - AVAILABLE
// ============================================

function showAvailable() {
  let result = [];
  for (let i = 0; i < stations.length; i++) {
    if (stations[i].available > 0) {
      result.push(stations[i]);
    }
  }
  displayStations(result);
}

// ============================================
// QUICK FILTER - FAST
// ============================================

function showFast() {
  let result = [];
  for (let i = 0; i < stations.length; i++) {
    if (stations[i].type == "DC Fast") {
      result.push(stations[i]);
    }
  }
  displayStations(result);
}

// ============================================
// SHOW ALL
// ============================================

function showAll() {
  displayStations(stations);
}

// COST CALCULATOR

function calculateCost() {
  let units = document.getElementById("units").value;

  if (units == "") {
    document.getElementById("cost").innerText = "₹0";
    return;
  }

  let cost = units * 18;
  document.getElementById("cost").innerText = "₹" + cost;
}

// CREATE BOOKING

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let stationId = document.getElementById("selectedStationId").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let vehicleNumber = document.getElementById("vehicleNumber").value;
    let vehicleType = document.getElementById("vehicleType").value;

    // VALIDATION

    if (stationId == "") {
      alert("Please select a charging station.");

      return;
    }

    if (name == "") {
      alert("Please enter your name.");

      return;
    }

    if (phone.length != 10) {
      alert("Phone number must contain 10 digits.");

      return;
    }

    if (date == "") {
      alert("Please select a date.");
      return;
    }

    if (time == "") {
      alert("Please select a time.");
      return;
    }

    if (vehicleNumber == "") {
      alert("Please enter your vehicle number.");

      return;
    }

    if (vehicleType == "") {
      alert("Please select your vehicle type.");

      return;
    }

    // FIND STATION

    let station;

    for (let i = 0; i < stations.length; i++) {
      if (stations[i].id == stationId) {
        station = stations[i];
      }
    }

    if (station.available == 0) {
      alert("Sorry, this station is full.");

      return;
    }

    // CREATE BOOKING

    let booking = {
      id: bookings.length + 1,
      name: name,
      phone: phone,
      station: station.name,
      stationId: station.id,
      date: date,
      time: time,
      vehicleNumber: vehicleNumber,
      vehicleType: vehicleType,
      status: "Confirmed",
    };

    bookings.push(booking);

    // REDUCE SLOT

    station.available--;

    alert("Your charging slot has been booked! ⚡");
    document.getElementById("bookingForm").reset();
    document.getElementById("selectedStation").innerText ="No station selected";
    document.getElementById("selectedStationId").value = "";
    document.getElementById("cost").innerText = "₹0";
    displayStations(stations);
    displayBookings();
    updateStats();
  });

// DISPLAY BOOKINGS

function displayBookings() {
  let output = "";

  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];

    let statusClass;

    if (booking.status == "Confirmed") {
      statusClass = "confirmed";
    } else {
      statusClass = "cancelled";
    }

    output += `

            <div class="booking-card">
                <p class="tag">CHARGING PLAN</p>
                <h3>⚡ ${booking.station}</h3>
                <p>👤 ${booking.name}</p>
                <p>📅 ${booking.date}</p>
                <p>⏰ ${booking.time}</p>
                <p>🚗 ${booking.vehicleNumber}</p>
                <p>🔋 ${booking.vehicleType}</p>
                <p class="${statusClass}">${booking.status}</p>
                ${
                  booking.status == "Confirmed"
                    ? `
                    <div class="booking-buttons">
                        <button
                            class="update-btn"
                            onclick="updateBooking(${booking.id})">
                            Update
                        </button>
                        <button
                            class="cancel-btn"
                            onclick="cancelBooking(${booking.id})">
                            Cancel
                        </button>
                    </div>

                    `
                    : ""
                }
            </div>
        `;
  }

  if (bookings.length == 0) {
    output = `
            <p>You don't have any bookings yet.</p>
        `;
  }

  document.getElementById("bookingList").innerHTML = output;
}

// UPDATE BOOKING

function updateBooking(id) {
  let booking;

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id == id) {
      booking = bookings[i];
    }
  }

  let newDate = prompt("Enter new date (YYYY-MM-DD):", booking.date);
  if (newDate == null) {
    return;
  }

  let newTime = prompt("Enter new time:", booking.time);
  if (newTime == null) {
    return;
  }

  booking.date = newDate;
  booking.time = newTime;
  alert("Booking updated successfully.");

  displayBookings();
}

// CANCEL BOOKING

function cancelBooking(id) {
  let answer = confirm("Are you sure you want to cancel this booking?");
  if (answer == false) {
    return;
  }

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id == id) {
      if (bookings[i].status == "Cancelled") {
        alert("Booking is already cancelled.");

        return;
      }

      bookings[i].status = "Cancelled";

      // RETURN SLOT

      for (let j = 0; j < stations.length; j++) {
        if (stations[j].id == bookings[i].stationId) {
          stations[j].available++;
        }
      }
    }
  }

  alert("Booking cancelled successfully.");

  displayBookings();
  displayStations(stations);
  updateStats();
}

// UPDATE STATISTICS

function updateStats() {
  let slots = 0;

  for (let i = 0; i < stations.length; i++) {
    slots = slots + stations[i].available;
  }

  document.getElementById("stationCount").innerText = stations.length;
  document.getElementById("slotCount").innerText = slots;
  document.getElementById("bookingCount").innerText = bookings.length;
}

// START WEBSITE

displayStations(stations);
displayBookings();
updateStats();
