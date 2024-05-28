import React, { useState } from 'react'
import styles from './styles.module.css'
import Button from '../../../components/ELEMENTS/Button/Button'
import Image from '../../../components/ELEMENTS/Image/Image'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Form from '../../../components/ELEMENTS/Form/Form'
import { Link, useNavigate } from 'react-router-dom'
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph'
import Cookies from 'js-cookie'
import { useAuth } from '../../../hooks/AuthProvider'


const StudentLogin = () => {
  const [userData, setUserData] = useState({email: '', password: ''})
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  //const navigate = useNavigate('');
  const auth = useAuth();


  const saveTokensToCookies = (accessToken, refreshToken) => {
    // Set cookies with a secure flag if your application uses HTTPS
    Cookies.set('access_token', accessToken, { expires: 7, secure: true });
    Cookies.set('refresh_token', refreshToken, { expires: 14, secure: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevValue => ({...prevValue, [name]:value}))
  }

  // FUNCTION TO HANDLE LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if(userData.email && userData.password){
      auth.loginAction(userData);
      // if error, setLoginSuccess to false
      setLoginSuccess(false);
      

      // fetch("http://localhost:8080/v1/auth/login", {
			// 		method: "POST",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify(userData),
			// 	})
			// 		.then((res) => {
      //       // saveTokensToCookies(res.accessToken,res.refreshToken);
			// 			console.log("Form Data Sent!", res);
			// 		})
			// 		.catch((error) => {
			// 			console.error(error.response.data);
			// 		});
      //navigate('/student/dashboard');

    }
  }

  return (
    <main className={styles.main}>
        <section>
            <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BH_BANK.png/600px-BH_BANK.png?20190723102945'}
                height={"100px"}
                width={"100px"}
                margin={"2rem auto 1rem auto"}
            />
            <HeaderTwo 
                text={"Login"} 
                color={'#103561'} 
                fontSize={'22px'} 
                margin={'0'}
            />
          <form className={styles.form}>
            <label htmlFor={'email'}>Email or Student ID:</label>
            <input type={'email'} name={'email'} value={userData.email} onChange={handleChange} placeholder={'Username or Email'} className={styles.inp} />

            <label htmlFor={'password'}>Password:</label>
            <input type={'password'} name={'password'} value={userData.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />
            {!loginSuccess && <Paragraph text={'*Wrong Email or Password'} fontSize={'12px'} fontWeight={'400'} color={'#ff1a2f'} margin={'0 0.5rem'} />}

            <input type='submit' value={'Login'} onClick={handleLogin} onKeyDown={handleLogin} className={styles.btn} />

            <div>
              <input type={'checkbox'} name='remember' className={styles.checkbox} />
              <label htmlFor={'remember'} className={styles.checkboxLabel}>Remember me</label>
            </div>

            <p>Don't have an account?</p>
            <Link to={'/signup'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginBottom: '2rem'}}>Sign in</Link>
            <p>Forget your password?</p>
            <Link to={'/forget-password'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginBottom: '2rem'}}>Reset now</Link>
          </form>  
        </section>
    </main>
  )
}

export default StudentLogin;
