import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../components/ELEMENTS/Button/Button';
import Image from '../../components/ELEMENTS/Image/Image';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';
import { useParams, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Reset password function API call
  const ResetPassword = async (token, password) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/auth/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password : password, token : token})
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }


  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
    } else {
      // Simulate resetting the password
      setMessage('Password has been reset successfully.');
      ResetPassword(token, password);
      // Redirect to the login page after 2 seconds
       setTimeout(() => {
         navigate('/login');
       }, 2000);
      // history.push('/login');
    }
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
          text={"Reset Password"} 
          color={'#103561'} 
          fontSize={'22px'} 
          margin={'0'}
        />
        <form className={styles.form}>
          <label htmlFor={'password'}>New Password:</label>
          <input 
            type={'password'} 
            name={'password'} 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder={'Enter new password'} 
            className={styles.inp} 
          />
          <label htmlFor={'confirmPassword'}>Confirm Password:</label>
          <input 
            type={'password'} 
            name={'confirmPassword'} 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            placeholder={'Confirm new password'} 
            className={styles.inp} 
          />
          {message && <Paragraph text={message} fontSize={'12px'} fontWeight={'400'} color={password === confirmPassword ? '#28a745' : '#ff1a2f'} margin={'0 0.5rem'} />}
          <input type='submit' value={'Reset Password'} onClick={handleResetPassword} className={styles.btn} />
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
