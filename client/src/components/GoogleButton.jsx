import { useEffect } from 'react';
import axiosClient from '../helpers/axiosClient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function GoogleButton() {
  const navigate = useNavigate();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '1041935259391-66lr9ersirvl70806t9qlonv8nk4hlle.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', locale: 'en' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  async function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    try {
      const { data } = await axiosClient.post('/google-login', null, {
        headers: {
          token: response.credential,
        },
      });
      localStorage.setItem('access_token', `Bearer ${data.access_token}`);
      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  return <div className="mt-3" id="buttonDiv"></div>;
}
