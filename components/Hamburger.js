import styles from '../styles/Hamburger.module.css';

const Hamburger = () => {
    return (
        <button className={`${styles.action} action--open`} aria-label="Open Menu"><span className="fa-icon icon--menu"></span></button>
    );
}

export default Hamburger;