import React, { useEffect } from 'react';
import { Link } from 'react-scroll';
import logo from '../../assets/img/imagesCastmee/Logo__1_-removebg-preview.png'
import styles from './style.module.css'; // Import CSS module
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { GrHomeOption } from "react-icons/gr";
import { TbBrandBlogger } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TransitionModal from './SigninPopUp';

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory()
  const handleSigninButtonClick = () => {
    history.push('/signin')


  }
  useEffect(() => {
    document.getElementById('logo').classList.add(styles.transition);
    document.getElementById('logoHead').classList.add(styles.transition)
    document.getElementById('btn').classList.add(styles.transition);
    // document.getElementById('nav').classList.add(styles.transition);
    document.getElementById('h2tage').classList.add(styles.transition);
  }, []);

  return (
    <div className={styles.section1}>
      <Container fluid name='home'>
        <Row className='pt-4'>
          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} className={`sec1col col-6 ${styles.transition}`} >
            <img id="logo" style={{ width: '25%' }} className={`logo ${styles.logo}`} src={logo} alt="" />
            <h3 id="logoHead" style={{ color: 'white' }} className={`logoHead poppins-semibold ${styles.logoHead}`}>Cast<span style={{ color: '#FEC400' }} className={`poppins-light ${styles.logoSpan}`}>mee</span></h3>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <span className={styles.scbtn}>
              <button id="btn" className={styles.sec1_btn} onClick={handleOpen}>
                <FontAwesomeIcon className={`${styles.btnname}`} icon={faUser} /> <span className={`${styles.btnname}`}>Sign in</span>
              </button>
            </span>
          </Col>
          {/* <Col style={{display:'flex', alignItems:'center', justifyContent:'end'}}>
          <span className='scbtn'>
          <button id="btn" className="sec1_btn">
              <<FontAwesomeIcon className='btnname' icon={faUser} /> <span className='btnname'>Sign in</span>
            </button>
            </span>
          </Col> */}
        </Row>
      </Container>

      {/* <Container fluid style={{color:"white"}} >
        <div className={styles.navs}>
          <ul id="nav" className={`lists ${styles.lists}`}>
            <Link style={{cursor:'pointer'}} to='home'>
              <li className="tooltip-container">
                <div className="tooltip-text">Home</div>
                <GrHomeOption className={`icon absolute-icon ${styles.icon}`}/>
              </li>
            </Link>
            <Link style={{cursor:'pointer'}}to='about'>
              <li className="tooltip-container">
                <div className="tooltip-text">About Us</div>
                <FiInfo className={`icon absolute-icon ${styles.icon}`}/>
              </li>
            </Link>
            <Link style={{cursor:'pointer'}}to='ourservice'>
              <li className="tooltip-container">
                <div className="tooltip-text">Our Services</div>
                <BiCog  className={`icon absolute-icon ${styles.icon}`}/>
              </li>
            </Link>
            <Link style={{cursor:'pointer'}}to='blog'>
              <li className="tooltip-container">
                <div className="tooltip-text">Blog</div>
                <TbBrandBlogger className={`icon absolute-icon ${styles.icon}`} />
              </li>
            </Link>
            <Link style={{cursor:'pointer'}}to='store'>
              <li className="tooltip-container">
                <div className="tooltip-text">Books</div>
                <LiaBookSolid style={{width:'20px', height:'20px'}} className={`icon absolute-icon ${styles.icon}`}/>
              </li>
            </Link>
            <Link style={{cursor:'pointer'}}to='contactus'>
              <li className="tooltip-container">
                <div className="tooltip-text">Contact Us</div>
                <IoCallOutline  className={`icon absolute-icon ${styles.icon}`}/>
              </li>
            </Link>
          </ul>
        </div>
      </Container> */}

      <div className={`container ${styles.container}`}>
        <div className={`row ${styles.row}`}>
          <Col id="h2tage" className={`h2tag col-6 p-4 ${styles.h2tag}`} xs={12} md={12} lg={12} style={{ width: 'auto' }}>
            <h2 >
              Welcome To <br />
              <span className="cast">cast</span>
              <span className="mee">mee</span>
            </h2>
            <p style={{ color: 'white' }}>An innovation from Cinesphere Private Limited</p>
          </Col>
        </div>
      </div>
      <Link to='store'>
        <div className={`round-div ${styles['round-div']}`}>
          <LiaBookSolid style={{ width: '100%', height: '60%' }} />
        </div>
      </Link>
      <TransitionModal open={open} handleClose={handleClose}/>
    </div>
  );
}

export default Home;
