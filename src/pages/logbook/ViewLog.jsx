import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import confstyles from './confstyles.module.css'
import { CiTrash } from "react-icons/ci";
import { MdOutlineModeEditOutline, MdOutlineFileDownload } from "react-icons/md";
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../components/ELEMENTS/Nav/SideBar';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph';
import Header from '../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';



const ViewLog = () => {

    const { id } = useParams();
    const [t, i18n] = useTranslation('global');
    const [editLog, setEditLog] = useState(false);
    const [deleteLog, setDeleteLog] = useState(false);
    const [logs, setLogs] = useState([]); // [{}
    const location = useLocation();

    console.log(location.state);
    console.log(id)

    const getTask = async (id) => {
        const url = `http://localhost:5000/api/v1/tasks/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.message);
        setLogs(data.message);
    }

    const extractDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };
    

    // FUNCTION TO HANDLE EDIT LOG BUTTON CLICK
    const handleEditLog = () => {
        setEditLog(prev => !prev)
    }

    // FUNCTION TO HANDLE DELETE LOG
    const handleDeleteLog = () => {
        setDeleteLog(prev => !prev)
    }


    useEffect(() => {
        getTask(id);
    }
    , []);

  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <div className={styles.view}>
            <div className={styles.viewOne}>
                <div className={styles.left}>
                    <HeaderTwo 
                        text={`Day ${logs.id}`} 
                        color={'#103561'} 
                        fontSize={'18px'} 
                        fontWeight={'500'}
                    />
                    <Paragraph 
                        text={extractDate(logs.createdAt)}
                        color={'#103561'} 
                        fontSize={'14px'} 
                        fontWeight={'200'}
                    />
                </div>
                <div className={styles.right}>
                    <button onClick={handleEditLog}>
                        <MdOutlineModeEditOutline style={{color: '#103561', fontSize: '20px'}} /> 
                        Edit
                    </button>
                    <button onClick={handleDeleteLog}>
                        <CiTrash style={{color: '#ff1a2f', fontSize: '20px'}} /> 
                        Delete
                    </button>
                </div>
            </div>
            <HeaderTwo 
                text={`Title: ${logs.title}`} 
                fontSize={'20px'}
                color={"#103561"} 
                width={'86%'} 
                bg={'#E5EBF1'} 
                margin={'2rem 0 0 2rem'}
                padding={'0.7rem 1rem'}
            />
            <div className={styles.descriptionCont}>
                <HeaderTwo 
                    text={'Description of Task:'} 
                    fontSize={'18px'}
                    color={"#103561"} 
                />
                <Paragraph
                    text={logs.description}
                    fontSize={'16px'}
                    color={"#103561"} 
                />
                    
            </div>
            <button className={styles.downloadBtn} style={{margin: '2rem 2rem'}}>
                {t('tasks.download')} 
                <MdOutlineFileDownload />
            </button>
        </div>
        {editLog && <EditLogMessage />}
        {deleteLog && <DeleteSuccessful />}
    </>
    
  )
}

export default ViewLog;


// EDIT LOG MESSAGE POP-UP COMPONENT
const EditLogMessage = () => {

    const [t, i18n] = useTranslation('global');

    return (
        <section className={confstyles.main}>
            <div className={confstyles.flex}>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" viewBox="0 0 51 48" fill="none">
                    <path d="M25.5013 26.8185C24.4822 26.8185 23.6551 25.9914 23.6551 24.9723V15.3846C23.6551 14.3655 24.4822 13.5385 25.5013 13.5385C26.5204 13.5385 27.3474 14.3655 27.3474 15.3846V24.9723C27.3474 25.9914 26.5204 26.8185 25.5013 26.8185Z" fill="#103561"/>
                    <path d="M23.6527 33.5877C23.6527 34.6068 24.4921 35.4339 25.5112 35.4339C26.5303 35.4339 27.3573 34.6068 27.3573 33.5877C27.3573 32.5687 26.5303 31.7416 25.5112 31.7416H25.489C24.4699 31.7416 23.6527 32.5687 23.6527 33.5877Z" fill="#103561"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5015 48C11.2393 48 1.78703 47.4142 0.406104 39.5914C-0.526819 34.3262 3.51503 26.304 7.59626 19.1483L8.11072 18.2425C15.5889 4.94523 20.3027 0 25.5015 0C30.7027 0 35.4141 4.94523 42.8898 18.2425L43.4043 19.1483C47.4855 26.304 51.5273 34.3262 50.5944 39.5914C49.216 47.4142 39.7636 48 25.5015 48ZM25.5015 3.69231C22.0159 3.69231 17.7747 8.58585 11.3255 20.0517L10.8012 20.9772L10.7938 20.9903C8.71543 24.6384 3.2157 34.2923 4.03933 38.9489C4.77533 43.1065 9.5901 44.3077 25.5015 44.3077C41.4129 44.3077 46.2276 43.1065 46.9612 38.9489C47.7848 34.2924 42.2852 24.6386 40.2068 20.9903L40.1993 20.9772L39.675 20.0517C33.2283 8.58585 28.9895 3.69231 25.5015 3.69231Z" fill="#103561"/>
                </svg>
                <Paragraph 
                    text={t('confirmation.editMessage')}
                    color={'#406A98'}
                    fontSize={'20px'}
                    fontWeight={'400'}
                    textAlign={'center'}
                    lineHeight={'normal'}
                />
                <div className={confstyles.btnDiv}>
                    <button style={{color: '#fff', background: '#103561'}}>{t("confirmation.yes")}</button>
                    <button>{t("confirmation.no")}</button>
                </div>
            </div>
        </section>
    )
}



// DELETE LOG MESSAGE POP-UP COMPONENT
const DeleteLogMessage = () => {
    
    const [t, i18n] = useTranslation('global');

    return (
        <section className={confstyles.main}>
            <div className={confstyles.flex}>
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="65" viewBox="0 0 43 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4402 9.04787C11.5433 7.37912 12.0184 4.99648 13.6919 3.07193C15.4621 1.03278 18.0896 0 21.4978 0C24.9084 0 27.5336 1.03278 29.3061 3.07193C30.9793 4.99609 31.4538 7.37898 31.5563 9.04787H40.8959C41.8902 9.04787 42.6973 9.85488 42.6973 10.8492C42.6973 11.8436 41.8902 12.6506 40.8959 12.6506H2.1041C1.10975 12.6506 0.302734 11.8436 0.302734 10.8492C0.302734 9.85488 1.10975 9.04787 2.1041 9.04787H11.4402ZM27.9469 9.04787C27.8561 7.96249 27.537 6.51825 26.5729 5.41851C25.5161 4.21279 23.8084 3.60273 21.4978 3.60273C19.1897 3.60273 17.482 4.21279 16.4228 5.41851C15.4587 6.51825 15.1403 7.96249 15.0497 9.04787H27.9469Z" fill="#E72422"/>
                    <path d="M21.4735 48C14.3665 48 9.99039 46.7679 7.28594 44.0106C3.47171 40.1219 3.59659 33.748 3.76937 24.9294L3.76967 24.9137C3.81051 22.8457 3.85374 20.6217 3.85374 18.2294C3.85374 17.2351 4.66075 16.4281 5.6551 16.4281C6.64946 16.4281 7.45647 17.2351 7.45647 18.2294C7.45647 20.6457 7.41324 22.8962 7.37 24.9858C7.20908 33.2312 7.1034 38.6761 9.85829 41.4863C11.8038 43.4726 15.4954 44.3973 21.4735 44.3973C27.4636 44.3973 31.1624 43.4678 33.1175 41.4767C35.8891 38.6499 35.7859 33.1718 35.6298 24.8791L35.6255 24.6469C35.5882 22.6562 35.5482 20.5162 35.5482 18.2294C35.5482 17.2351 36.3552 16.4281 37.3495 16.4281C38.3439 16.4281 39.1509 17.2351 39.1509 18.2294C39.1509 20.5808 39.1917 22.7713 39.2325 24.8104L39.2329 24.8289C39.3984 33.6916 39.5181 40.0983 35.6875 44.001C32.9758 46.7655 28.5901 48 21.4735 48Z" fill="#E72422"/>
                </svg>
                <Paragraph 
                    text={t('confirmation.delMessage')}
                    color={'#103561'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    textAlign={'center'}
                />
                <div className={confstyles.btnDiv}>
                    <button style={{color: '#fff', background: '#E72422'}}>{t("confirmation.yes")}</button>
                    <button>{t("confirmation.no")}</button>
                </div>
            </div>
        </section>
    )
}

// FUNCTION TO NOTIFY USER LOG DELETED SUCCESSFULLY
const DeleteSuccessful = () => {

    const [t, i18n] = useTranslation('global');

    return (
        <section className={confstyles.main}>
            <div className={confstyles.flex}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.318 17.0311C35.021 17.7341 35.021 18.8738 34.318 19.5767L22.9276 30.9671C22.2248 31.6699 21.0853 31.6701 20.3823 30.9674L14.6847 25.2722C13.9816 24.5694 13.9814 23.4297 14.6842 22.7266C15.387 22.0235 16.5267 22.0232 17.2298 22.726L21.6546 27.149L31.7724 17.0311C32.4754 16.3282 33.6151 16.3282 34.318 17.0311Z" fill="#406A98"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.88391 5.38391C9.88657 1.38124 16.0758 0 24.5 0C32.9242 0 39.1134 1.38124 43.1161 5.38391C47.1188 9.38657 48.5 15.5758 48.5 24C48.5 32.4242 47.1188 38.6134 43.1161 42.6161C39.1134 46.6188 32.9242 48 24.5 48C16.0758 48 9.88657 46.6188 5.88391 42.6161C1.88124 38.6134 0.5 32.4242 0.5 24C0.5 15.5758 1.88124 9.38657 5.88391 5.38391ZM8.42949 7.92949C5.49436 10.8646 4.1 15.7754 4.1 24C4.1 32.2246 5.49436 37.1354 8.42949 40.0705C11.3646 43.0056 16.2754 44.4 24.5 44.4C32.7246 44.4 37.6354 43.0056 40.5705 40.0705C43.5056 37.1354 44.9 32.2246 44.9 24C44.9 15.7754 43.5056 10.8646 40.5705 7.92949C37.6354 4.99436 32.7246 3.6 24.5 3.6C16.2754 3.6 11.3646 4.99436 8.42949 7.92949Z" fill="#406A98"/>
                </svg>
                <Paragraph 
                    text={t('confirmation.delSuccess')}
                    color={'#103561'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    textAlign={'center'}
                />
                <div className={confstyles.btnDiv}>
                    <button style={{background: '#103561', color: '#fff'}}>{t("confirmation.done")}</button>
                </div>
            </div>
        </section>
    )
}


