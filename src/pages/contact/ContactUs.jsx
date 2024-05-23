import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from '../../components/ELEMENTS/Image/Image';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const navigate = useNavigate('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // API call to send contact us form data
    const sendContactUs = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    name: formData.name,
                    email: email,
                    subject: formData.subject,
                    message: formData.message,
                
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setMessage('Your message has been sent successfully.');
    sendContactUs(formData);
    // wait for 2 seconds and redirect to home page
    setTimeout(() => {
        navigate('/login');
    }, 2000);
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
          text={"Contact Us"} 
          color={'#103561'} 
          fontSize={'22px'} 
          margin={'0'}
        />
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={'name'}>Name:</label>
          <input 
            type={'text'} 
            name={'name'} 
            value={formData.name} 
            onChange={handleChange} 
            placeholder={'Enter your name'} 
            className={styles.inp} 
          />

          <label htmlFor={'email'}>Email:</label>
          <input 
            type={'email'} 
            name={'email'} 
            value={formData.email} 
            onChange={handleEmailChange} 
            placeholder={'Enter your email'} 
            className={styles.inp} 
          />

          <label htmlFor={'subject'}>Subject:</label>
          <input 
            type={'text'} 
            name={'subject'} 
            value={formData.subject} 
            onChange={handleChange} 
            placeholder={'Enter the subject'} 
            className={styles.inp} 
          />

          <label htmlFor={'message'}>Message:</label>
          <textarea 
            name={'message'} 
            value={formData.message} 
            onChange={handleChange} 
            placeholder={'Enter your message'} 
            className={styles.textarea}
          />

          {message && <Paragraph text={message} fontSize={'12px'} fontWeight={'400'} color={'#28a745'} margin={'0 0.5rem'} />}
          
          <input type='submit' value={'Send Message'} className={styles.btn} />
        </form>
      </section>
    </main>
  );
};

export default ContactUs;
