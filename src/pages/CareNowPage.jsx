import React, { useState } from 'react';
import Icon from '../components/Icon';
import { SITE_CONFIG } from '../config';

const patientShots = [
  ['Patient home', '/assets/screenshots/patient-12.jpg', 'Explore the patient experience and available options.'],
  ['Choose a service', '/assets/screenshots/patient-42.jpg', 'Review the service journey and details before requesting care.'],
  ['Request flow', '/assets/screenshots/patient-78.jpg', 'See the steps shown while creating a service request.'],
  ['Request progress', '/assets/screenshots/patient-120.jpg', 'Follow request progress using the options available in the app.'],
];
const professionalShots = [
  ['Professional home', '/assets/screenshots/pro-12.jpg', 'An overview of the professional-side experience.'],
  ['Manage work', '/assets/screenshots/pro-42.jpg', 'Review the service workflow from the professional perspective.'],
  ['Request details', '/assets/screenshots/pro-78.jpg', 'See how request information is presented.'],
  ['Professional tools', '/assets/screenshots/pro-120.jpg', 'Explore more of the professional application.'],
];
function CareNowPage({ onOpenAdmin }) {
  const [tab, setTab] = useState('patient');
  const shots = tab === 'patient' ? patientShots : professionalShots;
  return <div className="site-shell carenow-site">
    <nav className="navbar care-navbar"><div className="container nav-inner">
      <a className="brand care-brand" href="#/" aria-label="Dhritex home"><img src={SITE_CONFIG.logo} alt="dhritex.com"/></a>
      <a className="care-nav-product" href="#top" aria-label="CareNow home"><img src="/assets/carenow-logo.png" alt="CareNow — Healthcare Closer to You"/></a>
      <div className="care-nav-actions">
        {/* <a className="btn primary nav-care-download" href="https://drive.google.com/uc?export=download&confirm=t&id=1SghimhPw56DQDdXp39RwKkP22tuiVh32"><Icon name="android" size={19}/> Download App
        </a> */}
      <a
        className="nav-download"
        href="https://github.com/dhriti-infotech/dhritex.com/releases/latest/download/carenow-beta.apk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download CareNow Android beta APK"
      >
        <span className="android-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
            <path d="M7.1 5.2 5.8 3.3a.5.5 0 0 1 .8-.6L8 4.7a8.7 8.7 0 0 1 8 0l1.4-2a.5.5 0 0 1 .8.6l-1.3 1.9A7.8 7.8 0 0 1 20 11H4a7.8 7.8 0 0 1 3.1-5.8ZM7 12h10v6.2a1.8 1.8 0 0 1-1.8 1.8h-.7v2a1 1 0 0 1-2 0v-2h-2v2a1 1 0 0 1-2 0v-2h-.7A1.8 1.8 0 0 1 7 18.2V12ZM4 12h2v5.5a1 1 0 0 1-2 0V12Zm14 0h2v5.5a1 1 0 0 1-2 0V12Z" />
          </svg>
        </span>
        <span>CareNow</span>
      </a>

        <button className="care-admin-btn" onClick={onOpenAdmin} title="CareNow Admin Tool" aria-label="Open CareNow admin tool"><Icon name="terminal" size={21}/></button></div>
    </div></nav>
    <header className="care-hero" id="top"><div className="container care-hero-grid"><div className="care-hero-copy"><span className="eyebrow"><Icon name="heart" size={15}/> Home healthcare platform</span><h1>Healthcare <span>closer to you.</span></h1><p>CareNow helps patients request eligible home healthcare services and gives qualified professionals a digital way to manage service requests, availability and earnings.</p><div className="hero-actions"><a className="btn primary" href="#patient-guide">I'm looking for care <Icon name="arrow" size={18}/></a><a className="btn outline" href="#professional-guide">I'm a healthcare professional</a></div><div className="care-hero-note"><Icon name="shield" size={19}/><span>Designed to make home healthcare requests easier to navigate. Service availability depends on location and professional availability.</span></div></div><div className="care-hero-logo trustbees-visual"><div className="care-logo-glow"/><div className="trust-phone-shadow"/><div className="trust-phone-frame"><div className="trust-phone-notch"/><img src="/assets/screenshots/patient-42.jpg" alt="CareNow app screen showing nearby care professional matching"/><div className="trust-phone-home"/></div><div className="trust-float-card trust-float-top"><span className="trust-float-icon"><Icon name="heart" size={18}/></span><span><strong>Care at home</strong><small>Healthcare closer to you</small></span></div><div className="trust-float-card trust-float-bottom"><span className="trust-online-dot"/><span><strong>Request care</strong><small>From your phone</small></span></div></div></div></header>
    <section className="care-problem section"><div className="container"><div className="section-heading center"><span className="eyebrow">Why CareNow?</span><h2>Make arranging care feel simpler.</h2><p>Finding and coordinating home healthcare can take time. CareNow brings service requests and professional workflows into one digital experience.</p></div><div className="care-value-grid"><article><span className="care-value-icon"><Icon name="home" size={24}/></span><h3>For patients &amp; families</h3><p>Explore available services, share the care you need and submit a request from home.</p></article><article><span className="care-value-icon"><Icon name="users" size={24}/></span><h3>For professionals</h3><p>Eligible healthcare professionals can manage their profile, availability and incoming requests.</p></article><article><span className="care-value-icon"><Icon name="map-pin" size={24}/></span><h3>A connected journey</h3><p>Keep request details and supported progress updates together in the app.</p></article></div></div></section>
    <section className="section carenow-services" id="services"><div className="container"><div className="section-heading center"><span className="eyebrow">Home healthcare services</span><h2>Care for everyday health needs, at home.</h2><p>Explore the service categories CareNow is designed to support. Availability and final pricing depend on the selected service and the details shown in the app.</p></div><div className="service-price-note"><span className="service-price-symbol">₹</span><div><strong>Services start at ₹399 + applicable GST</strong><p>₹399 is the minimum service price discussed for CareNow. Check the app for the final price and any additional charges before submitting a request.</p></div></div><div className="service-cards-grid">{[
['Wound Care','Dressing changes and support for routine wound care, as appropriate.','wound-care'],
['Injection Administration','Support with prescribed injections by an eligible professional.','injection'],
['IV Infusion Support','At-home assistance for prescribed infusion-related care, subject to eligibility.','iv-support'],
['Catheter Care','Support with routine catheter-related care and hygiene.','catheter-care'],
['Post-operative Care','Help with routine care needs during recovery after a procedure.','post-operative'],
['Elderly Care','Assistance with day-to-day care needs for older adults.','elderly-care'],
['Vital Signs Monitoring','Support with checking and recording vital signs.','vital-signs'],
['Medication Assistance','Help with prescribed medication routines, within professional scope.','medication-assistance'],
['General Nursing Care','Home nursing support based on the service options available in the app.','general-nursing']
].map(([name,desc,imageName])=><article className="service-price-card" key={name}><img className="service-card-image" src={`/assets/services/${imageName}.webp`} alt={`${name} home healthcare service`} loading="lazy"/><div className="service-card-copy"><h3>{name}</h3><p>{desc}</p></div><div className="service-card-price"><small>Starting price</small><strong>₹399 <em>+ GST</em></strong></div></article>)}</div><p className="service-disclaimer">Service categories above are informational. Not every service may be available in every location or app version. The service catalogue, professional eligibility, and final price displayed in CareNow at the time of booking take precedence. CareNow is not an emergency response service.</p></div></section>
    <section className="section alt" id="patient-guide"><div className="container"><div className="section-heading"><span className="eyebrow">Patient Guide</span><h2>How to request care with CareNow</h2><p>Follow the steps below to understand the patient journey. Screens and options may vary by app version and service availability.</p></div><div className="care-steps"><article><b>01</b><h3>Create an account</h3><p>Sign in using the authentication options available in the app.</p></article><article><b>02</b><h3>Choose a service</h3><p>Browse the services currently listed and review the displayed details and pricing.</p></article><article><b>03</b><h3>Add your location</h3><p>Choose or enter the address where you need the service and provide the requested details.</p></article><article><b>04</b><h3>Submit your request</h3><p>Check your information and submit the request for the next step in the workflow.</p></article><article><b>05</b><h3>Follow progress</h3><p>Review status updates and assigned professional information when available in the app.</p></article></div>
      <div className="demo-panel"><div className="demo-copy"><span className="directory-kicker">Watch the walkthrough</span><h3>Patient app demo</h3><p>See the patient-side experience in action, from exploring the app to submitting and following a request.</p><a className="text-link" href="#patient-video">Watch video <Icon name="arrow" size={17}/></a></div><div className="demo-phone-wrap"><div className="demo-phone-frame"><span className="demo-phone-camera"/><video id="patient-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/screenshots/patient-42.jpg"><source src="/assets/carenow-patient-demo.mp4" type="video/mp4"/>Your browser does not support embedded video.</video><span className="demo-phone-home"/></div></div></div>
      <div className="screenshot-heading"><div><span className="directory-kicker">Inside the app</span><h3>Patient app screenshots</h3></div><p>Frames selected from the uploaded demo video.</p></div><div className="care-screenshot-grid">{patientShots.map(([title,src,desc])=><article className="care-shot" key={title}><img src={src} alt={title}/><div><h4>{title}</h4><p>{desc}</p></div></article>)}</div>
    </div></section>
    <section className="section" id="professional-guide"><div className="container"><div className="section-heading"><span className="eyebrow">Professional Guide</span><h2>Support your work, in one place.</h2><p>CareNow is designed for eligible healthcare professionals to manage their profile and service requests through the app.</p></div><div className="professional-benefits"><article><Icon name="user-check" size={23}/><div><h3>Register &amp; submit credentials</h3><p>Provide requested profile details and qualification documents for review.</p></div></article><article><Icon name="toggle-right" size={23}/><div><h3>Manage availability</h3><p>Use availability controls to indicate whether you can receive service requests.</p></div></article><article><Icon name="clipboard" size={23}/><div><h3>Review requests</h3><p>Check request information and respond using the options available in the application.</p></div></article><article><Icon name="wallet" size={23}/><div><h3>Track earnings &amp; charges</h3><p>Review service-related earnings and applicable platform charges in the dashboard.</p></div></article></div>
      <div className="demo-panel professional-demo"><div className="demo-copy"><span className="directory-kicker">Watch the walkthrough</span><h3>Professional app demo</h3><p>Explore the professional-side experience, including profile and service-request workflows.</p><a className="text-link" href="#professional-video">Watch video <Icon name="arrow" size={17}/></a></div><div className="demo-phone-wrap"><div className="demo-phone-frame"><span className="demo-phone-camera"/><video id="professional-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/screenshots/pro-42.jpg"><source src="/assets/carenow-professional-demo.mp4" type="video/mp4"/>Your browser does not support embedded video.</video><span className="demo-phone-home"/></div></div></div>
      <div className="screenshot-heading"><div><span className="directory-kicker">Inside the app</span><h3>Professional app screenshots</h3></div><p>Frames selected from the uploaded demo video.</p></div><div className="care-screenshot-grid">{professionalShots.map(([title,src,desc])=><article className="care-shot" key={title}><img src={src} alt={title}/><div><h4>{title}</h4><p>{desc}</p></div></article>)}</div>
    </div></section>
    <section className="care-trust section alt"><div className="container care-trust-grid"><div><span className="eyebrow">Trust &amp; transparency</span><h2>Care that starts with clear information.</h2><p>CareNow is designed to support the connection between patients and eligible healthcare professionals. Professional approval is subject to document review and platform requirements. Service availability, response times and tracking depend on the service and operational status.</p></div><div className="trust-note"><Icon name="alert-circle" size={25}/><div><h3>Need emergency medical help?</h3><p>CareNow is not an emergency response service. If someone may be experiencing a medical emergency, contact local emergency services immediately.</p></div></div></div></section>
    <section className="care-faq section"><div className="container"><div className="section-heading center"><span className="eyebrow">FAQs</span><h2>Good to know</h2></div><div className="faq-grid"><article><h3>Does submitting a request confirm a booking?</h3><p>Not necessarily. A request may need to be reviewed or accepted, and depends on professional availability.</p></article><article><h3>Who can register as a professional?</h3><p>Eligible professionals must provide the credentials required by CareNow and complete the platform's review process.</p></article><article><h3>Are service prices fixed?</h3><p>Review the price and terms shown in the app for the selected service before submitting your request.</p></article><article><h3>How can I get support?</h3><p>Contact Dhriti Infotech using the contact details below for product and platform enquiries.</p></article></div><div className="care-final-cta"><div><h2>Explore CareNow for yourself.</h2><p>Review the demo, then continue to the available app download.</p></div>
    {/* <a className="btn primary" href="https://drive.google.com/uc?export=download&confirm=t&id=1SghimhPw56DQDdXp39RwKkP22tuiVh32"><Icon name="android" size={19}/>
     Download CareNow
     </a> */}

      <a
        className="nav-download"
        href="https://github.com/dhriti-infotech/dhritex.com/releases/latest/download/carenow-beta.apk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download CareNow Android beta APK"
      >
        <span className="android-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
            <path d="M7.1 5.2 5.8 3.3a.5.5 0 0 1 .8-.6L8 4.7a8.7 8.7 0 0 1 8 0l1.4-2a.5.5 0 0 1 .8.6l-1.3 1.9A7.8 7.8 0 0 1 20 11H4a7.8 7.8 0 0 1 3.1-5.8ZM7 12h10v6.2a1.8 1.8 0 0 1-1.8 1.8h-.7v2a1 1 0 0 1-2 0v-2h-2v2a1 1 0 0 1-2 0v-2h-.7A1.8 1.8 0 0 1 7 18.2V12ZM4 12h2v5.5a1 1 0 0 1-2 0V12Zm14 0h2v5.5a1 1 0 0 1-2 0V12Z" />
          </svg>
        </span>
        <span>Download CareNow</span>
      </a>
     </div></div></section>
    <footer className="footer"><div className="container footer-grid"><div><img className="footer-logo" src={SITE_CONFIG.logo} alt="dhritex.com"/><p>CareNow is a Dhriti Infotech product designed to bring home healthcare closer to you.</p></div><div><h4>CareNow</h4><a href="#patient-guide">Patient guide</a><a href="#professional-guide">Professional guide</a><a href="#top">Back to top</a></div><div><h4>Contact &amp; support</h4><a href="tel:+919472501328">+91 9472501328</a><a href="mailto:infotech.dhriti@gmail.com">infotech.dhriti@gmail.com</a><a href="https://dhritex.com">dhritex.com</a></div></div><div className="container footer-bottom"><span>© 2026 Dhriti Infotech. All rights reserved.</span><a href="#/">All products</a></div></footer>
  </div>;
}
export default CareNowPage;
