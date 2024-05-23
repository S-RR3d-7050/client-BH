import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiDownload } from "react-icons/fi";
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';

const SIFDownload = ({cv, index}) => {

    const [t, i18n] = useTranslation('global');

    const main = {
        height: '25vh',
        width: '95%',
        margin: '1rem 1.3rem', 
        padding: '0.5rem',
        backgroundColor: '#E5EBF1'
    }

    const buttonContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    const buttonWrapper = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '45%',
        height: '50px',
        margin: '0.5rem 1rem'
    }

    const btn = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        fontSize: '18px',
        color: '#003679',
        backgroundColor: 'transparent',
        height: '40px',
        width: '90%',
        cursor: 'pointer'
    }

    return (
        <div style={main}>
            <HeaderTwo 
                text={t('sidebar.docs')}
                color={'#003679'}
                fontSize={'18px'}
                fontWeight={'600'}
                margin={'1rem 1rem'}
            />

            <Paragraph 
                text={'Download Cv, Cover Letter and Index.'}
                color={'#101110BF'}
                fontSize={'16px'}
                fontWeight={'500'}
                margin={'1rem 1rem'}
            />

            <div style={buttonContainer}>
                <div style={buttonWrapper}>
                    <a href={cv} download target='_blank' >
                    <button style={btn}>
                        <FiDownload 
                            style={{
                                marginRight: '0.5rem', 
                                fontSize: '20px',
                                color: '#003679'
                            }}
                        />
                        {t('application.CvCl')}
                    </button>
                    </a>
                </div>
                <div style={buttonWrapper}>
                    <a href={index} download target='_blank'>
                    <button style={btn}>
                        <FiDownload 
                            style={{
                                marginRight: '0.5rem', 
                                fontSize: '20px',
                                color: '#003679'
                            }}
                        />
                        {t('application.i')}
                    </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SIFDownload;
