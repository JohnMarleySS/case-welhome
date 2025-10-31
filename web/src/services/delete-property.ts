export default async function deleteProperty(endpoint: string) {
    try {
        const res = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error deleting property:", error);
        throw error;
    }
}
