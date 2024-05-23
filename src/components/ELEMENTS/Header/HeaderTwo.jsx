const HeaderTwo = ({ text, color, fontSize, textAlign, margin, fontWeight, width, bg, padding }) => {
    return (
        <h2 style={{color: color, fontSize: fontSize, textAlign: textAlign, margin: margin, fontWeight: fontWeight, width: width, background: bg, padding: padding }}>{text}</h2>
    )
}

export default HeaderTwo;
