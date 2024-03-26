import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './css/footer.css'
// import useScroll from '../Function/useScroll';

const Footer = forwardRef((props, ref) => {

    return (
        <footer ref={ref} id='footer' className='section'>
            <div className="footer-container">
                <p className='footer-description'>jchan715@naver.com</p>
                <ul className='footer-icon-list'>
                    <li>
                        <a href="https://github.com/JeonWoongchan"><FontAwesomeIcon icon={faGithub} size="2x" className='footer-icon'/></a>
                    </li>
                    <li>
                        <a href="https://blog.com/JeonWoongchan"><FontAwesomeIcon icon={faBlog} size="2x" className='footer-icon'/></a>
                    </li>
                </ul>
                <p>해당 페이지는 포트폴리오 용도로 작성된 페이지입니다. 
                </p>
            </div>
            {/* <aside style={{display: useScroll() > 150 ? 'block' : 'none'}}>
                <a href="" title='back to top'><FontAwesomeIcon icon={faArrowUp} className='arrow-up-icon'/></a>
            </aside> */}
        </footer>
    );
})

export default Footer;

