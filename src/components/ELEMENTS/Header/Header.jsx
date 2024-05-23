import styles from "./styles.module.css"

const Header = ({text, fontSize, textAlign, color, width, margin, letterSpacing, lineHeight}) => {
    return (
        <h1 className={styles.Header} style={{fontSize: fontSize, width: width, textAlign: textAlign, color: color, letterSpacing: letterSpacing, lineHeight: lineHeight, margin: margin}}>{text}</h1>
    )
}

export default Header;