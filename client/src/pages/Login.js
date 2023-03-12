import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, {error}] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const loginFormHandler = async (event) => {
    event.preventDefault();
    try{
      const { data } = await login({
        variables: {...formState}
      });
      console.log(data)
      Auth.login(data.login.token);
    } catch (error) {
      console.log(error);
    }

    setFormState({
      email: "",
      password: "",
    });
  };


  return (
    <div className="justify-center text-center ">
        <Link to="/">  <h1 id="home-name" className="mt-3 text-6xl drop-shadow-2xl"> Créme Decor. </h1> </Link>
            
            <h1  
            className="mt-4"
            id="credentials"> Log in 
            </h1>
        
            <Link id="link" className="underline" to="/signup">Or continue to signup</Link>

            <form 
              id="credentials"
              className="mt-10"
              onSubmit={loginFormHandler}>

            <label> Email </label>
              <input
              className="border-b-2"
               placeholder="Email"
               name="email"
               type="email"
               value={formState.email}
               autoComplete="off"
               onChange={handleChange} />

              <p className="mt-4">
              <label> Password </label>
              <input
              className="border-b-2"
               placeholder="*****"
               name="password"
               type="password"
               value={formState.password}
               autoComplete="off"
               onChange={handleChange} />
               </p>

              
            {error ? (
              <div> {error.message} </div>
            ) : null}
            <button className="mt-4" type="submit"> Submit </button>

          </form>
    </div>
  );
};

export default Login;
