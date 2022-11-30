
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

// Get top 4
const getTop4 = async (gender, setItems) => {
    try {
        const data = await appApi.get(
            routes.GET_TOP4(gender),
            routes.getTop4Body(gender)
        );
        console.log(data);
        setItems(data.data);
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(err.message);
        }
    }
};

export default getTop4;