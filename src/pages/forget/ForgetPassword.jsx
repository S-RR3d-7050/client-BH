import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../components/ELEMENTS/Button/Button';
import Image from '../../components/ELEMENTS/Image/Image';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Forget password function API call
  const forgetPassword = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const handleForgetPassword = (e) => {
    e.preventDefault();
    // Simulate sending a password reset email
    setMessage('If this email is registered, a password reset link will be sent.');
    // Call the forget password API
    forgetPassword(email);

  };

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
          text={"Forget Password"} 
          color={'#103561'} 
          fontSize={'22px'} 
          margin={'0'}
        />
        <form className={styles.form}>
          <label htmlFor={'email'}>Email:</label>
          <input 
            type={'email'} 
            name={'email'} 
            value={email} 
            onChange={handleEmailChange} 
            placeholder={'Enter your email'} 
            className={styles.inp} 
          />
          {message && <Paragraph text={message} fontSize={'12px'} fontWeight={'400'} color={'#28a745'} margin={'0 0.5rem'} />}
          <input type='submit' value={'Submit'} onClick={handleForgetPassword} className={styles.btn} />
        </form>
        <Link to={'/login'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginTop: '2rem'}}>Back to Login</Link>
      </section>
    </main>
  );
};

export default ForgetPassword;
