import { useTranslation } from 'react-i18next';
import './Header.css';

export function Header({ onSort, children }) {
  const { t } = useTranslation();

  return (
    <header className='app-header'>
      <h1 className='app-title'>{t('appName')}</h1>
      <nav className='app-nav'>
        {children}
      </nav>
    </header>
  )
}
