import React from 'react'
import styles from './styles.module.css'
//import supervisors from './supervisors.js'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Header from '../../../components/ELEMENTS/Header/Header'
import { Link } from 'react-router-dom'
import ApplicationsTable from './ApplicationsTable.jsx'
import SupeSidebar from '../../../components/ELEMENTS/Nav/SupeSidebar';
import Calendar from '../../../components/CONTAINERS/Calendar/Calendar.jsx'
import { useEffect, useState } from 'react'


export default function SuppOverview() {

    const [data, setData] = useState([])
    let user = localStorage.getItem('user');
    //console.log(user);
    user = JSON.parse(user);
    const id = user.id;
    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/demandes-de-stage/encadrant/${id}`)
        const data = await response.json()
        setData(data.message)
    }

    useEffect(() => {
        fetchData()
    }
    , [])

    const handleClick = (rowData) => {
        console.log('Row Clicked : ', rowData)
    }


    const displayStudents = data.map((item, index) => 
            <tr key={index} onClick={() => handleClick(item)}>
                <td>{item.stagiaire.firstName}</td>
                <td>{item.stagiaire.lastName}</td>
                <td>{item.stagiaire.CIN}</td>
                <td>{item.stagiaire.email}</td>
                <td>{item.stagiaire.address}</td>
                <td>+216 98 695 587</td>
            </tr>
        )
  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <SupeSidebar />
        <div className={styles.overview}>
            <Header 
                text={'Overview'}
                fontSize={'20px'}
                fontWeight={'800'}
                color={'#003679'}
                margin={'1rem 1rem'}
            />
            <div className={styles.one}>
                <div className={styles.supes}>
                    <HeaderTwo 
                        text={'Interns'}
                        fontSize={'18px'}
                        fontWeight={'800'}
                        color={'#003679'}
                        margin={'0.5rem 0 1rem 1rem'}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>CIN</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayStudents}
                        </tbody>
                    </table>
                    <Link to={'/supervisor/view-internships'} className={styles.allSupesLink}>View all Interns</Link>
                </div>
                <div className={styles.cal}>
                    <HeaderTwo 
                        text={'Calendar'}
                        fontSize={'18px'}
                        fontWeight={'800'}
                        color={'#003679'}
                        margin={'0.5rem 0 1rem 1rem'}
                    />
                    <Calendar />
                </div>
            </div>
            <div className={styles.two}>
                <ApplicationsTable />
            </div>

        </div>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />

    </>
  )
}
