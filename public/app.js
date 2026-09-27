const form = document.getElementById("ride-form");
const rideList = document.getElementById("ride-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const time = document.getElementById("time").value;

    const ride = document.createElement("div");

    ride.innerHTML = `
        <h3>${from} → ${to}</h3>
        <p><strong>Student:</strong> ${name}</p>
        <p><strong>Time:</strong> ${time}</p>
        <button class="delete-button">Delete Ride</button>
        <hr>
    `;

    const emptyMessage = rideList.querySelector("p");

    if (emptyMessage && emptyMessage.textContent === "No rides available yet.") {
        rideList.innerHTML = "";
    }

    rideList.appendChild(ride);

    ride.querySelector(".delete-button").addEventListener("click", () => {
        ride.remove();

        if (rideList.children.length === 0) {
            rideList.innerHTML = "<p>No rides available yet.</p>";
        }
    });

    form.reset();
});