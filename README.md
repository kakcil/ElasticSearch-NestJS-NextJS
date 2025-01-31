# Restaurant Search Application

This project is a simple restaurant search application developed using modern web technologies.

## Technologies Used

- **Backend**: NestJS (TypeScript)
- **Frontend**: Next.js 14 + Tailwind CSS
- **Search Engine**: Elasticsearch
- **Visualization**: Kibana
- **Containerization**: Docker & Docker Compose
- **Stable Node.js Version**: 22.13.1

## Project Purpose

This project aims to bring together modern web technologies to develop a sample application with the following features:

- **Powerful search capabilities** using Elasticsearch
- **Modern and fast frontend** with Next.js
- **Elegant and responsive design** with Tailwind CSS
- **Easy setup and deployment** using Docker
- **Data visualization and management** with Kibana

## Installation

### 1. Install Docker

Ensure that **Docker** is installed on your system before proceeding. You can download and install it from [Docker's official website](https://www.docker.com/).

### 2. Start Docker Containers

```sh
docker-compose up -d
```
This command will start Elasticsearch and Kibana.

### 3. Backend Setup (NestJS)

```sh
cd restaurant-search-api
npm install
npm run start:dev
```

### 4. Frontend Setup (Next.js)

```sh
cd restaurant-search-ui
npm install
npm run dev
```

## Access Points

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Elasticsearch**: [http://localhost:9200](http://localhost:9200)
- **Kibana**: [http://localhost:5601](http://localhost:5601)

## Loading Test Data

### 1. Create Elasticsearch Index

```http
PUT http://localhost:9200/restaurants
Content-Type: application/json

{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "keyword": {
            "type": "keyword",
            "normalizer": "lowercase"
          }
        }
      },
      "cuisine": { "type": "text" },
      "location": { "type": "text" },
      "rating": { "type": "float" },
      "priceRange": { "type": "keyword" }
    }
  }
}
```

### 2. Add a Restaurant

```http
POST http://localhost:9200/restaurants/doc
Content-Type: application/json

{
  "name": "Kebapçı Mehmet Usta",
  "cuisine": "Turkish",
  "location": "Istanbul",
  "rating": 4.8,
  "priceRange": "$$"
}
```

### 3. Search for a Restaurant

```http
GET http://localhost:9200/restaurants/search
Content-Type: application/json

{
  "query": {
    "multi_match": {
      "query": "kebab",
      "fields": ["name", "cuisine", "location"],
      "fuzziness": "AUTO"
    }
  }
}
```

### 4. List All Restaurants

```http
GET http://localhost:9200/restaurants/search
Content-Type: application/json

{
  "query": {
    "match_all": {}
  }
}
```

### 5. Delete a Restaurant

```http
DELETE http://localhost:9200/restaurants/doc/RESTAURANT_ID
```

> **Note:** Replace `RESTAURANT_ID` with the actual ID of the restaurant you want to delete.

These examples demonstrate how to:

- **Create an index**
- **Add data**
- **Perform searches**
- **List all entries**
- **Delete an entry**

using Postman or any HTTP client.

## Features

- ✨ Real-time search
- 🔍 Fuzzy search support
- 📱 Responsive design
- 🚀 High performance
- 🎯 Easy to use

## Search Capabilities

- **Case-insensitive search**
- **Partial word matching**
- **Typo tolerance**
- **Multi-field search** (name, cuisine, location)

This project provides an infrastructure that simplifies restaurant discovery using modern search technologies. 🚀

