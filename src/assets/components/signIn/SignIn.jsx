import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import { Result } from "postcss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SignIn = () => {
  const [errorMessage,setErrorMessage] = useState('')
  const [result,setResult]= useState(false)
  const [showpassword,setShowPassword]= useState(false)
  const handleSignIn =(e)=>{
    e.preventDefault()
    const email= e.target.email.value
    const password= e.target.password.value
    const name= e.target.name.value
    const photo= e.target.photo.value
    const terms = e.target.terms.checked
    
    console.log(email,password,terms,name,photo)

    // checkboxs
    if(!terms){
      setErrorMessage('please accepted our terms and condition')
      return
    }
    // reset error and status
    setErrorMessage('')
    // success

    setResult(false)
    // password condition
if(password.length <6){
  setErrorMessage("password should be 6 character or longer")
  return
}
    // rejexs
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if(!regex.test(password)){
      setErrorMessage("at least 1 uppercase 1 lowercase 1 special character")
      return
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=> {
      console.log(result.user)
      setResult(true)
      sendEmailVerification(auth.currentUser)
      .then(()=>{
        console.log('email verification done')
      });
      // update profile name and photo
      const profile ={
        displayName : name,
        photoURL : photo
      }
      updateProfile(auth.currentUser,profile)
      .then(()=>{
        console.log('user profile updated')
      })
      .catch(error=> console.log('user profile update error')
      )
    })
    .catch((error)=>{
      setErrorMessage(error.message)
      setResult(false)
    })
  }

    return (
        <div onSubmit={handleSignIn} className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
         
          <h1 className="text-5xl font-bold">sign in</h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="name" name="name" placeholder="name" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="name" name="photo" placeholder="photo" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                 type= {showpassword ? "type":"password"}
                 name="password" 
                 placeholder="password" className="input input-bordered" required />
                <button onClick={()=> setShowPassword (!showpassword)} className="absolute right-8 mt-12"> 
                
                {
                  showpassword ?  <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                }
                 </button>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control justify-start">
  <label className="label cursor-pointer">
  <input type="checkbox" name="terms" defaultChecked className="" />
    <span className="label-text ml-2">Accept our terms and condition</span>
  
  </label>
</div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
              errorMessage && <p className="text-2xl bg-red-400">  {errorMessage}</p>
            }
            {
              result && <p className="text-green-400 2xl"> sign in successful</p>
            }
        <p> already have an account please <Link to='/login'> login</Link>  </p>
          </div>
        </div>
      </div>
    );
};

export default SignIn;