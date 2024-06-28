---
id: OrdersService
version: 0.0.2
name: Orders Service
summary: |
  Service that handles orders
owners:
    - dboyne
receives:
  - id: InventoryAdjusted
    version: 0.0.3
sends:
  - id: AddInventory  
    version: 0.0.3
repository:
  language: JavaScript
  url: https://github.com/boyney123/pretend-shipping-service
schemaPath: "openapi.yml"
---

<OpenAPI />

## Why this service was created?

Event based service that allows you to create shipments, prepare them and dispatch them. This service handles the `Shipment` domain.

## Who owns this service?

This service will also generate Async events for downstream services.

<NodeGraph />