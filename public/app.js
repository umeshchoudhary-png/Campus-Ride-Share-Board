const form = document.getElementById("ride-form");
const rideList = document.getElementById("ride-list");
const searchInput = document.getElementById("search");
const clearSearchButton = document.getElementById("clear-search");

let rides = JSON.parse(localStorage.getItem("rides")) || [];

function displayRides(searchText = "") {
    rideList.innerHTML = "";

    const filteredRides = rides.filter((ride) =>
        ride.to.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredRides.length === 0) {
        rideList.innerHTML = "<p>No rides available yet.</p>";
        return;
    }

    filteredRides.forEach((ride) => {
        const rideElement = document.createElement("div");

        rideElement.innerHTML = `
            <h3>${ride.from} → ${ride.to}</h3>
            <p><strong>Student:</strong> ${ride.name}</p>
            <p><strong>Time:</strong> ${ride.time}</p>
            <button class="delete-button">Delete Ride</button>
            <hr>
        `;

        rideElement
            .querySelector(".delete-button")
            .addEventListener("click", () => {
                const index = rides.indexOf(ride);

                rides.splice(index, 1);
                localStorage.setItem("rides", JSON.stringify(rides));

                displayRides(searchInput.value);
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

    displayRides(searchInput.value);

    form.reset();
});

searchInput.addEventListener("input", () => {
    displayRides(searchInput.value);
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    displayRides();
});

displayRides();