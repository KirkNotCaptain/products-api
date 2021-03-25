# Atelier Products API Documentation

The goal of this project was to design a backend system and RESTful API capabale of handling 500 clients per second across 4 endpoints to serve product data for an e-commerce application.

The raw data for his application was delivered in multiple CSVs that contained over 30 million total records broken into product detail data, sku data, product style data and related product data. In order to simplify the queries as much as possible, Mongodb was used due to the restructure the raw data into the JSON objects that were nearly identical to the API's expected format. A significant ETL process was implemented using Mongo Compass and multi-stage Aggregation Pipelines to consolidate the data within 3 collections.

The system was then deployed on an AWS EC2 instance using Docker and tested via loader.io.

## Table of Contents

- Installing Dependencies
- Technologies Used
- Requirements
- ETL
- Routes
- System Testing
- Notes

## Installing Dependencies

- `npm install` - install dependencies
- `npm start` - start the server in production
- Navigate to http://localhost:8080/

## Technologies Used

> Backend
> Node
> Express
> Mongodb ODM
> Docker

## Requirements

## ETL

## Routes

## System Testing

## Notes
