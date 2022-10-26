import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(username);
  //   console.log(password);
  // }, [username, password]);

  const getUsers = async () => {
    try {
      await axios.get(baseUrl + '/get-all-users').then((response) => {
        console.log(response);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const getOwnData = async () => {
    const verification = await axios.post(baseUrl + '/auth/verify-jwt', {
      accessToken: localStorage.getItem('accessToken'),
    });

    console.log('starting getOwnData');

    if (verification.status === 200) {
      try {
        await axios.get(baseUrl + '/get-own-data').then((response) => {
          console.log(response);
        });
      } catch (e) {
        console.log(e.response);
      }
    } else {
      console.log(
        'could not verify JWT [also, fix this part, say correct message]'
      );
    }
  };

  const deleteAll = async () => {
    try {
      const response = await axios
        .delete(baseUrl + '/delete-all-users')
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const login = async () => {
    document.getElementById('error-message').innerHTML = '';

    console.log('login button clicked');
    try {
      const response = await axios.post(baseUrl + '/users/login', {
        username: username,
        password: password,
      });
      console.log('sent login credentials', username, password);
      console.log(response, 'the response from endpoint');

      console.log(response.data.accessToken, 'hello world');
      localStorage.setItem('accessToken', response.data.accessToken);

      if (response.status === 200) {
        navigate('/test');
      }
    } catch (e) {
      if (e.response.status === 401) {
        document.getElementById('error-message').innerHTML =
          'Incorrect username or password!';
      }
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <form>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <br />
        <button type='button' onClick={login}>
          Login
        </button>
      </form>

      <br />
      <br />
      <div id='error-message'></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button type='button' onClick={getOwnData}>
        Test-get-own-data
      </button>
      <br />
      <br />
      <button type='button' onClick={getUsers}>
        Test-get-all-Users
      </button>
      <br />
      <br />
      <button type='button' onClick={deleteAll}>
        Test-deleteAll
      </button>
    </div>
  );
};

export default Home;
