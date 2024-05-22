import Link from 'next/link';
import styles from './MenuBar.module.css';

const MenuBar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li >
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/crm">
                        CRM
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/dbt">
                        DBT
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/saturation">
                        Saturation
                    </Link>
                </li>
            </ul>
        </nav >
    );
};

export default MenuBar;
