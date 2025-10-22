async function fetchData(url) {
    try {
        const response = await fetch(url,{
            method: "GET",
            headers: {
                "accept": "application/json",
                "x-api-key": apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}