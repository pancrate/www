export interface StatusResponse {
  name: string;
  status: string;
  uptime: number;
  responseTime: number;
}

// Define defaultServices as a fallback
export const defaultServices: StatusResponse[] = [
  {
    name: "fallback service",
    status: "not-real",
    uptime: 0,
    responseTime: 0,
  },
];

export const fetchServiceStatus = async (): Promise<StatusResponse[]> => {
  try {
    const response = await fetch('https://change_later.com/api/status', );
    if (!response.ok) throw new Error('Failed to fetch status');
    const data = await response.json();

    // Map the API response to StatusResponse[]
    // Adjust this mapping based on your actual API response structure
    return data.services.map((service: StatusResponse) => ({
      name: service.name,
      status: service.status,
      uptime: service.uptime,
      responseTime: service.responseTime,
    })) as StatusResponse[];
  } catch (error) {
    console.error("Failed to fetch service status:", error);
    return defaultServices as StatusResponse[];
  }
};
