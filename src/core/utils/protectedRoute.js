import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../modules/auth/slice/userSlice";
import { httpMethod, apiRoute } from "../constants/constants";
import { api as axios } from "./interceptor";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [count, setCount ] = React.useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.userSlice.token);

    React.useEffect(() => {
        // get user details
        let getUser = async() => {
            try {
                const res = await axios({
                    method: httpMethod.get,
                    url: apiRoute.user,
                    headers: {Authorization: `Bearer ${token}`},
                });
                setCount(1);
                dispatch(setUserDetails({user: res.data.data.user}));
            } catch (error) {
                navigate('/login');
                setCount(0);
            }
        }
        if (!count) {
            getUser();
        }
    }, [token, dispatch, navigate, count])
    return children;
};

export default ProtectedRoute;