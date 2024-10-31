/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import GoogleButton from './GoogleButton';

export default function AccountForm({ onSubmit, title }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input {...register('email')} type="text" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input {...register('password')} type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {title}
      </button>
      <div className="d-flex justify-content-center">
        <GoogleButton />
      </div>
    </form>
  );
}
