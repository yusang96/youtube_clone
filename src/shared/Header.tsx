import logo from '../data/Tam logo.png'
import { Link,useLocation } from 'react-router-dom';
import { IUser } from '../type/userType';
import styled from 'styled-components';


function Header({isLogin , userObj}:IUser) {
  const location = useLocation()
  const isActive = (path:string) => {
    return location.pathname === path ? 'active' : '';
  };
  return (
    <HeaderDiv>
      <Tab>
        <Link to='/'>
          <Logo src={logo} alt="로고" />
        </Link>
      </Tab>
      <Tab>
        {/* {isLogin ? <Link to='/profile' style={{marginLeft : '10px'}}> <h3>{userObj?.displayName ? userObj.displayName : "유저"}</h3> </Link>: <Link to='/login'>
          <button>로그인</button>
        </Link> } */}
        <Link to='/charts' style={{marginRight : '50px'}}>
          <Font className={isActive('/charts')}>CHARTS</Font>
        </Link>
        <Link to='/cover' style={{marginRight : '50px'}}>
          <Font className={isActive('/cover')}>COVER</Font>
        </Link>
        <Link to='/liveclip' style={{marginRight: '50px'}}>
          <Font className={isActive('/liveclip')}>LIVE CLIP</Font>
        </Link>
        <Link to='/artist' style={{marginRight : '50px'}}>
          <Font className={isActive('/artist')}>ARTIST</Font>
        </Link>
        <Link to='/album' style={{marginRight : '50px'}}>
          <Font className={isActive('/album')}>ALBUM</Font>
        </Link>
        <Link to='/team' style={{marginRight : '50px'}}>
          <Font className={isActive('/team')}>TEAM</Font>
        </Link>
      </Tab>
    </HeaderDiv>
  );
}
const HeaderDiv = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 10;
`
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
`
const Logo = styled.img` 
  padding-left: 16px;
`
const Font = styled.p`
  color : black;
  font-family: 'gmarket';
  display:inline-block; 
  margin : 0;
  &:hover {   
    display:block;
    content: '';
    border-bottom: solid 3px #ea2129;  
    margin : 0 auto;
   }

  &.active {
    border-bottom: solid 3px #ea2129;
  }
`
export default Header;