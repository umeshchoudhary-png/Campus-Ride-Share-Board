# Campus Ride Share Board

A dynamic web application for students to share and find campus rides.

## Project Overview

Campus Ride Share Board allows students to post rides, search rides by destination, and delete rides.

The project demonstrates Git version control, automated testing, linting, Docker containerisation, and GitHub Actions CI/CD.

## Features

- Add a new ride
- Search rides by destination
- Delete rides
- REST API for ride data
- Input validation
- Health check endpoint
- Running Git commit displayed on the website
- Automated tests
- ESLint code quality checks
- Docker support
- GitHub Actions CI/CD
- Automatic Render deployment through a deploy hook

## Technology Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- ESLint
- Node.js Test Runner
- Docker
- GitHub Actions
- Render

## API Endpoints

### GET /api/rides

Returns all available rides.

### POST /api/rides

Creates a new ride.

Required fields:

- name
- from
- to
- time

### DELETE /api/rides/:id

Deletes a ride using its ID.

### GET /health

Returns the application health status and running commit ID.

## Running Locally

Install dependencies:

```bash
npm install