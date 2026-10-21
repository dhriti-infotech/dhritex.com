import React, { useState } from 'react';
import Icon from '../components/Icon';
import { SITE_CONFIG } from '../config';

const logo = SITE_CONFIG.logo;

export default function GroupHomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <div className="group-site">
    <nav className="group-nav"><div className="group-container group-nav-inner">
      <a className="group-brand" href="#/" aria-label="Dhriti Group of Industries home"><img src={logo} alt="Dhritex"/><span><strong>Dhriti Group</strong><small>of Industries</small></span></a>
      <button className="group-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name={menuOpen ? 'close' : 'menu'} size={24}/></button>
      <div className={`group-nav-links ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => go('group-home')}>Home</button><button onClick={() => go('group-about')}>About</button>
        <a href="#/infotech">Dhriti Infotech</a><a href="#/retails">Dhriti Retails</a><button onClick={() => go('group-contact')}>Contact</button>
      </div>
    </div></nav>
    <header className="group-hero" id="group-home"><div className="group-orb orb-a"/><div className="group-orb orb-b"/><div className="group-container group-hero-grid">
      <div className="group-hero-copy"><span className="group-eyebrow"><span/> A growing business group</span><h1>Building businesses.<br/><em>Creating possibilities.</em></h1><p>Dhriti Group of Industries brings together technology, consumer products and manufacturing-led ventures with a shared focus on practical innovation and lasting value.</p>
        <div className="group-hero-actions"><a className="group-btn group-btn-primary" href="#/infotech">Explore our businesses <Icon name="arrow" size={18}/></a><button className="group-btn group-btn-light" onClick={() => go('group-about')}>Discover Dhriti</button></div>
        <div className="group-hero-note"><span className="group-note-icon"><Icon name="spark" size={20}/></span><span><strong>One group. Different possibilities.</strong><small>Technology · Retail · Product innovation</small></span></div>
      </div>
      <div className="group-hero-art group-hero-editorial" aria-label="Dhriti Group business divisions">
        <a href="#/retails" className="editorial-feature editorial-feature-main"><img src="/assets/retails/avira-premium-water-collection.png" alt="Avira packaged drinking water collection"/><span className="editorial-caption"><small>CONSUMER PRODUCTS</small><strong>Dhriti Retails</strong><em>Avira · EcoServe</em></span></a>
        <a href="#/infotech" className="editorial-feature editorial-feature-side"><img src="/assets/carenow-user.jpg" alt="CareNow digital product interface"/><span className="editorial-caption"><small>SOFTWARE &amp; TECHNOLOGY</small><strong>Dhriti Infotech</strong><em>Digital products and services</em></span></a>
        <div className="editorial-index"><span>OUR BUSINESSES</span><strong>01 — 02</strong></div>
      </div>
    </div></header>
    <section className="group-value-strip"><div className="group-container group-value-grid"><div><strong>01</strong><span>Technology</span></div><div><strong>02</strong><span>Consumer brands</span></div><div><strong>03</strong><span>Product innovation</span></div><div><strong>∞</strong><span>Room to grow</span></div></div></section>
    <section className="group-section" id="group-about"><div className="group-container group-about-grid"><div><span className="group-section-kicker">WHO WE ARE</span><h2>A group built around<br/><em>useful ideas.</em></h2></div><div className="group-about-copy"><p>Dhriti Group of Industries is the umbrella brand connecting our business initiatives across software, digital products, retail and manufacturing-oriented ventures.</p><p>Each division has a distinct purpose and audience, while sharing a commitment to thoughtful design, dependable execution and customer value.</p><a className="group-text-link" href="#/infotech">Explore our divisions <Icon name="arrow" size={17}/></a></div></div></section>
    <section className="group-section group-business-section"><div className="group-container"><div className="group-section-heading"><div><span className="group-section-kicker">OUR BUSINESSES</span><h2>Different strengths.<br/><em>One shared ambition.</em></h2></div><p>Explore our business divisions and the products and services they are building.</p></div>
      <div className="group-business-grid">
        <article className="group-business-card infotech-card"><div className="group-card-top"><span className="group-card-index">01 / TECHNOLOGY</span><span className="group-card-icon"><Icon name="code" size={23}/></span></div><div className="group-card-illustration business-photo"><img src="/assets/carenow-user.jpg" alt="CareNow product interface" loading="lazy"/><span>PRODUCT ENGINEERING</span></div><h3>Dhriti Infotech</h3><p>Software products and technology services that help businesses and consumers solve real-world problems.</p><div className="group-chip-row"><span>Software</span><span>Mobile apps</span><span>AI &amp; cloud</span></div><a className="group-card-link" href="#/infotech">Explore Infotech <Icon name="arrow" size={18}/></a></article>
        <article className="group-business-card retails-card"><div className="group-card-top"><span className="group-card-index">02 / PRODUCTS</span><span className="group-card-icon"><Icon name="package" size={23}/></span></div><div className="group-card-illustration business-photo retail-photo"><img src="/assets/retails/ecoserve-biodegradable-tableware.png" alt="EcoServe biodegradable tableware collection" loading="lazy"/><span>CONSUMER BRANDS</span></div><h3>Dhriti Retails</h3><p>Consumer product brands spanning packaged drinking water and thoughtfully designed single-use crockery.</p><div className="group-chip-row"><span>Avira water</span><span>EcoServe crockery</span></div><a className="group-card-link" href="#/retails">Explore Retails <Icon name="arrow" size={18}/></a></article>
      </div></div></section>
    <section className="group-brands-section"><div className="group-container"><div className="group-section-heading"><div><span className="group-section-kicker">OUR PRODUCT BRANDS</span><h2>Made for everyday<br/><em>needs and new ideas.</em></h2></div><p>Distinct product identities supported by the Dhritex group brand.</p></div><div className="group-brand-grid"><a href="#/retails#avira" className="group-brand-tile avira-tile"><div className="brand-water-drop">A</div><div><span>PACKAGED DRINKING WATER</span><h3>Avira <small>by Dhritex</small></h3><p>A consumer water brand concept focused on everyday hydration.</p></div><span className="brand-tile-arrow"><Icon name="arrow" size={18}/></span></a><a href="#/retails#ecoserve" className="group-brand-tile ecoserve-tile"><div className="brand-eco-mark"><Icon name="leaf" size={33}/></div><div><span>SINGLE-USE CROCKERY</span><h3>EcoServe <small>by Dhritex</small></h3><p>Molded-fibre and disposable crockery product direction.</p></div><span className="brand-tile-arrow"><Icon name="arrow" size={18}/></span></a></div></div></section>
    <section className="group-contact-section" id="group-contact"><div className="group-container group-contact-inner"><div><span className="group-section-kicker">LET'S CONNECT</span><h2>Have an idea or a<br/><em>business opportunity?</em></h2><p>Talk to us about technology services, products, distribution or potential partnerships.</p></div><div className="group-contact-card"><span className="group-contact-icon"><Icon name="mail" size={22}/></span><strong>Start a conversation</strong><p>For group and business enquiries, contact our team.</p><a className="group-btn group-btn-primary" href="mailto:infotech.dhriti@gmail.com?subject=Dhriti%20Group%20Enquiry">Contact Dhriti Group <Icon name="arrow" size={18}/></a><small>General enquiries · Hyderabad, India</small></div></div></section>
    <footer className="group-footer"><div className="group-container"><div className="group-footer-main"><a className="group-brand footer-brand" href="#/"><img src={logo} alt="Dhritex"/><span><strong>Dhriti Group</strong><small>of Industries</small></span></a><p>Building businesses across technology, consumer products and innovation.</p><div className="group-footer-links"><a href="#/infotech">Dhriti Infotech</a><a href="#/retails">Dhriti Retails</a><a href="mailto:infotech.dhriti@gmail.com">Contact</a></div></div><div className="group-footer-bottom"><span>© {new Date().getFullYear()} Dhriti Group of Industries</span><span>dhritex.com</span></div></div></footer>
  </div>;
}
