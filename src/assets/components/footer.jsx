import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Info Section */}
        <div className="footer-section">
          <h3 className="footer-logo">SKILLSWAP</h3>
          <p className="footer-description">
            Empowering everyone to learn, share, and grow by exchanging skills and knowledge.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">🌐</a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#feature">Features</a></li>
            <li><a href="#about">About Us</a></li>
            {/* <li><a href="#contact">Contact</a></li> */}
          </ul>
        </div>

        {/* Features Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Features</h4>
          <ul className="footer-links">
            <li><a href="#feature">Skill Exchange</a></li>
            <li><a href="#feature">Community Learning</a></li>
            <li><a href="#feature">Flexible Scheduling</a></li>
            <li><a href="#feature">Review System</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Get Started</h4>
          <p className="footer-text">Ready to swap your skills?</p>
          <button className="footer-cta-button" onClick={() => setCurrentPage('Skills')}>Join SkillSwap</button>
          <p className="footer-contact">
            📧 Alialawieh@gmail.com <br/>
            📱 +961 76 827 920
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 SkillSwap. All rights reserved.</p>
          <div className="footer-bottom-links">
            {/* <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a> */}
            {/* <a href="#cookies">Cookie Policy</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
