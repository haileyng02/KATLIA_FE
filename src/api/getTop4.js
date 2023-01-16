import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { getTop4Data } from "../actions/featured";

// Get top 4
const getTop4 = async (gender, setItems,dispatch) => {
    try {
        const data = await appApi.get(
            routes.GET_TOP4(gender),
            routes.getTop4Body(gender)
        );
        console.log(data);
        setItems(data.data);
        dispatch(getTop4Data(data.data,gender));
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