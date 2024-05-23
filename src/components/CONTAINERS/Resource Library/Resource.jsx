import React from 'react'
import styles from './styles.module.css'
import HeaderTwo from '../../ELEMENTS/Header/HeaderTwo';
import Paragraph from '../../ELEMENTS/Paragraph/Paragraph';
import Image from '../../ELEMENTS/Image/Image';

const Resource = () => {
  return (
    <div className={styles.res}>
        <div>
            <HeaderTwo text={'Crafting Compelling Cover Letters for Job Applications'} color={'#fff'} fontSize={'14px'} fontWeight={'600'} textAlign={'left'} margin={''}  />
            <Paragraph 
                text={'A well-crafted cover letter is an essential component of any internship application. It serves as your personal introduction to potential...'}
                color={'#fff'} 
                fontSize={'12px'} 
                fontWeight={'400'} 
                textAlign={'left'} 
                width={'90%'}

            />
        </div>
        <Image 
            src={'https://res.cloudinary.com/dmyvdqjso/image/upload/v1680701322/carouselfive_vk4g1y.jpg'} 
            height={'150px'} 
            width={'35%'} 
            borderRadius={'2px'} 
        />
    </div>
  )
}


export default Resource; 