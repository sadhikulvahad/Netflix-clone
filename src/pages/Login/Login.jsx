import { useState } from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Login() {

  const [sign, setSign] = useState('Sign In')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const user_auth = async (event) =>{
    event.preventDefault()
    setLoading(true)
    if(sign ==="Sign In"){
      await login(email, password)
    }else{
      console.log('asdfg')
      await signUp(name, email, password)
    }
    setLoading(false)
  }


  return (
    loading?
    <div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={Logo} alt="" className='login-logo' />
      <div className='login-form'>
        <h1>{sign}</h1>
        <form action="">
          {sign === "Sign Up" ?
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Your Name' />
            : <></>}
          <input type="emial" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Your Email' />
          <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Your Password' />
          <button onClick={user_auth} type='submit'>{sign}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {sign === "Sign In" ?
            <p>New to Netflix <span onClick={() => { setSign("Sign Up") }}>Sign Up Now</span></p> :
            <p>Already have an Account <span onClick={() => { setSign("Sign In") }}>Sign In Now</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
