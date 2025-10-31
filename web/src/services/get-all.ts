export default async function getAll(endpoint: string) {
  try {
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
