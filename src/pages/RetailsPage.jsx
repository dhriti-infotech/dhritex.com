import React, { useEffect } from 'react';
import Icon from '../components/Icon';
import { SITE_CONFIG } from '../config';

const brands = [
  {
    id: 'avira',
    name: 'Avira',
    endorsement: 'by dhritex.com',
    category: 'PACKAGED DRINKING WATER',
    description: 'Explore the Avira water collection and its proposed bottle sizes for home, office, hospitality and on-the-go use. The supplied brand artwork is displayed unchanged.',
    image: '/assets/retails/avira-premium-water-collection.png',
    alt: 'Original Avira by dhritex.com premium water collection brochure, preserving the supplied blue and cyan brand design',
    subject: 'Avira Brand Enquiry',
    cta: 'Enquire about Avira',
  },
  {
    id: 'ecoserve',
    name: 'EcoServe',
    endorsement: 'by dhritex',
    category: 'SINGLE-USE CROCKERY & TABLEWARE',
    description: 'Discover the EcoServe tableware range concept, including plates, compartment plates, bowls, cups and cutlery. The supplied artwork and green, natural-fibre palette are preserved as provided.',
    image: '/assets/retails/ecoserve-biodegradable-tableware.png',
    alt: 'Original EcoServe by dhritex biodegradable tableware brochure with the supplied green and natural kraft brand design',
    subject: 'EcoServe Brand Enquiry',
    cta: 'Enquire about EcoServe',
  },
];

export default function RetailsPage() {
  const logo = SITE_CONFIG.logo;
  useEffect(() => {
    const target = window.location.hash.split('#')[2];
    if (target) window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }, []);

  return <div className="retails-site">
    <nav className="group-nav"><div className="group-container group-nav-inner">
      <a className="group-brand" href="#/" aria-label="Dhriti Group of Industries home"><img src={logo} alt="Dhritex"/><span><strong>Dhriti Group</strong><small>of Industries</small></span></a>
      <div className="group-nav-links retail-nav-links"><a href="#/">Group Home</a><a href="#/infotech">Dhriti Infotech</a><a className="selected" href="#/retails">Dhriti Retails</a><a href="mailto:infotech.dhriti@gmail.com?subject=Dhriti%20Retails%20Enquiry">Contact</a></div>
    </div></nav>

    <header className="retails-hero"><div className="group-container retails-hero-grid">
      <div><span className="group-section-kicker">DHriti GROUP · CONSUMER PRODUCTS</span><h1>Everyday products.<br/><em>Thoughtful possibilities.</em></h1><p>Dhriti Retails brings together distinct consumer-product brands, including Avira packaged drinking water and EcoServe single-use tableware.</p>
        <div className="group-hero-actions"><a className="group-btn group-btn-primary" href="#retail-brands">Explore our brands <Icon name="arrow" size={18}/></a><a className="group-btn group-btn-light" href="mailto:infotech.dhriti@gmail.com?subject=Dhriti%20Retails%20Business%20Enquiry">Business enquiries</a></div>
      </div>
      <div className="retails-hero-art retails-brand-preview"><a href="#avira" className="retails-preview-card avira-preview"><img src="/assets/retails/avira-premium-water-collection.png" alt="Avira product collection preview"/><span>Avira · Packaged drinking water</span></a><a href="#ecoserve" className="retails-preview-card ecoserve-preview"><img src="/assets/retails/ecoserve-biodegradable-tableware.png" alt="EcoServe tableware preview"/><span>EcoServe · Single-use tableware</span></a></div>
    </div></header>

    <section className="retails-intro"><div className="group-container retails-intro-grid"><span className="group-section-kicker">OUR BRANDS</span><div><h2>Distinct brands. One group.</h2><p>Each brand has its own visual identity and product direction. The official supplied artwork is shown without recolouring, logo recreation or changes to the brand names. Product specifications and claims should be confirmed before commercial launch.</p></div></div></section>

    <section className="retails-brands" id="retail-brands"><div className="group-container">
      <div className="group-section-heading"><div><span className="group-section-kicker">BRANDS UNDER DHriti RETAILS</span><h2>Explore our product<br/><em>collections.</em></h2></div><p>View each brand's supplied product brochure and contact us for trade, distribution and partnership enquiries.</p></div>
      {brands.map((brand, index) => <article className={`retail-brochure-card ${brand.id}-brochure-card`} id={brand.id} key={brand.id}>
        <div className="retail-brochure-heading"><div><span className="retail-brand-category">0{index + 1} · {brand.category}</span><h3>{brand.name} <em>{brand.endorsement}</em></h3><p>{brand.description}</p></div><a className="group-btn group-btn-primary" href={`mailto:infotech.dhriti@gmail.com?subject=${encodeURIComponent(brand.subject)}`}>{brand.cta} <Icon name="arrow" size={18}/></a></div>
        <a className="retail-brochure-image-link" href={brand.image} target="_blank" rel="noreferrer" aria-label={`Open original ${brand.name} brochure in a new tab`}><img className="retail-brochure-image" src={brand.image} alt={brand.alt} loading="lazy"/><span className="retail-image-hint"><Icon name="external" size={16}/> View original artwork</span></a>
      </article>)}
    </div></section>

    <section className="retails-partners"><div className="group-container retails-partners-inner"><div><span className="group-section-kicker">WORK WITH US</span><h2>Interested in supplying,<br/><em>stocking or partnering?</em></h2><p>Contact us for product, distributor, retailer, manufacturing and business partnership enquiries.</p></div><a className="group-btn group-btn-primary" href="mailto:infotech.dhriti@gmail.com?subject=Dhriti%20Retails%20Partnership">Discuss a partnership <Icon name="arrow" size={18}/></a></div></section>

    <footer className="group-footer"><div className="group-container"><div className="group-footer-main"><a className="group-brand footer-brand" href="#/"><img src={logo} alt="Dhritex"/><span><strong>Dhriti Group</strong><small>of Industries</small></span></a><p>Dhriti Retails · Consumer products and brand development.</p><div className="group-footer-links"><a href="#/">Group Home</a><a href="#/infotech">Dhriti Infotech</a><a href="mailto:infotech.dhriti@gmail.com">Contact</a></div></div><div className="group-footer-bottom"><span>© {new Date().getFullYear()} Dhriti Group of Industries</span><span>dhritex.com</span></div></div></footer>
  </div>;
}
