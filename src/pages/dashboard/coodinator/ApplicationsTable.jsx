import React from 'react'
import styles from './styles.module.css'
//import internships from './intApplications.js'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo.jsx';
import { useEffect, useState } from 'react'


const ApplicationsTable = () => {

    const [internships, setInternships] = useState([])
    const fetchInternships = async () => {
        const response = await fetch('http://localhost:5000/api/v1/demandes-de-stage/list/student')
        const data = await response.json()
        setInternships(data.message)
    }

    useEffect(() => {
        fetchInternships()
    }
    , [])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const formatFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }


    // FUNCTION TO DISPLAY STUDENT INTERNSHIP APPLICATIONS ON A TABLE
    const displayInternshipApplications = internships.map((item, index) => 
        <tr key={index}>
            <td>{formatFullName(item.stagiaire.firstName , item.stagiaire.lastName)}</td>
            <td>{item.stagiaire.email}</td>
            <td>{item.stagiaire.CIN}</td>
            <td>BH BANK</td>
            <td>{item.type}</td>
            <td>{item.etat}</td>
            <td>{formatDate(item.dateSoumission)}</td>
        </tr>
    )
  return (
    <section className={styles.intApps}>
        <HeaderTwo
            text={'Internship Applications'}
            fontSize={'18px'}
            fontWeight={'800'}
            color={'#003679'}
            margin={'1rem 0 1rem 1rem'}
        />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CIN</th>
                    <th>Office</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date Created</th>
                </tr>
            </thead>
            <tbody>
                {displayInternshipApplications}
            </tbody>
        </table>
    </section>
  )
}


export default ApplicationsTable;
