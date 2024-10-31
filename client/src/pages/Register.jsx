import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';
import AccountForm from '../components/AccountForm';

export default function Register() {
  const navigate = useNavigate();

  async function handleSubmit(form) {
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
        Create Your <span className="text-primary">Spoonazing</span> Account
      </h3>
      <AccountForm onSubmit={handleSubmit} title={'Register'} />
      <p className="text-center my-3">
        You have an account?{' '}
        <Link className="text-decoration-none" to={'/login'}>
          Login now
        </Link>
      </p>
    </div>
  );
}
