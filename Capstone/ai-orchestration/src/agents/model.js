import https from "https";
import axios from "axios";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

try {
    const response = await axios.get(
        "https://01a1079a-3ed7-7192-a45d-97812e91b9e3.agent.localhost/list-files",
        {
            httpsAgent,
        }
    );

    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);
} catch (error) {
    console.log("MESSAGE:", error.message);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
}