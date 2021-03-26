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

- Node
- Express
- Redis
- Mongodb
- Docker

## Requirements

Ensure that the following modules are installed before running `npm install`

- Node v10.13.10 or higher

## ETL

## Routes

| Request Type | Endpoint                      | Returns                                                                                                                                         | Status |
| ------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| GET          | /products                     | an array containing all products by id in ascending order. The number of products returned can be modified using the count and page parameters. | 200    |
| GET          | /products/:product_id         | an object containing the full product details for a particular product.                                                                         | 200    |
| GET          | /products/:product_id/related | an array containing the product ids of all related products for a particular product                                                            | 200    |
| GET          | /products/:product_id/styles  | an object containing the product id and results property that contains all of the style data for a particular product                           | 200    |

## System Testing

Server testing was done primarily through loader.io
The minimum requirements were as follows:

|                          | Stress Load | Latency  | Error Rate |
| ------------------------ | ----------- | -------- | ---------- |
| **Minimum Requirements** | 100 RPS     | < 2000ms | < 1%       |

Initial testing for all endpoints passed these requirements with the latency measuring between 12-13ms. These numbers remained consistent until stress loads of over 500 RPS were introduced.

**Results After Redis Caching**

After Redis Caching was implemented, server performance increased significantly for all endpoints as shown in the examples below:

**/styles Loader Results Initial**

|             | Stress Load | Latency | Error Rate | Success Rate |
| ----------- | ----------- | ------- | ---------- | ------------ |
| **/styles** | 1000 RPS    | 2212ms  | 0%         | 66%          |

![Initial styles loader test](imgs/styles-initial.png '/styles Initial Loader Results')

**/styles Post Redis Caching Results**

|             | Stress Load | Latency | Error Rate | Success Rate |
| ----------- | ----------- | ------- | ---------- | ------------ |
| **/styles** | 1000 RPS    | 12ms    | 0%         | 100%         |

![Post Redis styles loader test](imgs/styles-post-redis.png '/styles Post Redis Loader Results')

## Notes
