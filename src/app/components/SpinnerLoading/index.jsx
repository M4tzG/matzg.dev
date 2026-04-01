import styles from './index.module.css';

export default function SpinnerLoading(props) {
    return (
        <div className={`${styles.loadingOverlay} ${props.isLoading ? styles.visible : styles.hidden}`}>
            <div className={styles.spinner}></div>
        </div>
    );
}