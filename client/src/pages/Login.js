import React, {useState} from "react";
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../utils/mutations"
import Auth from "../utils/auth"

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, {error, data}] = useMutation(LOGIN_USER);

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
    <div>
        <h1> Log in </h1>

          <form onSubmit={loginFormHandler}>
            <label> Email: </label>
              <input
               placeholder="Email"
               name="email"
               type="email"
               value={formState.email}
               onChange={handleChange} />

            <label> Password: </label>
              <input
               placeholder="Password"
               name="password"
               type="password"
               value={formState.password}
               onChange={handleChange} />

              
            {error ? (
              <div> Credentials are invalid. </div>
            ) : null}
            <button type="submit"> Submit </button>

          </form>
    </div>
  );
};

export default Login;
