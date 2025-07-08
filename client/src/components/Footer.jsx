import React, { useState } from 'react';


function Footer() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>📘 Mera Khata</h3>
        <p>
          Mera Khata is a digital ledger for small businesses to track dues, payments, and sales.
          Manage your entries in a fast, clean and secure way.
        </p>
        <p>© {new Date().getFullYear()} Mera Khata. All rights reserved.</p>

        <div className="contact-container">
          <button className={`contact-btn ${showOptions ? 'spin' : ''}`} onClick={toggleOptions}>
            Contact Me
          </button>

          {showOptions && (
            <div className="contact-options">
             <a href="mailto:abhisheksaha112233@gmail.com">abhisheksaha112233@gmail.com</a>
              <a href="https://github.com/Abhisheksaha7530" target="_blank" rel="noreferrer">
                🐙 GitHub
              </a>
              <a href="https://www.linkedin.com/in/abhishek-saha-111abcd/" target="_blank" rel="noreferrer">
                💼 LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
