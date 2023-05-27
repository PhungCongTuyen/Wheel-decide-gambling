import React from "react"

const useAuth = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('auth');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken?.token
        }
        return null
    }

    const [token, setToken] = React.useState<string>(getToken())

    const saveToken = (userToken: any) => {
        sessionStorage.setItem('auth', JSON.stringify(userToken));
        setToken(userToken.token);
      };

    return {
        setToken: saveToken,
        token
    }
}

export default useAuth;