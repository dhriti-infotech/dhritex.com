import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const logo = '/assets/dhritex-logo.png';
const phoneScreens = [
  { title: 'User App', label: 'CareNow patient experience', image: '/assets/carenow-user.jpg' },
  { title: 'Professional App', label: 'Healthcare worker dashboard', image: '/assets/carenow-professional.jpg' },
  { title: 'Login & Onboarding', label: 'Simple OTP-based access', image: '/assets/carenow-login.jpg' },
];

function Icon({ name, size = 22 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8 9.71a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
    cloud: <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4 4 0 0 1 0 8Z"/>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <><path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></>,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L4 20l1.3-3.5A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.7 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c-.1.1-.2.3-.1.5.4.8 1 1.5 1.7 2 .6.4 1.2.7 1.8.9.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.2.7-.1l1.9.9c.3.1.4.3.3.6-.1.5-.3 1-.7 1.3-.4.3-.9.5-1.5.5-1 0-2.5-.5-4.2-1.5-1.4-.9-2.5-2-3.3-3.2-.6-.9-1.1-2-1.1-2.8 0-.6.2-1.1.5-1.5Z"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SectionHeading({ eyebrow, title, children, center = false }) {
  return <div className={`section-heading ${center ? 'center' : ''}`}>
    <span className="eyebrow"><Icon name="spark" size={15} /> {eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>;
}

function App() {
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <div className="about-main-card"><img src="/assets/carenow-professional.jpg" alt="CareNow professional dashboard" /></div>
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
              <a href="tel:+919704240105"><span><Icon name="phone" size={20} /></span><div><small>Call us</small><strong>+91 9704240105</strong></div></a>
              <a href="mailto:infotech.dhriti@gmail.com"><span><Icon name="mail" size={20} /></span><div><small>Email us</small><strong>infotech.dhriti@gmail.com</strong></div></a>
              <div><span><Icon name="pin" size={20} /></span><div><small>Office</small><strong>Hitech City, Hyderabad, Telangana, India</strong></div></div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-card-head"><div className="mini-logo"><img src={logo} alt="dhritex.com" /></div><div><strong>Dhriti Infotech</strong><span>Technology • Products • Innovation</span></div></div>
            <p>For business enquiries, product discussions and technology partnerships, contact us directly.</p>
            <div className="contact-buttons"><a className="btn primary" href="mailto:infotech.dhriti@gmail.com">Email Dhriti <Icon name="arrow" size={17} /></a><a className="btn outline" href="https://wa.me/919704240105" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> WhatsApp</a></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div><img className="footer-logo" src={logo} alt="dhritex.com" /><p>Building digital products and technology solutions with a focus on simplicity, reliability and scale.</p></div>
          <div><h4>Company</h4><button onClick={() => go('about')}>About</button><button onClick={() => go('products')}>Products</button><button onClick={() => go('clients')}>Clients</button></div>
          <div><h4>Connect</h4><a href="tel:+919704240105">+91 9704240105</a><a href="mailto:infotech.dhriti@gmail.com">infotech.dhriti@gmail.com</a><span>Hitech City, Hyderabad, Telangana</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Dhriti Infotech. All rights reserved.</span><span>dhritex.com</span></div>
      </footer>

      <div className="floating-actions" aria-label="Quick contact">
        <a className="float-action whatsapp" href="https://wa.me/919704240105" target="_blank" rel="noreferrer" aria-label="WhatsApp Dhriti Infotech"><Icon name="whatsapp" size={24} /></a>
        <a className="float-action email" href="mailto:infotech.dhriti@gmail.com" aria-label="Email Dhriti Infotech"><Icon name="mail" size={23} /></a>
      </div>
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><Icon name="arrow" size={19} /></button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
