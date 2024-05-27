import Link from 'next/link';
import styles from './MenuBar.module.css';

const MenuBar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li >
                    <Link href="/" passHref  >
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" passHref  >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/crm" passHref  >
                        CRM
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/dbt" passHref  >
                        DBT
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/saturation" passHref  >
                        Saturation
                    </Link>
                </li>
            </ul>
        </nav >
    );
};

export default MenuBar;