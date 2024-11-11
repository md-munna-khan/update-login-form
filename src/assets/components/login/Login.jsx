import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [success,setSuccess]= useState(false)
    const [loginError,setLoginError]= useState('')
    const emailRef =  useRef()



 
    const handleLogin= (e)=>{
      
        e.preventDefault()
       const email = e.target.email.value;
       const password = e.target.password.value
       console.log(email,password)


          // bt default reset
    setSuccess(false)
    setLoginError('')

      signInWithEmailAndPassword(auth,email,password)
       .then((result)=> {
        console.log(result.user)

        if(!result.user.emailVerified){
          setLoginError('please verified your email address')
        }else{
          setSuccess(true)
        }
        
       })
       .catch((error)=>{ 
        console.log( 'Error' ,error.message)

        setLoginError(error.message)
       });


    }



    const  handleForgetPassword=()=>{
      console.log("handle forget password",emailRef.current.value)
      const email = emailRef.current.value
      if(!email){
        console.log("please provide a valid email address")
      } else{
sendPasswordResetEmail(auth,email)
.then(()=>{
alert(' password reset email sent please check your email ')
})
      }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
         
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email"  ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            {
                success && <p className="text-green-500"> successfully sign in</p>
            }
            {
                loginError && <p className="text-red-500"> {loginError} </p>
            }
            <p>new to visit website pease sign <Link to='/signIn'> sign up</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;