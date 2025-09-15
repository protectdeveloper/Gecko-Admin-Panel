import LoginForm from '@/features/Login/Form/LoginForm';

const LoginPage = () => {
  return (
    <div className={'flex flex-col gap-6'}>
      <LoginForm />

      <div className="text-white *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to the Gecko Admin Panel <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginPage;
