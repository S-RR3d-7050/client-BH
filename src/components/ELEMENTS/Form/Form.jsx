import React, { useState } from 'react'
import styles from './styles.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Form = ({ height, width, margin, padding }) => {

    const [userData, setUserData] = useState({email: '', password: ''})

    const fStyles = {
        height: height,
        width: width,
        margin: margin,
        padding: padding
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevValue => ({...prevValue, [name]:value}))
    }

  return (
    <form className={styles.main} style={fStyles}>
        <label htmlFor={'email'}>Email Address or Student Number:</label>
        <input type={'email'} name={'email'} value={userData.email} onChange={handleChange} placeholder={'Username or Email'} className={styles.inp} />

        <label htmlFor={'password'}>Password:</label>
        <input type={'password'} name={'password'} value={userData.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />

        <Button text={'Login'} fontSize={'16px'} color={'#fff'} backgroundColor={'#103561'} height={'40px'} width={'100%'} border={'0'} borderRadius={"18px"} margin={'0.5rem auto'} cursor={'pointer'} />

        <div>
            <input type={'checkbox'} name='remember' className={styles.checkbox} />
            <label htmlFor={'remember'} className={styles.checkboxLabel}>Remember me</label>
        </div>

        <p>Don't have an account?</p>
        <Link style={{textAlign: 'center', textDecoration: 'none', marginLeft: '7.5rem'}}>Create Account</Link>
    </form>
  )
}

export default Form;
