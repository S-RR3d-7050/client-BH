import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from '../../../components/ELEMENTS/Image/Image'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const StaffSignup = () => {
    const [user, setUser] = useState({
        userType: 'Coordinator',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '05338353123',
        passwordConfirmation: '',
        otp: '',
        departmentId: 1
    })

    const navigate = useNavigate();
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [signupSuccesfull, setSignupSuccesfull] = useState(false);




    // handle form fields change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // FUNTION TO HANDLE OTP SUBMIT
    const submitOTP = () => {
        let url = `http://localhost:8080/v1/auth/send-code`
        fetch(url, {
            method: "POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify({email : user.email, userType: 'Coordinator'})
        }).then((res) => {
            setSignupSuccesfull(true)
            console.log('OTP Sent! ' + res);
        }).catch((e) => {
            console.log(e);
        })
    }

    const saveTokensToCookies = (accessToken, refreshToken) => {
    // Set cookies with a secure flag if your application uses HTTPS
    Cookies.set('access_token', accessToken, { expires: 7, secure: true });
    Cookies.set('refresh_token', refreshToken, { expires: 14, secure: true });
    };



    const handleSignup = (e) => {
        e.preventDefault();
        if (user.firstname === '' || user.lastname  === '' || user.email === '' || user.password  === ''){
                alert('please fill all form fields');
        }
        !user.otp && submitOTP();
        if(user.password === user.passwordConfirmation){
            setPasswordMatch(true);
            if(user.otp) {
                fetch("http://localhost:8080/v1/auth/signup-coordinator-init", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(user),
				})
					.then((res) => {
                        setSignupSuccesfull(true);
                        navigate('/coordinator/dashboard')
                        saveTokensToCookies(res.accessToken,res.refreshToken);
						console.log("Form Data Sent!", res);
					})
					.catch((error) => {
						console.error(error.response.data);
					});
            console.log('Signup Successful');

        } 
    }
}
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
                <label htmlFor={'firstname'}>First Name:</label>
                <input type={'text'} name={'firstname'} value={user.firstname} onChange={handleChange} placeholder={'First Name'} className={styles.inp} />

                <label htmlFor={'lastname'}>Last Name:</label>
                <input type={'text'} name={'lastname'} value={user.lastname} onChange={handleChange} placeholder={'Last Name'} className={styles.inp} />

                <label htmlFor={'email'}>Email:</label>
                <input type={'email'} name={'email'} value={user.email} onChange={handleChange} placeholder={'Email'} className={styles.inp} />

                <label htmlFor={'password'}>Password:</label>
                <input type={'password'} name={'password'} value={user.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />

                <label htmlFor={'passwordConfirmation'}>Confirm Password:</label>
                <input type={'password'} name={'passwordConfirmation'} value={user.passwordConfirmation} onChange={handleChange} placeholder={'Confirm Password'} className={styles.inp} />
                { !passwordMatch && <Paragraph text={'*Passwords do not match'} fontSize={'12px'} fontWeight={'400'} color={'#ff1a2f'} margin={'0 0.5rem'} /> }

                {
                    signupSuccesfull &&
                    <>
                        <label htmlFor={'otp'}>One-Time Password:</label>
                        <input 
                            type={'text'} 
                            name={'otp'} 
                            value={user.otp} 
                            onChange={e => setUser({...user, otp:e.target.value})} 
                            placeholder={'Enter OTP'} 
                            className={styles.inp} />
                    </>
                    
                }

                <input type='submit' value={'Sign up'} onClick={handleSignup} onKeyDown={handleSignup} className={styles.btn} />
            </form>
            <Paragraph text={'By creating an account, you are agreeing to our terms of service and privacy policy'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0.5rem auto'} />
            <Paragraph text={'Already have an account?'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0 auto 0.5rem auto'}  />
            <Link to={'/staff/login'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginBottom: '2rem'}}>Sign in</Link>
        </section>
    </main>
  )
}


export default StaffSignup;
