import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  function handleInput(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post('/login', form);
      localStorage.setItem('access_token', `Bearer ${data.access_token}`);
      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return (
    <div className="my-5">
      <h3 className="text-center">Login to Your Account</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input onChange={handleInput} name="email" type="text" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input onChange={handleInput} name="password" type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="d-flex justify-content-center">
          <GoogleButton />
        </div>
      </form>
      <p className="text-center my-3">
        Don&apos;t have an account?{' '}
        <Link className="text-decoration-none" to={'/register'}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
