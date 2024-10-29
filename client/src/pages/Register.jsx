import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import GoogleButton from '../components/GoogleButton';

export default function Register() {
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
      await axiosClient.post('/register', form);
      navigate('/login');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return (
    <div className="my-5">
      <h3 className="text-center">
        Create Your <span className="text-primary">spoonazing</span> Account
      </h3>
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
          Register
        </button>
        <div className="d-flex justify-content-center">
          <GoogleButton />
        </div>
      </form>
      <p className="text-center my-3">
        You have an account?{' '}
        <Link className="text-decoration-none" to={'/login'}>
          Login now
        </Link>
      </p>
    </div>
  );
}
