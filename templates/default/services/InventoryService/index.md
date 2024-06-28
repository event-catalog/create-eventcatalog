---
id: InventoryService
version: 0.0.2
name: Inventory Service
summary: |
  Service that handles the inventory
owners:
    - dboyne
    - full-stack
    - mobile-devs
receives:
  - id: OrderConfirmed
    version: 0.0.1
  - id: OrderCancelled
    version: 0.0.1
  - id: OrderAmended
    version: 0.0.1
  - id: UpdateInventory
    version: 0.0.3
sends:
  - id: InventoryAdjusted
    version: 0.0.3
  - id: OutOfStock
    version: 0.0.3
repository:
  language: JavaScript
  url: https://github.com/boyney123/pretend-shipping-service
---

This is the inventory service, part of the core domain of the architecture.

### EDA Architecture overview

<NodeGraph title="Hello world" />