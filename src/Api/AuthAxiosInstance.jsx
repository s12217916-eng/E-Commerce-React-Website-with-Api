import axios from "axios";

const token = localStorage.getItem("AccessToken");

const AuthAxiosInstance= axios.create({
    baseURL:'https://knowledgeshop.runasp.net/api/',
    headers:{"Accept-Language":"en",
    Authorization:`Bearer ${token}`
}

});

export default AuthAxiosInstance;