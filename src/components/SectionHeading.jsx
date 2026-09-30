import React from 'react';
import Icon from './Icon';

function SectionHeading({ eyebrow, title, children, center = false }) {
  return <div className={`section-heading ${center ? 'center' : ''}`}>
    <span className="eyebrow"><Icon name="spark" size={15} /> {eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>;
}

export default SectionHeading;
