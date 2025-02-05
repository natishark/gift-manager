import './Header.css';

export function Header({ onSort, children }) {
  return (
    <header className='app-header'>
      <h1 className='app-title'>Gift Manager</h1>
      <nav className='app-nav'>
        {children}
      </nav>
    </header>
  )
}
