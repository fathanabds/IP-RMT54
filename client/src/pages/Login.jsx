import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import AccountForm from '../components/AccountForm';

export default function Login() {
  const navigate = useNavigate();

  async function handleSubmit(form) {
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
      <AccountForm onSubmit={handleSubmit} title={'Login'} />
      <p className="text-center my-3">
        Don&apos;t have an account?{' '}
        <Link className="text-decoration-none" to={'/register'}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
