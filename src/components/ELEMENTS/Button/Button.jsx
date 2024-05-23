import styles from "./styles.module.css"

const Button = ({ text, color, backgroundColor, fontSize, width, height, margin, padding, boxShadow, cursor, border, borderRadius }) => {
    return (
        <button className={styles.btn} style={{color: color, backgroundColor: backgroundColor, fontSize: fontSize, width: width, height: height, margin: margin, padding: padding, boxShadow: boxShadow, cursor: cursor, border: border, borderRadius: borderRadius}}>
            {text}
        </button>
    )
}

export default Button;