import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  //const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.data) {
        const x = res.data.user;
        setUser(x);
        // we need to save x as a json object
        //localStorage.setItem("user", JSON.stringify(x));
        setRole(res.data.user.role)
        console.log(res.data.user);
        //setUsername(res.data.username)
        //console.log(res.data.username);
        console.log(res.data);
        //console.log(res.token.access_token);
        setToken(res.data.accessToken);

        localStorage.setItem("site", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(x));
        localStorage.setItem("role", res.data.user.role);

        // Role based routing ( student, admin, encadrant)
        // Create a switch statement to route to the respective dashboard
         if (res.data.user.role === "intern") {
           navigate("/student/dashboard");
         } else if (res.data.user.role === "admin") {
           navigate("/coordinator/overview");
        } else if (res.data.user.role === "encadrant") {
           navigate("/supervisor/overview");
         }


       
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setRole("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    //navigate("/student/login");
  };

  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.data) {
      
        console.log('user Added');
        //navigate("/signup/successful");
        // update the localStorage user
        localStorage.setItem("user", JSON.stringify(res.data));
        
        return;
      }
      throw new Error(res.message);
      
    } catch (err) {
      console.error(err);
    }
  };


  const updateAction = async (id ,data) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.message) {
      
        console.log('user Updated');
        //update the localStorage user
        setUser(res.message);
        localStorage.setItem("user", JSON.stringify(res.message));

        //navigate("/student/dashboard");
        return;
      }
      throw new Error(res.message);
      
    } catch (err) {
      console.error(err);

    }
  };

  const updatePass = async (id ,data) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data }),
      });
      const res = await response.json();
      console.log(res);
      if (res.message) {
      
        console.log('user password Updated');
        //update the localStorage user
        setUser(res.message);
        localStorage.setItem("user", JSON.stringify(res.message));

        //navigate("/student/dashboard");
        return;
      }
      throw new Error(res.message);
      
    } catch (err) {
      console.error(err);

    }
  };

  return  <AuthContext.Provider value={{ token, user, loginAction, logOut, registerAction, role, updateAction, updatePass }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};