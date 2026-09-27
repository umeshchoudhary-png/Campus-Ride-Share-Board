const test = require("node:test");
const assert = require("node:assert");
const app = require("../app");

let server;
let baseUrl;

test.before(() => {
    server = app.listen(0);
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
});

test.after(() => {
    server.close();
});

test("GET /health returns status ok", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.status, "ok");
});

test("POST /api/rides creates a ride", async () => {
    const response = await fetch(`${baseUrl}/api/rides`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Test Student",
            from: "Pune",
            to: "MIT-WPU",
            time: "09:00"
        })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.name, "Test Student");
    assert.strictEqual(data.from, "Pune");
    assert.strictEqual(data.to, "MIT-WPU");
});

test("POST /api/rides rejects missing fields", async () => {
    const response = await fetch(`${baseUrl}/api/rides`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Test Student"
        })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.ok(data.error);
});

test("GET /api/rides returns rides", async () => {
    const response = await fetch(`${baseUrl}/api/rides`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data));
});