import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import Header from '../../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';
import { useNavigate } from 'react-router-dom';
// import * as fs from 'fs' 

const AddInternship = () => {

    const [t, i18n] = useTranslation("global");
    const navigate = useNavigate();

    const [internshipData, setInternshipData] = useState({
        intitule: '',
        description: '',
        domaine: '',
        image: ''
    });

    const [fileSujet, setFileSujet] = useState('');
    const formData = new FormData();

    // FUNCTION TO HANDLE FORM INPUT STATE CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInternshipData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    // HANDLE FILE CHANGE
    const handleFileChange = (e) => {
        setFileSujet(e.target.files[0]);
    };

    const AddInternship = async () => {
        const url = 'http://localhost:5000/api/v1/sujets-de-stage/';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(internshipData)
        });
        const data = await response.json();
        console.log(data.message);
        return data.message.id;
    };

    // FUNCTION TO HANDLE FORM SUBMIT
    const handleLogSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = await AddInternship(); // Wait for the id to be returned
            console.log(id);

            // Then we get the id of the created internship and add the file to it
            formData.append('document', fileSujet, fileSujet.name);
            const url = `http://localhost:5000/api/v1/sujets-de-stage/${id}/documents`;
            await fetch(url, {
                method: 'POST',
                body: formData
            });
            // if all goes well, we redirect to the internships page
            // wait 5 seconds before redirecting
            setTimeout(() => {
                navigate('/coordinator/view-all-internships')
            }, 5000);
            

        } catch (error) {
            console.error('Error:', error);
        }
    };


  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <CoodSidebar />
        <main className={styles.addCont}>
            <Header text={t('internships.intInfo')} fontSize={'28px'} color={'#103561'} margin={'1rem 2rem'} />
            <section className={styles.addContMain}>
                <div className={styles.formCont}>
                    <form className={styles.form}>
                        <label htmlFor='intitule'>{`${t('profile.name')}:`}</label>
                        <input type='text' name='intitule' value={internshipData.intitule} onChange={handleInputChange}  />

                        <label htmlFor='domaine'>{t('internships.do')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <select name='domaine' id='domaine' onChange={handleInputChange}>
                            <option value={internshipData.type}>OBSERVATION</option>
                            <option value={internshipData.type}>OPERATIONNEL</option>
                            <option value={internshipData.type}>PROJET</option>
                            <option value={internshipData.type}>RECHERCHE</option>
                            <option value={internshipData.type}>FINANCE</option>
                            <option value={internshipData.type}>MARKETING</option>

                        </select>

                        <label htmlFor='image'>{t('internships.img')} <span style={{color: '#ff1a2f'}}>*</span></label>
                        <input type='text' name='image' onChange={handleInputChange}  />

                        <label htmlFor='description'>{`${t('logbook.description')}:`}</label>
                        <textarea name='description' value={internshipData.description} onChange={handleInputChange} placeholder={'Description of internship done'} rows='20' />

                        <label htmlFor='fileSujet'>{`${t('sidebar.docs')}:`}</label>
                        <input type='file' name='fileSujet' onChange={handleFileChange}  />

                        <button onClick={handleLogSubmit}>{t('main.add') + ' '+ t('internships.in')}</button>
                    </form>
                </div>
                <div className={styles.calendar}>
                    <div>

                    </div>
                </div>
            </section>
        </main>
    </>
  )
}

export default AddInternship;  
