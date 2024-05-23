const Paragraph = ({text, fontSize, textAlign, color, width, margin, letterSpacing, lineHeight, fontWeight}) => {

    const st = {
        fontSize: fontSize,
        fontWeight: fontWeight,
        width: width, 
        textAlign: textAlign, 
        color: color, 
        letterSpacing: letterSpacing, 
        lineHeight: lineHeight, 
        margin: margin
    }

    return (
        <p style={st}>{text}</p>
    )
}

export default Paragraph;