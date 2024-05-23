import React from 'react'

const Image = ({ src, height, width, borderRadius, margin, boxShadow, alt }) => {
    const styles = {
        width: width,
        height: height,
        borderRadius: borderRadius,
        margin: margin,
        objectFit: 'cover',
        objectPosition: 'center',
        boxShadow: boxShadow
    }
  return (
    <img src={src} alt={alt} style={styles} />
  )
}

export default Image;
