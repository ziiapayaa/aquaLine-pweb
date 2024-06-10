import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname ||  "/products" ;
    const { auth, signInWithEmailAndPassword, user, setUser, error,} = useAuth();
    
    // useEffect(()=>{
        user.email && navigate(from , { replace:true })
        // eslint-disable-next-line
    // },[])

    const [loginError, setLoginError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processLogin(data.email, data.password);

    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                // localStorage.setItem()
                navigate(from, { replace: true })
                setLoginError('');
            })
            .catch(error => {
                swalAlert(error.message);
            });
    }

    const swalAlert = (error) => {
        if(error === 'Firebase: Error (auth/user-not-found).'){
            Swal.fire({
                icon: 'error',
                title: 'User not found',
                text: 'This user does not exist.',
            })
        }
        if(error === 'Firebase: Error (auth/wrong-password).'){
            Swal.fire({
                icon: 'error',
                title: 'Wrong password',
                text: 'The password you entered is incorrect.',
            })
        }
        if(error === 'Firebase: Error (auth/invalid-email).'){
            Swal.fire({
                icon: 'error',
                title: 'Invalid email',
                text: 'The email you entered is invalid.',
            })
        }
        if(error === 'Firebase: Error (auth/user-disabled).'){
            Swal.fire({
                icon: 'error',
                title: 'User disabled',
                text: 'This user has been disabled.',
            })
        }
        if(error === 'Firebase: Error (auth/account-exists-with-different-credential).'){
            Swal.fire({
                icon: 'error',
                title: 'Account exists',
                text: 'An account with this email already exists.',
            })
        }
    }

    error && swalAlert(error);

    return (
        <section className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className='fs-4 mt-5 text-center'>Sign In</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6 col-sm-8 mx-auto d-block">

                        <div className="form-group mt-2">
                            <label htmlFor='email' className='p-1'>Email</label>
                            <input type='text' className="form-control p-2" {...register("email", { required: true })} />
                            {errors.email && <span className='text-danger'>This field is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor='password' className='p-1'>Password</label>
                            <input type='password' className="form-control p-2"{...register("password", { required: true })} />
                            {errors.password && <span className='text-danger'>This field is required</span>}
                        </div>

                        <p><small className="form-text text-muted">We'll never share your information with anyone else.</small></p>
                        <p className='text-danger fw-bold'>{loginError.slice(10,37)}</p>


                        <input type="submit" className="btn btn-dark p-2 mt-2" value="Log In" />
                        
                        {/* <button onClick={resetPassword} className='btn btn-outline-dark p-2 ms-2'>Reset Password</button> */}

                        
                        <div className="mt-3">
                            <Link to='/register' className='text-black text-decoration-none'>Don't have an Account? <span className='text-primary text-decoration-underline'>Register as a new user</span></Link>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Login;