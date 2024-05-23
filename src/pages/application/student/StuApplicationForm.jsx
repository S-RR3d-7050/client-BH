import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { BsDownload } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';
import { useTranslation } from 'react-i18next';
// import insurance from '../../../assets/SocialInsuranceForm.docx';
import { useParams, useNavigate } from 'react-router-dom';

const StuApplicationForm = () => {


    const id = useParams();
    const [t, i18n] = useTranslation('global');
    const navigate = useNavigate();
    const [applicationStatus, setApplicationStatus] = useState(false)
    const [internshipData, setInternshipData] = useState({})
    const [doc, setDoc] = useState('')
    const [userData, setUserData] = useState({
        CIN: '',
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        type: ''
    })
    const url = 'http://localhost:8000/'

    let user = localStorage.getItem('user');
  //console.log(user);
    user = JSON.parse(user);
    const [cv, setCv] = useState('');
    //const [cover, setCover] = useState('');
    const formData = new FormData();



    //const [userDetails, setUserDetails] = useState(user);

    
    //const fullName = user.firstName + ' ' + user.lastName;

    console.log(id);
    // console.log(userData)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cv === '') {
            alert('Please upload your CV and Cover Letter')
            return
        }
        try{
            const appId = await Apply();
            formData.append('document', cv, cv.name);
            const url = `http://localhost:5000/api/v1/demandes-de-stage/${appId}/documents`;
            await fetch(url, {
                method: 'POST',
                body: formData
            });

            /*
            formData.append('document', cover, cover.name);
            const url2 = `http://localhost:5000/api/v1/demandes-de-stage/${appId}/documents`;
            await fetch(url2, {
                method: 'POST',
                body: formData
            });
            */
            setTimeout(() => {
                navigate('/student/internships')
            }, 5000);
            
        } catch (error) {
            console.log(error)
        }
        
        setApplicationStatus(prev => !prev)
    }

    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
        console.log(cv);
    };


    const extractFileName = (filePath) => {
        if (typeof filePath === 'string') {
            // Use a regular expression to replace the 'public\\uploads\\' part
            return filePath.replace(/^public\\uploads\\/, '');
        } else {
            console.log('Path : ',filePath);
            throw new TypeError('The provided filePath is not a string');
        }
    };
    
    /*
    const handleCoverFileChange = (e) => {
        setCover(e.target.files[0]);
        console.log(cover);
    }
    */




    const Apply = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    type: userData.type,
                    sujetDeStage: id.id,
                    stagiaire: user.id
                }
            )
        })
        const data = await response.json()
        //console.log(data)
        return data.message.id;
    }



    const fetchIntershipData = async () => {
        //console.log(id.id);
        const response = await fetch(`http://localhost:5000/api/v1/sujets-de-stage/${id.id}`)
        const data = await response.json()
        console.log(data.message)
        setInternshipData(data.message)
        console.log('Doc : ',data.message.document.chemin);
        setDoc(data.message.document.chemin)
    }

    useEffect(() => {
        fetchIntershipData()
    }
    , [])

        
    useEffect(() => {
        setUserData({
            CIN: user.CIN,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            email: user.email,
            type: 'STAGE_PFE'
        })
    }
    , [])



  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'}/>
        <SideBar />
        <section className={styles.appCont}>
            <Header
                text={'Application Form'}
                color={'#003679'}
                fontSize={'28px'}
                margin={'1.5rem 2rem'}
            />
            <div className={styles.formCont}>
                    <form className={styles.form}>
                        <HeaderTwo 
                            text={t('application.stuInfo')}
                            color={'#003679'}
                            fontSize={'20px'}
                            margin={'1rem 1.5rem'}
                        />

                        <label htmlFor='stdNo'>{t('CIN/Passport')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input text={'text'} name={'stdNo'} value={userData.CIN} onChange={handleChange} placeholder={t('profile.stdNo')} />

                        <label htmlFor='fname'>{t('profile.fname')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input text={'text'} name={'fname'} value={userData.firstName} onChange={handleChange} placeholder={t('profile.fname')} />

                        <label htmlFor='lname'>{t('profile.lname')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input text={'text'} name={'lname'} value={userData.lastName} onChange={handleChange} placeholder={t('profile.lname')} />

                        <label htmlFor='email'>{t('profile.email')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input text={'email'} name={'email'} value={userData.email} onChange={handleChange} placeholder={t('profile.email')} />

                        <label htmlFor='mobile'>{t('application.tel')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input text={'text'} name={'mobile'} value={userData.mobile} onChange={handleChange} placeholder={t('application.tel')} />

                        {/* FIX DURATION */}
                        <label htmlFor='duration'>{t('Type')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <select name='duration' id='duration' onChange={handleChange}>
                            <option value={userData.type}>STAGE_PFE</option>
                            <option value={userData.type}>STAGE_ETE</option>
                        </select>

                        <button onClick={handleSubmit}>{t('application.submit')}</button>
                    </form>
                    <div className={styles.info}>
                        <div className={styles.details}>
                            <HeaderTwo 
                                text={t('internships.intInfo')}
                                color={'#003679'}
                                fontSize={'20px'}
                                margin={'1rem 1.5rem'}
                            />

                            <div>
                                <h3>{t('internships.company')}</h3>
                                <p>BH Bank</p>
                            </div>
                            <div>
                                <h3>{t('Internships.name')}</h3>
                                <p>{internshipData.intitule}</p>
                            </div>
                            <div>
                                <h3>{t('Domaine')}</h3>
                                <p>{internshipData.domaine}</p>
                            </div>
                            <div>
                                <h3>{t('internships.desc')}</h3>
                                <p>{internshipData.description}</p>
                            </div>
                            <div className={styles.downloadBtn}>
                            {
                                
                                <a href={url+extractFileName(doc)} download target='_blank'>
                                    <button><BsDownload />{t('internships.download')}</button>
                                </a>
                                
                            }
                               
                            </div>

                        </div>
                        <div className={styles.trnc}>-
                            <HeaderTwo 
                                text={t('application.For')}
                                color={'#003679'}
                                fontSize={'20px'}
                                margin={'1rem 1.5rem'}
                            />
                            <Paragraph 
                                text={t('application.trncStu')}
                                color={'#101110BF'}
                                width={'80%'}
                                margin={'0 1.5rem'}
                                fontSize={'16px'}
                                fontWeight={'700'}
                                lineHeight={'20px'}
                            />
                            <div className={styles.upload}>
                                <input type='file' name='cv' onChange={handleFileChange}  />
                            </div>
                            {
                                /*
                            <div className={styles.upload}>
                                <input type='file' name='cover' onChange={handleCoverFileChange}  />
                            </div> 
                                */
                            }

                        </div>
                    </div>
                </div>
        </section>
        {applicationStatus && <ApplicationSuccessful />}
    </>
  )
}


export default StuApplicationForm;


const ApplicationSuccessful = () => {
    const [t, i18n] = useTranslation('global')

    return (
        <section className={styles.conf}>
            <div className={styles.confFlex}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.318 17.0311C35.021 17.7341 35.021 18.8738 34.318 19.5767L22.9276 30.9671C22.2248 31.6699 21.0853 31.6701 20.3823 30.9674L14.6847 25.2722C13.9816 24.5694 13.9814 23.4297 14.6842 22.7266C15.387 22.0235 16.5267 22.0232 17.2298 22.726L21.6546 27.149L31.7724 17.0311C32.4754 16.3282 33.6151 16.3282 34.318 17.0311Z" fill="#406A98"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.88391 5.38391C9.88657 1.38124 16.0758 0 24.5 0C32.9242 0 39.1134 1.38124 43.1161 5.38391C47.1188 9.38657 48.5 15.5758 48.5 24C48.5 32.4242 47.1188 38.6134 43.1161 42.6161C39.1134 46.6188 32.9242 48 24.5 48C16.0758 48 9.88657 46.6188 5.88391 42.6161C1.88124 38.6134 0.5 32.4242 0.5 24C0.5 15.5758 1.88124 9.38657 5.88391 5.38391ZM8.42949 7.92949C5.49436 10.8646 4.1 15.7754 4.1 24C4.1 32.2246 5.49436 37.1354 8.42949 40.0705C11.3646 43.0056 16.2754 44.4 24.5 44.4C32.7246 44.4 37.6354 43.0056 40.5705 40.0705C43.5056 37.1354 44.9 32.2246 44.9 24C44.9 15.7754 43.5056 10.8646 40.5705 7.92949C37.6354 4.99436 32.7246 3.6 24.5 3.6C16.2754 3.6 11.3646 4.99436 8.42949 7.92949Z" fill="#406A98"/>
                </svg>
                <Paragraph 
                    text={t('confirmation.AppSuccess')}
                    color={'#103561'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    textAlign={'center'}
                />
                <div className={styles.btnCont}>
                    <button style={{background: '#103561', color: '#fff'}}>{t("confirmation.done")}</button>
                </div>
            </div>
        </section>
    )
}
