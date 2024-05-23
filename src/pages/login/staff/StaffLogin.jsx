import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from '../../../components/ELEMENTS/Image/Image'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import { Link } from 'react-router-dom'
import Button from '../../../components/ELEMENTS/Button/Button'

const StaffLogin = () => {

  const [userData, setUserData] = useState({email: '', password: ''})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevValue => ({...prevValue, [name]:value}))
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
          <label htmlFor={'email'}>Email:</label>
          <input type={'email'} name={'email'} value={userData.email} onChange={handleChange} placeholder={'Username or Email'} className={styles.inp} />

          <label htmlFor={'password'}>Password:</label>
          <input type={'password'} name={'password'} value={userData.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />

          <Button text={'Login'} fontSize={'16px'} color={'#fff'} backgroundColor={'#103561'} height={'40px'} width={'100%'} border={'0'} borderRadius={"18px"} margin={'0.5rem auto'} cursor={'pointer'} />

          <div>
            <input type={'checkbox'} name='remember' className={styles.checkbox} />
            <label htmlFor={'remember'} className={styles.checkboxLabel}>Remember me</label>
          </div>

          <p>Don't have an account?</p>
          <Link to={'/staff/signup'} style={{textAlign: 'center', textDecoration: 'none', marginLeft: '7rem'}}>Create Account</Link>
        </form>  
      </section> 
    </main>
  )
}


export default StaffLogin;