const form = document.getElementById("ride-form");
const rideList = document.getElementById("ride-list");
const searchInput = document.getElementById("search");
const clearSearchButton = document.getElementById("clear-search");

let rides = [];

async function loadRides() {
    const response = await fetch("/api/rides");

    if (!response.ok) {
        throw new Error("Failed to load rides");
    }

    rides = await response.json();
    displayRides(searchInput.value);
}

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
            .addEventListener("click", async () => {
                await deleteRide(ride.id);
            });

        rideList.appendChild(rideElement);
    });
}

async function addRide(ride) {
    const response = await fetch("/api/rides", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ride)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add ride");
    }

    await loadRides();
}

async function deleteRide(id) {
    const response = await fetch(`/api/rides/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete ride");
    }

    await loadRides();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const ride = {
        name: document.getElementById("name").value.trim(),
        from: document.getElementById("from").value.trim(),
        to: document.getElementById("to").value.trim(),
        time: document.getElementById("time").value
    };

    try {
        await addRide(ride);
        form.reset();
    } catch (error) {
        alert(error.message);
    }
});

searchInput.addEventListener("input", () => {
    displayRides(searchInput.value);
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    displayRides();
});

loadRides().catch((error) => {
    rideList.innerHTML = `<p>${error.message}</p>`;
});