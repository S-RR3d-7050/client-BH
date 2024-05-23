import React, { useState } from 'react'
import styles from './styles.module.css';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import Image from '../../../components/ELEMENTS/Image/Image';
import { LuTrash } from "react-icons/lu";
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';

const SupervisorProfile = () => {

    const [t, i18n] = useTranslation('global');
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        companyName: ''
    })
    const [profUpdateSuccess, setProfUpdateSuccess] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }


    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setProfUpdateSuccess(prev => !prev);
    }

  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Supervisor'} />
        <SupeSidebar />
        <div className={styles.profileCont}>
            <div className={styles.profile}>
                <Header
                    text={'Ertugrul Suleyman Shah'}
                    color={'#103561'}
                    width={'100%'}
                    textAlign={'center'}
                    fontSize={'21px'} 
                    margin={'1rem 0'}
                />
                <HeaderTwo
                    text={'ertugrul@emu.edu.tr'}
                    color={'#103561'}
                    width={'100%'}
                    textAlign={'center'}
                    fontSize={'16px'} 
                    fontWeight={'500'}
                    margin={'0 0 1rem 0'}
                />
                <div className={styles.imgCont}>
                    <Image 
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzz0nwW80C5NM4wXwDvTpqYyV4RBG2h9Wfw&usqp=CAU'}
                        height={'150px'}
                        width={'150px'}
                        borderRadius={'50%'}
                        alt={'User Profile Avatar'}
                    />
                    <LuTrash className={styles.icon} />
                </div>
                <div className={styles.upload}>
                    Upload Photo
                </div>
                <div className={styles.warning}>
                    <Paragraph 
                        text={t('profile.imgWarning')}
                        fontSize={'16px'}
                        width={'90%'}
                        textAlign={'center'}
                        color={'#101110BF'}
                    
                    />
                </div>
            </div>
            <div className={styles.formCont}>
                <Header
                    text={t('profile.edit')}
                    color={'#103561'}
                    width={'100%'}
                    textAlign={'center'}
                    fontSize={'21px'} 
                    margin={'1rem 1rem'}
                />
                <form className={styles.form}>
                    <label htmlFor='fname'>{`${t('profile.fname')}:`}</label>
                    <input type='text' className={styles.inp} name='fname' value={data.fname} onChange={handleChange} placeholder={t('profile.fname')} />

                    <label htmlFor='lname'>{`${t('profile.lname')}:`}</label>
                    <input type='text' className={styles.inp} name='lname' value={data.lname} onChange={handleChange} placeholder={t('profile.lname')} />

                    <label htmlFor='email'>{`${t('profile.email')}:`}</label>
                    <input type='email' className={styles.inp} name='email' value={data.email} onChange={handleChange} placeholder={t('profile.email')} />

                    <label htmlFor='companyName'>{`${t('profile.companyName')}:`}</label>
                    <input type='text' className={styles.inp} name='companyName' value={data.companyName} onChange={handleChange} placeholder={t('profile.companyName')}/>

                    <input type='submit' onClick={handleProfileUpdate} value={t('profile.saveBtn')} className={styles.btn} />
                </form>
            </div>
        </div>
        {profUpdateSuccess && <ProfUpdateSuccessful />}
    </>
  )
}

export default SupervisorProfile;


const ProfUpdateSuccessful = () => {

    const [t, i18n] = useTranslation('global');

    return (
        <section className={styles.main}>
            <div className={styles.flex}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.318 17.0311C35.021 17.7341 35.021 18.8738 34.318 19.5767L22.9276 30.9671C22.2248 31.6699 21.0853 31.6701 20.3823 30.9674L14.6847 25.2722C13.9816 24.5694 13.9814 23.4297 14.6842 22.7266C15.387 22.0235 16.5267 22.0232 17.2298 22.726L21.6546 27.149L31.7724 17.0311C32.4754 16.3282 33.6151 16.3282 34.318 17.0311Z" fill="#406A98"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.88391 5.38391C9.88657 1.38124 16.0758 0 24.5 0C32.9242 0 39.1134 1.38124 43.1161 5.38391C47.1188 9.38657 48.5 15.5758 48.5 24C48.5 32.4242 47.1188 38.6134 43.1161 42.6161C39.1134 46.6188 32.9242 48 24.5 48C16.0758 48 9.88657 46.6188 5.88391 42.6161C1.88124 38.6134 0.5 32.4242 0.5 24C0.5 15.5758 1.88124 9.38657 5.88391 5.38391ZM8.42949 7.92949C5.49436 10.8646 4.1 15.7754 4.1 24C4.1 32.2246 5.49436 37.1354 8.42949 40.0705C11.3646 43.0056 16.2754 44.4 24.5 44.4C32.7246 44.4 37.6354 43.0056 40.5705 40.0705C43.5056 37.1354 44.9 32.2246 44.9 24C44.9 15.7754 43.5056 10.8646 40.5705 7.92949C37.6354 4.99436 32.7246 3.6 24.5 3.6C16.2754 3.6 11.3646 4.99436 8.42949 7.92949Z" fill="#406A98"/>
                </svg>
                <Paragraph 
                    text={t('profile.success')}
                    color={'#103561'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    textAlign={'center'}
                />
                <div className={styles.btnDiv}>
                    <button style={{background: '#103561', color: '#fff'}}>{t("confirmation.done")}</button>
                </div>
            </div>
        </section>
    )
}

