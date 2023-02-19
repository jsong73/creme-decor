import { useMutation } from "@apollo/client";
import React, {useState} from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [ addUser, {error}] = useMutation(ADD_USER);
  
  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
    try{
      const { data } = await addUser({
        variables: {...formState},
      });
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error)
    }

    setFormState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    })
  };



  return (
    <div>
        <h1> Sign up </h1>
        
        <Link to="/">Or continue to login </Link>

          <form onSubmit={signupFormHandler}>

          <label> First name: </label>
              <input
               placeholder="Jane"
               name="firstName"
               type="firstName"
               value={formState.firstName}
               autoComplete="off"
               onChange={handleChange} />

            <label> Last name: </label>
              <input
               placeholder="Doe"
               name="lastName"
               type="lastName"
               value={formState.lastName}
               autoComplete="off"
               onChange={handleChange} />

            <label> Email: </label>
              <input
               placeholder="janedoe@email.com"
               name="email"
               type="email"
               value={formState.email}
               autoComplete="off"
               onChange={handleChange} />

            <label> Password: </label>
              <input
               placeholder="*****"
               name="password"
               type="password"
               autoComplete="off"
               value={formState.password}
               onChange={handleChange} />

              
            {error ? (
              <div> {error.message} </div>
            ) : null}
            <button type="submit"> Submit </button>

          </form>
    </div>
  );
};

export default Signup;
