import React from 'react'
import styles from './styles.module.css'
import Image from '../Image/Image'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbNotes } from 'react-icons/tb'
import { FaRegUser } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { BiSolidDashboard } from 'react-icons/bi'
import { PiSpeakerHighDuotone } from "react-icons/pi";
import { useTranslation } from 'react-i18next'
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import HeaderTwo from '../Header/HeaderTwo'
import { useAuth } from '../../../hooks/AuthProvider';



const SupeSidebar = () => {

    const auth = useAuth();
    const [t, i18n] = useTranslation("global")
    const location = useLocation();
    const navigate = useNavigate('');
    // console.log(location.pathname);

     // FUNCTION TO HANDLE LOGOUT
    const handleLogout = () => {
        auth.logOut();

        setInterval(() => navigate('/login'), 1000)

        //const url = 'http://localhost:8080/v1/auth/logout'
        // fetch(url, {
        //     method: "GET",
        //                 headers: { "Content-Type": "application/json" },
        //             })
        //             .then((res) => {
        //                 // navigate('/student/login')
        //             })
        //             .catch((error) => {
        //                     console.error(error);
        //                 });
    }

  return (
    <div className={styles.sideBar}>
        <Image 
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BH_BANK.png/600px-BH_BANK.png?20190723102945'}
            height={"100px"}
            width={"100px"}
            margin={"2rem auto 1rem auto"}
        />
        <div className='navDiv'>
            <Link to={'/supervisor/overview'} className={styles.link}><BiSolidDashboard style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.home")}</Link>
            <Link to={'/supervisor/profile'} className={styles.link}><FaRegUser style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.prof")}</Link>
            {/* <Link to={'/coordinator/view-all-internships'} className={styles.link}><FaChalkboardTeacher style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.internships")}</Link> */}
            {/*<Link to={'/coordinator/view/internship/application'} className={styles.link}><TbNotes style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("application.apps")}</Link>*/}
            <Link to={'/supervisor/view-internships'} className={styles.link}><PiStudentBold style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("internships.i")}</Link>
            <Link to={'/supervisor/view-evaluations'} className={styles.link}><MdOutlineSupervisorAccount style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.Eval") + 's'}</Link>
            <Link to={'/supervisor/announcements'} className={styles.link}><PiSpeakerHighDuotone style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("announcements.title")}</Link>
            <Link to={'/supervisor/settings'} className={styles.link}><CiSettings style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.settings")}</Link>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
        <IoIosLogOut style={{fontSize: '22px', fontWeight: '800', marginRight: '5px', color: '#103561'}} />
        <HeaderTwo 
            text={t("log.logout")} 
            fontSize={'18px'}
            margin={'0'}
            color={'#103561'}
        />
        </button>
    </div>
  )
}

export default SupeSidebar;