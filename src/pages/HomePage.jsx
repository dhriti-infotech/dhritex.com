import React, { useState } from 'react';
import Icon from '../components/Icon';
import { SITE_CONFIG } from '../config';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <div className="site-shell">
    <nav className="navbar">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Dhriti Infotech home"><img src={SITE_CONFIG.logo} alt="dhritex.com" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name={menuOpen ? 'close' : 'menu'} size={26}/></button>
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => go('home')}><Icon name="home" size={17}/><span>Home</span></button>
          <button onClick={() => go('about')}><Icon name="info" size={17}/><span>About</span></button>
          <button onClick={() => go('products')}><Icon name="grid" size={17}/><span>Products</span></button>
          <button onClick={() => go('contact')}><Icon name="mail" size={17}/><span>Contact</span></button>
          <button className="nav-cta" onClick={() => go('products')}>Explore Products <Icon name="arrow" size={17}/></button>
        </div>
      </div>
    </nav>
    <header className="hero product-home-hero" id="home">
      <span className="blob blob-one"/><span className="blob blob-two"/><span className="blob blob-three"/>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><Icon name="spark" size={15}/> Technology · Products · Innovation</span>
          <h1>Digital products for <span>everyday needs.</span></h1>
          <p>Dhriti Infotech builds practical digital experiences that bring people, services and local commerce closer together. Explore the products we are building.</p>
          <div className="hero-actions"><button className="btn primary" onClick={() => go('products')}>Explore Our Products <Icon name="arrow" size={18}/></button><button className="btn outline" onClick={() => go('contact')}>Contact Us</button></div>
          <div className="hero-proof"><div className="proof-icon"><Icon name="code" size={21}/></div><div><strong>Technology with a purpose</strong><span>Useful experiences, designed around people</span></div></div>
        </div>
        <div className="product-hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-product-tile care-tile"><img src="/assets/carenow-splash.png" alt="CareNow — Healthcare Closer to You"/></div><div className="hero-product-tile baskit-tile"><img src="/assets/baskit-logo.png" alt="Baskit by dhritex.com"/></div></div>
      </div>
    </header>
    <section className="section product-directory" id="products"><div className="container">
      <div className="section-heading center"><span className="eyebrow">Our Products</span><h2>Two ideas. One goal: make life simpler.</h2><p>Explore our digital products and see how each one is designed to solve a real-world need.</p></div>
      <div className="product-cards">
        <article className="directory-card carenow-card"><div className="directory-logo care-logo"><img src="/assets/carenow-splash.png" alt="CareNow logo"/></div><div className="directory-body"><span className="directory-kicker">Home healthcare platform</span><h3>CareNow</h3><p>Helping patients request eligible home healthcare services and helping qualified professionals manage service requests in one connected experience.</p><div className="directory-tags"><span>For Patients</span><span>For Professionals</span><span>Service Tracking</span></div><a href="#/carenow" className="btn primary">Explore CareNow <Icon name="arrow" size={18}/></a></div><div className="directory-number">01</div></article>
        <article className="directory-card baskit-card"><div className="directory-logo baskit-logo"><img src="/assets/baskit-logo.png" alt="Baskit logo"/></div><div className="directory-body"><span className="directory-kicker">Local grocery convenience</span><h3>Baskit</h3><p>A grocery-shopping experience in development, designed to help customers discover everyday essentials from nearby stores.</p><div className="coming-soon"><span className="coming-dot"/> App launching soon</div><button className="btn outline" onClick={() => go('contact')}>Stay in Touch <Icon name="arrow" size={18}/></button></div><div className="directory-number">02</div></article>
      </div>
    </div></section>
    <section className="section alt" id="about"><div className="container about-grid"><div><span className="eyebrow">About Dhriti Infotech</span><h2 className="simple-heading">Technology with a practical purpose.</h2><p className="muted-large">We combine engineering, product thinking and user-focused design to turn ideas into dependable digital experiences.</p><ul className="feature-list"><li><span><Icon name="check" size={17}/></span><div><strong>User-focused design</strong><p>Clear journeys that help people understand and use our products.</p></div></li><li><span><Icon name="check" size={17}/></span><div><strong>Modern engineering</strong><p>Web, mobile and backend systems built to evolve with user needs.</p></div></li><li><span><Icon name="check" size={17}/></span><div><strong>Products that solve problems</strong><p>We focus on useful services, convenience and accessible digital experiences.</p></div></li></ul></div><div className="about-visual"><div className="about-main-card"><img src="/assets/carenow-user.jpg" alt="CareNow mobile app"/></div><div className="about-badge"><span className="badge-mark"><Icon name="spark" size={19}/></span><div><strong>Dhriti Infotech</strong><small>Technology &amp; innovation</small></div></div><div className="about-accent"/></div></div></section>
    <section className="section contact-section" id="contact"><div className="container contact-grid"><div><div className="section-heading"><span className="eyebrow">Contact Us</span><h2>Have a question or an idea?</h2><p>Get in touch with Dhriti Infotech for product enquiries, feedback or partnership discussions.</p></div><div className="contact-items"><a href="tel:+919472501328"><span><Icon name="phone" size={20}/></span><div><small>Call us</small><strong>+91 9472501328</strong></div></a><a href="mailto:infotech.dhriti@gmail.com"><span><Icon name="mail" size={20}/></span><div><small>Email us</small><strong>infotech.dhriti@gmail.com</strong></div></a><div><span><Icon name="pin" size={20}/></span><div><small>Office</small><strong>Hitech City, Hyderabad, Telangana, India</strong></div></div></div></div><div className="contact-card"><div className="contact-card-head"><div className="mini-logo"><img src={SITE_CONFIG.logo} alt="dhritex.com"/></div><div><strong>Dhriti Infotech</strong><span>Technology · Products · Innovation</span></div></div><p>For business enquiries, product discussions and technology partnerships, contact us directly.</p><div className="contact-buttons"><a className="btn primary" href="mailto:infotech.dhriti@gmail.com">Email Dhriti <Icon name="arrow" size={17}/></a><a className="btn outline" href="https://wa.me/919472501328" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18}/> WhatsApp</a></div></div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img className="footer-logo" src={SITE_CONFIG.logo} alt="dhritex.com"/><p>Building digital products and technology solutions with a focus on simplicity, reliability and scale.</p></div><div><h4>Explore</h4><a href="#products">Products</a><a href="#about">About Us</a><a href="#contact">Contact</a></div><div><h4>Connect</h4><a href="tel:+919472501328">+91 9472501328</a><a href="mailto:infotech.dhriti@gmail.com">infotech.dhriti@gmail.com</a><span>Hitech City, Hyderabad, Telangana</span></div></div><div className="container footer-bottom"><span>© 2026 Dhriti Infotech. All rights reserved.</span><span>dhritex.com</span></div></footer>
    <div className="floating-actions"><a className="float-action whatsapp" href="https://wa.me/919472501328" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={24}/></a><a className="float-action email" href="mailto:infotech.dhriti@gmail.com" aria-label="Email"><Icon name="mail" size={23}/></a></div>
  </div>;
}
export default HomePage;
