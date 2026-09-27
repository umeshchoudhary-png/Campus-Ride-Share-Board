const form = document.getElementById("ride-form");
const rideList = document.getElementById("ride-list");

let rides = JSON.parse(localStorage.getItem("rides")) || [];

function displayRides() {
    rideList.innerHTML = "";

    if (rides.length === 0) {
        rideList.innerHTML = "<p>No rides available yet.</p>";
        return;
    }

    rides.forEach((ride, index) => {
        const rideElement = document.createElement("div");

        rideElement.innerHTML = `
            <h3>${ride.from} → ${ride.to}</h3>
            <p><strong>Student:</strong> ${ride.name}</p>
            <p><strong>Time:</strong> ${ride.time}</p>
            <button class="delete-button">Delete Ride</button>
            <hr>
        `;

        rideElement.querySelector(".delete-button").addEventListener("click", () => {
            rides.splice(index, 1);
            localStorage.setItem("rides", JSON.stringify(rides));
            displayRides();
        });

        rideList.appendChild(rideElement);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const ride = {
        name: document.getElementById("name").value,
        from: document.getElementById("from").value,
        to: document.getElementById("to").value,
        time: document.getElementById("time").value
    };

    rides.push(ride);
    localStorage.setItem("rides", JSON.stringify(rides));

    displayRides();
    form.reset();
});

displayRides();