import React, { useEffect, useState } from 'react';

import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';

import { SITE_CONFIG } from '../config';

const logo = SITE_CONFIG.logo;

const phoneScreens = [
  {
    title: 'User App',
    label: 'CareNow patient experience',
    image: '/assets/carenow-user.jpg',
  },
  {
    title: 'Professional App',
    label: 'Healthcare worker dashboard',
    image: '/assets/carenow-professional1.jpg',
  },
  {
    title: 'Login & Onboarding',
    label: 'Simple OTP-based access',
    image: '/assets/carenow-login.jpg',
  },
  {
    title: 'Service Tracking',
    label: 'Real-time service updates',
    image: '/assets/carenow-service.jpeg',
  },
];

function HomePage({ onOpenAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site-shell">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <button className="brand" onClick={() => go('home')} aria-label="Dhriti Infotech home">
            <img src={logo} alt="dhritex.com" />
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <Icon name={menuOpen ? 'close' : 'menu'} size={26} />
          </button>
          <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => go('home')}>Home</button>
            <button onClick={() => go('about')}>About</button>
            <button onClick={() => go('products')}>Products</button>
            <button onClick={() => go('clients')}>Clients</button>
            <button onClick={() => go('leadership')}>Leadership</button>
            <button onClick={() => go('contact')}>Contact</button>
            <button onClick={onOpenAdmin}>Admin Login</button>
            <button className="nav-cta" onClick={() => go('contact')}>Let's Talk <Icon name="arrow" size={17} /></button>
          </div>
        </div>
      </nav>

      <header className="hero" id="home">
        <span className="blob blob-one" /><span className="blob blob-two" /><span className="blob blob-three" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Icon name="spark" size={15} /> Technology • Products • Innovation</span>
            <h1>Building digital products that make <span>life simpler.</span></h1>
            <p>Dhriti Infotech is a Hyderabad-based technology company focused on scalable software, modern web experiences and practical digital products.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => go('products')}>Explore Our Products <Icon name="arrow" size={18} /></button>
              <button className="btn outline" onClick={() => go('contact')}>Work With Us</button>
            </div>
            <div className="hero-proof">
              <div className="proof-icon"><Icon name="code" size={21} /></div>
              <div><strong>Built for scale</strong><span>Web • Mobile • Cloud • AI</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-screen-frame">
              <img src="/assets/carenow-user.jpg" alt="CareNow user app home screen" />
            </div>
            <div className="float-card float-top"><div className="float-icon cyan"><Icon name="shield" size={21} /></div><div><strong>CareNow - Coming soon...</strong><span>Healthcare at your doorstep</span></div></div>
            <div className="float-card float-bottom"><div className="float-icon navy"><Icon name="cloud" size={21} /></div><div><strong>Digital Solutions</strong><span>Currently in development</span></div></div>
          </div>
        </div>
      </header>

      <section className="stats-wrap">
        <div className="container stats-band">
          <div><strong>01</strong><span>Digital Products</span></div>
          <div><strong>01</strong><span>Featured Client</span></div>
          <div><strong>2</strong><span>Leadership Team</span></div>
          <div><strong>100%</strong><span>Product Focused</span></div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-main-card"><img src="/assets/carenow-professional1.jpg" alt="CareNow professional dashboard" /></div>
            <div className="about-badge"><span className="badge-mark"><Icon name="spark" size={19} /></span><div><strong>Dhriti Infotech</strong><small>Technology &amp; innovation</small></div></div>
            <div className="about-accent" />
          </div>
          <div>
            <SectionHeading eyebrow="Who We Are" title="Technology with a practical purpose.">We combine engineering, product thinking and user-focused design to turn ideas into dependable digital experiences.</SectionHeading>
            <ul className="feature-list">
              <li><span><Icon name="check" size={17} /></span><div><strong>Modern engineering</strong><p>ReactJS, Java, Spring Boot, cloud-native systems and scalable APIs.</p></div></li>
              <li><span><Icon name="check" size={17} /></span><div><strong>Product mindset</strong><p>We design around real user needs, keeping interfaces simple and useful.</p></div></li>
              <li><span><Icon name="check" size={17} /></span><div><strong>Built to scale</strong><p>Architecture and components are structured so products can evolve as the business grows.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt" id="products">
        <div className="container">
          <SectionHeading eyebrow="Our Products" title="Products built around real-world needs." center>Our current product portfolio starts with CareNow, a healthcare quick-service platform connecting users with nearby healthcare professionals and services.</SectionHeading>
          <div className="product-showcase">
            <div className="product-info">
              <span className="product-kicker">Featured Product</span>
              <h3>CareNow</h3>
              <p className="product-lead">Healthcare at your doorstep.</p>
              <p>CareNow brings together nurse-at-home services, healthcare professionals, medicines and medical equipment in a simple mobile experience.</p>
              <div className="tag-row"><span>React Native</span><span>Spring Boot</span><span>Location</span><span>Cloud Ready</span></div>
              <button className="btn primary" onClick={() => go('contact')}>Discuss the Product <Icon name="arrow" size={18} /></button>
            </div>
            <div className="screens-panel">
              <div className="screen-tabs">
                {phoneScreens.map((s, i) => <button key={s.title} className={i === activeProduct ? 'active' : ''} onClick={() => setActiveProduct(i)}>{s.title}</button>)}
              </div>
              <div className="phone-stage">
                {phoneScreens.map((s, i) => <div key={s.title} className={`phone-card ${i === activeProduct ? 'active' : ''}`}><img src={s.image} alt={s.label} /></div>)}
              </div>
              <div className="screen-caption">{phoneScreens[activeProduct].label}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="clients">
        <div className="container">
          <SectionHeading eyebrow="Our Clients" title="Working with businesses that value technology.">We partner with organizations that want dependable digital experiences and software that can grow with their needs.</SectionHeading>
          <div className="client-card">
            <div className="client-mark">F</div>
            <div className="client-copy"><span>Current Client</span><h3>Freshzo</h3><p>A client relationship represented here as the first entry in Dhriti Infotech's growing portfolio.</p></div>
            <div className="client-arrow"><Icon name="arrow" size={23} /></div>
          </div>
        </div>
      </section>

      <section className="section alt" id="leadership">
        <div className="container">
          <SectionHeading eyebrow="Leadership" title="People behind Dhriti Infotech." center>Focused leadership across technology, product direction, operations and people.</SectionHeading>
          <div className="leadership-grid">
            {/* <article className="leader-card"><div className="leader-avatar">R</div><div><span>Founder&amp; CEO</span><h3>Jyoti Singh</h3><p>Technology, architecture, product engineering and innovation.</p></div></article> */}
            {/* <article className="leader-card"><div className="leader-avatar cyan-bg">J</div><div><span>CFO &amp; HR</span><h3>Jyoti</h3><p>Finance, people operations and organizational growth.</p></div></article> */}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div>
            <SectionHeading eyebrow="Contact Us" title="Let's build something useful together.">Have a product idea, software requirement or partnership opportunity? Reach out to Dhriti Infotech.</SectionHeading>
            <div className="contact-items">
              <a href="tel:+919472501328"><span><Icon name="phone" size={20} /></span><div><small>Call us</small><strong>+91 9472501328</strong></div></a>
              <a href="mailto:infotech.dhriti@gmail.com"><span><Icon name="mail" size={20} /></span><div><small>Email us</small><strong>infotech.dhriti@gmail.com</strong></div></a>
              <div><span><Icon name="pin" size={20} /></span><div><small>Office</small><strong>Hitech City, Hyderabad, Telangana, India</strong></div></div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-head"><div className="mini-logo"><img src={logo} alt="dhritex.com" /></div><div><strong>Dhriti Infotech</strong><span>Technology • Products • Innovation</span></div></div>
            <p>For business enquiries, product discussions and technology partnerships, contact us directly.</p>
            <div className="contact-buttons"><a className="btn primary" href="mailto:infotech.dhriti@gmail.com">Email Dhriti <Icon name="arrow" size={17} /></a><a className="btn outline" href="https://wa.me/919472501328" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> WhatsApp</a></div>
          </div>
        </div>
      </section>


      <footer className="footer">
        <div className="container footer-grid">
          <div><img className="footer-logo" src={logo} alt="dhritex.com" /><p>Building digital products and technology solutions with a focus on simplicity, reliability and scale.</p></div>
          <div><h4>Company</h4><button onClick={() => go('about')}>About</button><button onClick={() => go('products')}>Products</button><button onClick={() => go('clients')}>Clients</button></div>
          <div><h4>Connect</h4><a href="tel:+919472501328">+91 9472501328</a><a href="mailto:infotech.dhriti@gmail.com">infotech.dhriti@gmail.com</a><span>Hitech City, Hyderabad, Telangana</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Dhriti Infotech. All rights reserved.</span><span>dhritex.com</span></div>
      </footer>

      <div className="floating-actions" aria-label="Quick contact">
        <a className="float-action whatsapp" href="https://wa.me/919472501328" target="_blank" rel="noreferrer" aria-label="WhatsApp Dhriti Infotech"><Icon name="whatsapp" size={24} /></a>
        <a className="float-action email" href="mailto:infotech.dhriti@gmail.com" aria-label="Email Dhriti Infotech"><Icon name="mail" size={23} /></a>
      </div>
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><Icon name="arrow" size={19} /></button>
    </div>
  );
}

export default HomePage;
