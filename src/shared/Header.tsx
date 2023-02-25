import youtube_logo from '../data/youtube_logo.png'
import { FiMenu } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../type/userType';
import styled from 'styled-components';


function Header({isLogin , userObj}:IUser) {

  const [input,setInput] = useState('');
  const nav = useNavigate();
  const handleSubmit =(e:React.FormEvent)=> {
    e.preventDefault();
    nav('/searched/' + input);
  }
  return (
    <HeaderDiv>
      <Tab>
        <FiIcon />
        <Link to='/'>
          <Logo src={youtube_logo} alt="로고" />
        </Link>
      </Tab>
      <Tab>
        {isLogin ? <Link to='/profile' style={{marginLeft : '10px'}}> <h3>{userObj?.displayName ? userObj.displayName : "유저"}</h3> </Link>: <Link to='/login'>
          <button>로그인</button>
        </Link> }
        <Link to='/charts' style={{marginLeft : '10px'}}>CHARTS</Link>
        <Link to='/playlist' style={{marginLeft : '10px'}}>PLAY LIST</Link>
        <Link to='/artist' style={{marginLeft : '10px'}}>ARTIST</Link>
        <Link to='/album' style={{marginLeft : '10px'}}>ALBUM</Link>
      </Tab>
    </HeaderDiv>
  );
}
const HeaderDiv = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    height: 56px;
    padding: 0 16px;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`
const Tab = styled.div`
    display: flex;
    align-items: center;
`
const FiIcon = styled(FiMenu)`
    width: 24px;
    height: 24px;
    padding: 8px;
    cursor: pointer;
`
const Logo = styled.img` 
  padding-left: 16px;
`
export default Header;