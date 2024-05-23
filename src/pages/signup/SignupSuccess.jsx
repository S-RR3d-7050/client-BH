import React, { useState } from 'react'
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo'
import Paragraph from '../../components/ELEMENTS/Paragraph/Paragraph'

const SignupSuccess = ({ text, message }) => {

    const [show, setShow] = useState(true);

    const main = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw', 
        backgroundColor: '#103561',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }

    const inner = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
        width: '40%',
        backgroundColor: '#fff',
    }
  return (
    <main style={main} onClick={() => setShow(false)}>
        <div style={inner}>
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                <path d="M66.281 31.9031L39.1781 59.0063L27.3188 47.1516C27.3073 47.1401 27.2959 47.1287 27.2842 47.1173C26.3376 46.1897 24.8183 46.205 23.8907 47.1516C22.9629 48.0984 22.9784 49.6178 23.925 50.5453L37.4813 64.0969C37.9307 64.5478 38.5415 64.8009 39.1781 64.8C39.8147 64.8006 40.4253 64.5478 40.8747 64.0969L69.6747 35.2969C69.6861 35.2854 69.6976 35.2743 69.709 35.2626C70.6365 34.316 70.6213 32.7967 69.6747 31.8691C68.7281 30.9413 67.2088 30.9568 66.281 31.9031ZM48 0C21.4904 0 0 21.4904 0 48C0 74.5096 21.4904 96 48 96C74.4967 95.9689 95.9689 74.4967 96 48C96 21.4904 74.5096 0 48 0ZM48 91.2C24.1412 91.2 4.8 71.8588 4.8 48C4.8 24.1412 24.1412 4.8 48 4.8C71.848 4.82607 91.1739 24.1521 91.2 48C91.2 71.8588 71.8588 91.2 48 91.2Z" fill="#101110" fill-opacity="0.25"/>
            </svg>
            <HeaderTwo text={text} fontSize={'18px'} fontWeight={'500'} color={'#103561'} textAlign={'center'} />
            <Paragraph text={message} fontSize={'18px'} fontWeight={'300'} color={'#103561'} textAlign={'center'} margin={'1rem 0'} />
        </div>
    </main>
  )
}


export default SignupSuccess;