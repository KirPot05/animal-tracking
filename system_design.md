# System Design Document: Animal Tracking System - Group Management and Alerts

## Table of Contents

1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [System Architecture](#system-architecture)
   - [Phase 0: Basic Prototype](#phase-0-basic-prototype)
   - [Phase 1: Enhanced Prototype](#phase-1-enhanced-prototype)
   - [Future Scope](#future-scope)
5. [Detailed Component Design](#detailed-component-design)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Database Schema](#database-schema)
6. [Data Flow](#data-flow)
7. [Error Handling and Edge Cases](#error-handling-and-edge-cases)
8. [Scalability Considerations](#scalability-considerations)
9. [Conclusion](#conclusion)

## Introduction

The Animal Tracking System is designed to provide a comprehensive solution for monitoring the real-time location of animals, managing their group dynamics, and generating alerts when certain conditions are met. This system is aimed at assisting wildlife conservation efforts, livestock management, research, and public safety.

## Problem Statement

Managing and tracking the movement and behavior of animals in real-time is challenging. Issues such as loss of animals, health monitoring, and resource management arise due to the lack of efficient tracking systems. These challenges necessitate a robust solution to ensure effective monitoring and management of animals.

## Objectives

1. **Real-Time Tracking:** Enable the real-time tracking of animals using location data from radio collars.
2. **Group Management:** Implement an algorithm to manage group assignments based on configurable proximity.
3. **Alerts and Notifications:** Generate alerts when animals deviate from their assigned groups.
4. **Scalability:** Design the system to handle large numbers of animals efficiently.
5. **User Interface:** Provide a user-friendly interface for visualizing animal locations and managing group settings.

## System Architecture

### Phase 0: Basic Prototype

#### Components

1. **Backend:**

   - Node.js for API development.
   - MongoDB for data storage.
   - Basic grouping algorithm using distance calculation.
   - Notification system for group deviation alerts.

2. **Frontend:**

   - React Native for UI development.
   - Google Maps API for map visualization.
   - Configuration interface for grouping radius.
   - Notification display.

3. **Mock Data:**
   - Simulated animal movement data.
   - Random generation of initial animal locations.

#### Architecture Diagram

![Phase 0 Architecture](/diagrams/phase-0.png)

### Phase 1: Enhanced Prototype

#### Enhancements

1. **Backend:**

   - Implement WebSockets for real-time updates.
   - Improved error handling.
   - Optimization for scalability.

2. **Frontend:**

   - Real-time map updates via WebSockets.
   - Enhanced UI for better usability.
   - Additional configuration options.

3. **Mock Data:**
   - More realistic animal movement simulation.

#### Architecture Diagram

![Phase 1 Architecture](/diagrams/phase-1.png)

### Future Scope

#### Advanced Features

1. **Advanced Analytics and Reporting:**

   - Data analytics for movement patterns and behavior analysis.
   - Detailed reporting for stakeholders.

2. **Integration with External Systems:**

   - APIs for weather, satellite imagery, and IoT devices.

3. **Mobile Application:**

   - Mobile app development for field access.

4. **Machine Learning:**

   - Predictive analysis and anomaly detection.

5. **Scalability and Performance:**
   - Microservices architecture.
   - Load balancing and auto-scaling.

#### Architecture Diagram

<!-- ![Future Scope Architecture](diagrams/future-scope-architecture.png) -->

## Detailed Component Design

### Backend

**Programming Language:** Node.js

#### API Endpoints

1. **POST /api/locations:** Receive animal location data.
   - **Request Body:** `{ animalId: string, latitude: number, longitude: number }`
   - **Response:** `{ status: string }`

#### Grouping Algorithm

- Calculate distances using the Haversine formula.
- Assign animals to groups based on a configurable radius.

#### Notifications

- Monitor group deviations.
- Generate alerts stored in MongoDB or sent via a message queue.

### Frontend

**Framework:** React Native

#### Features

1. **Map Visualization:**

   - Display animal locations and group boundaries.
   - Use Google Maps API.

2. **Configuration:**

   - Interface for setting the grouping radius.

3. **Real-Time Updates:**
   - WebSockets for real-time data updates.
   - Display notifications for group deviations.

### Database Schema

**Animal Collection:**

```json
{
  "id": "string",
  "name": "string",
  "locationHistory": [
    {
      "timestamp": "date",
      "latitude": "number",
      "longitude": "number"
    }
  ]
}
```

**Group Collection:**

```json
{
  "groupId": "string",
  "animalIds": ["string"]
}
```

**Notification Collection:**

```json
{
  "notificationId": "string",
  "animalId": "string",
  "message": "string",
  "timestamp": "date"
}
```

## Data Flow

1. **Data Transmission:** Radio collars transmit location data to the backend API.
2. **Data Processing:** Backend processes and stores the data in MongoDB.
3. **Grouping Algorithm:** Calculate distances and assign animals to groups.
4. **Notifications:** Generate and store/send notifications if an animal leaves its group.
5. **Frontend Updates:** Display updated data on the map and show notifications.

## Error Handling and Edge Cases

- **Missing Data:** Implement checks for missing or incomplete data.
- **Invalid Locations:** Validate latitude and longitude values.
- **Connectivity Issues:** Handle API call failures and retry mechanisms.
- **Scalability:** Optimize database queries and implement indexing.

## Scalability Considerations

- **Database Optimization:** Use indexing and query optimization for MongoDB.
- **Microservices Architecture:** Adopt a microservices approach for better scalability and maintainability.
- **Load Balancing:** Implement load balancing to handle increased traffic.
- **Auto-Scaling:** Use cloud services for auto-scaling based on demand.

### References

- **[Server Sent Events vs Websockets](https://ably.com/blog/websockets-vs-sse)**
- **[Horizontally Scaling websockets](https://medium.com/@ephiram2002/horizontally-scaling-websockets-using-redis-afc25e9f7102)**
- **[Scale WebSocket using Redis and HAProxy](https://vipulvyas.medium.com/scale-websocket-using-redis-and-haproxy-8e09e4d6ae87)**

## Conclusion

This system design document outlines the phased development approach for building a robust and scalable Animal Tracking System. By starting with a basic prototype and progressively enhancing the system, we aim to provide a comprehensive solution for real-time animal tracking, group management, and alert generation, addressing the needs of various industries and stakeholders.
