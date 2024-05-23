import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Image from '../../../components/ELEMENTS/Image/Image'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
import SignupSuccess from '../SignupSuccess';
import Cookies from 'js-cookie'
import { useAuth } from '../../../hooks/AuthProvider'

const StudentSignup = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '05338353123',
        role: 'intern',
        CIN: '',
        passwordConfirm: '',
        otp: '',
        address: 'X',
        gendre: 'male'

    })
    // console.log(user)
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [signupSuccesfull, setSignupSuccesfull] = useState(false)
    const navigate = useNavigate('');

    // handle form fields change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // FUNCTION TO HANDLE FORM SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            user.firstName === '' || 
            user.lastName  === '' || 
            user.email === '' || 
            user.password  === '' ||
            user.CIN === '') {
                alert('please fill all form fields');
        }
        if(user.password === user.passwordConfirm){
            setPasswordMatch(true)
            setSignupSuccesfull(true)
            // !user.otp && submitOTP();
            if(user.otp !== '') {
                auth.registerAction(user)
                alert('Signup Success');
                navigate('/login')


                //navigate('/student/dashboard')
            
            }
        } 
        
    }

    const saveTokensToCookies = (accessToken, refreshToken) => {
        // Set cookies with a secure flag if your application uses HTTPS
        Cookies.set('access_token', accessToken, { expires: 7, secure: true });
        Cookies.set('refresh_token', refreshToken, { expires: 14, secure: true });
    };

    /*
    // FUNTION TO HANDLE OTP SUBMIT
    const submitOTP = () => {
        let url = `http://localhost:8080/v1/auth/send-code`
        fetch(url, {
            method: "POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify({email : user.email, userType: 'Student'})
        }).then((res) => {
            console.log('OTP Sent! ' + res);
        }).catch((e) => {
            console.log(e);
        })
    }
    */

    // const signupSuccessful = (bool) => {
    //     bool ? <SignupSuccess /> : <></>
    // } http://localhost:3000/v1/auth/signup

  return (
    <main className={styles.main}>
        <section>
            <Image 
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BH_BANK.png/600px-BH_BANK.png?20190723102945'}
                height={"80px"}
                width={"80px"}
                margin={"0.8rem auto 0.8rem auto"}
            />
            <HeaderTwo 
                text={"Create Account"} 
                color={'#103561'} 
                fontSize={'22px'} 
                margin={'0'}
            />
            <form className={styles.form}>
                <label htmlFor={'firstName'}>First Name:</label>
                <input type={'text'} name={'firstName'} value={user.firstName} onChange={handleChange} placeholder={'First Name'} className={styles.inp} />

                <label htmlFor={'lastName'}>Last Name:</label>
                <input type={'text'} name={'lastName'} value={user.lastName} onChange={handleChange} placeholder={'Last Name'} className={styles.inp} />

                <label htmlFor={'email'}>Email:</label>
                <input type={'email'} name={'email'} value={user.email} onChange={handleChange} placeholder={'Email'} className={styles.inp} />

                <label htmlFor={'CIN'}>CIN :</label>
                <input type={'text'} name={'CIN'} value={user.CIN} onChange={handleChange} placeholder={'20****69'} className={styles.inp} />

                <label htmlFor={'password'}>Password:</label>
                <input type={'password'} name={'password'} value={user.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />

                <label htmlFor={'passwordConfirm'}>Confirm Password:</label>
                <input type={'password'} name={'passwordConfirm'} value={user.passwordConfirm} onChange={handleChange} placeholder={'Confirm Password'} className={styles.inp} />
                { !passwordMatch && <Paragraph text={'*Passwords do not match'} fontSize={'12px'} fontWeight={'400'} color={'#ff1a2f'} margin={'0 0.5rem'} /> }

                {
                    signupSuccesfull &&
                    <>
                        <label htmlFor={'lastName'}>One-Time Password:</label>
                        <input 
                            type={'text'} 
                            name={'otp'} 
                            value={user.otp} 
                            onChange={e => setUser({...user, otp:e.target.value})} 
                            placeholder={'Enter OTP'} 
                            className={styles.inp} />
                    </>
                    
                }


                <input type='submit' value={'Sign up'} onClick={handleSubmit} onKeyDown={handleSubmit} className={styles.btn} />
            </form>
            <Paragraph text={'By creating an account, you are agreeing to our terms of service and privacy policy'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0.5rem auto'} />
            <Paragraph text={'Already have an account?'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0 auto 0.5rem auto'}  />
            <Link to={'/login'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginBottom: '2rem'}}>Sign in</Link>
        </section>
    </main>
  )
}

export default StudentSignup;
