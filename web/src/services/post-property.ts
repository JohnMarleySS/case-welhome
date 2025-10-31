interface PropertyData {
  title: string;
  address: string;
  status: "active" | "inactive";
}

export default async function postProperty(
  endpoint: string,
  data: PropertyData
) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }

    return { success: true };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
