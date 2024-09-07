import axios from 'axios';

interface EventMetadata {
  command: string;
  org: string;
  id: string;
}

async function raiseEvent(eventData: EventMetadata): Promise<void> {
  const url = "https://queue.simpleanalyticscdn.com/events";
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = {
    type: "event",
    hostname: "eventcatalog.dev",
    event: "@eventcatalog/create-eventcatalog",
    metadata: eventData,
    timestamp: new Date().toISOString(),
  };

  try {
    await axios.post(url, payload, { headers });
    console.log("Event successfully sent");
  } catch (error) {
    console.log("Error sending event:", error);
  }
}

// Export the function so it can be used in other parts of the application
export { raiseEvent };
