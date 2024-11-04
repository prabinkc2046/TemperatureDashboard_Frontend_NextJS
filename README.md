# Temperature Dashboard

Welcome to the Temperature Dashboard! This project was developed to showcase my skills in building a full-stack application using modern technologies.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [APIs](#apis)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction

Hi, my name is Prabin, and you are welcome to my portfolio show. I built this project after being selected for an interview to demonstrate my skills relevant to the job.

This application utilizes MongoDB as the database, hosted on Atlas, and has a backend built with Node.js and TypeScript.

## Technologies Used

- **Frontend:** Next.js
- **Backend:** Node.js, TypeScript
- **Database:** MongoDB (hosted on Atlas)
- **Charting Library:** Plotly

## Features

- Visualize temperature data across different locations.
- Filter data by location and date range.
- Interactive dashboard with various chart types (line, bar, box).

## APIs

I created three main APIs for this application:

1. **API 1:** Fetches temperature data for the last N days.

   - **Endpoint:** `/api/temperature/`
   - **Description:** Retrieves temperature data for all location and all dates range.

2. **API 2:** Aggregates and returns temperature statistics by date range and location.

   - **Endpoint:** `/api/temperature/range?startDate=2024-10-01&endDate=2024-10-20&location=Melbourne`
   - **Description:** Provides daily temperatures data for a specified date range and location.

3. **API 3:** Provides metadata and configuration for the temperature visualization.
   - **Endpoint:** `/api/temperature/last?last=7days&location=Melbourne`
   - **Description:** Returns daily temperature data for specified location in the last N days.

## Getting Started

To get started with this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prabinkc2046/TemperatureDashboard_Frontend_NextJS.git
   cd temperature-dashboard
   ```

2. **Install dependencies:**

```bash
npm install
```
