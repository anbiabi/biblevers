import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSenseComponent: React.FC<AdSenseProps> = ({
  adSlot = "auto",
  adFormat = "auto",
  style = { display: 'block' },
  className = ""
}) => {
  useEffect(() => {
    try {
      // Initialize AdSense ads
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-5147010217156651"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

export default AdSenseComponent;