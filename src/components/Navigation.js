import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faClock, faThumbsUp, faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons"
import useAuth from '../context/auth-context/useAuth';

export default function Navigation() {

    const { userLoggedIn, setuserLoggedIn } = useAuth();
    const navigate = useNavigate();

    const signOutHandler = () => {
        setuserLoggedIn(false);
        localStorage?.removeItem("userLogin");
        navigate("/");
    }

    return (
        <div className="navigation">
            <ul className="list-unstyled">
                <li className="list-items">
                    <Link to="/" className="list-links"><FontAwesomeIcon icon={faHome} /><span className="list-inner-text">Home</span></Link>
                </li>
                <li className="list-items">
                    <Link to="/history" className="list-links"><FontAwesomeIcon icon={faHistory} /><span className="list-inner-text">History</span></Link>
                </li>
                <li className="list-items">
                    <Link to="/watch-later" className="list-links"><FontAwesomeIcon icon={faClock} /><span className="list-inner-text">Watch Later</span></Link>
                </li>
                <li className="list-items">
                    <Link to="/liked-videos" className="list-links"><FontAwesomeIcon icon={faThumbsUp} /><span className="list-inner-text">Liked Videos</span></Link>
                </li>
                <li className="list-items">
                    <Link to="/playlist" className="list-links"><FontAwesomeIcon icon={faBookmark} /><span className="list-inner-text">Playlists</span></Link>
                </li>
            </ul>
            {
                userLoggedIn
                ? <button className="btn btn-primary btn-signout" onClick={signOutHandler}>
                    <FontAwesomeIcon icon={farUser} className="icon-sign-out" /><p className="inner-text"> sign out </p>
                </button>
                :<Link to="/login" className="btn btn-primary btn-login">
                    <FontAwesomeIcon icon={faUser} className="icon-sign-out" /> <p className="inner-text"> login </p>
                </Link>
            }
        </div>
    )
}
