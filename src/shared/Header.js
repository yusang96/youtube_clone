import styles from './Header.module.css';
import youtube_logo from '../data/youtube_logo.png'
import { FiMenu } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [input,setInput] = useState('');
  const nav = useNavigate();
  const handleSubmit =(e)=> {
    e.preventDefault();
    nav('/searched/' + input);
  }
  return (
    <div className={styles.header}>
      <div className={styles.tab}>
        <FiMenu className={styles.icon} />
        <img src={youtube_logo} alt="로고" className={styles.logo} />
      </div>
     <form onSubmit={handleSubmit}>
      <div className={styles['center-tab']}>
          <input className={styles.input} value={input} onChange={(e)=>setInput(e.target.value)} />
          <IoSearchOutline className={styles['search-icon']} />
        </div>
     </form>
      <div className={styles.tab}>
        <BsGrid3X3Gap className={styles.icon} />
        <HiOutlineDotsVertical className={styles.icon} />
      </div>
    </div>
  );
}

export default Header;