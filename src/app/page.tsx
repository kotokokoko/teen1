import React from 'react';

const CountrysideScene: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #d1d5db, #c1d1c1)',
      fontFamily: 'Georgia, serif',
      color: '#2f3e46',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'white',
        opacity: 0.4,
        mixBlendMode: 'overlay',
      }}></div>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        marginBottom: '1rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        Misty Countryside
      </h1>
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        maxWidth: '800px',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: 1.6,
        position: 'relative',
        zIndex: 1,
      }}>
        A drizzly stretch of days settled over the countryside, shrouded in soft mist. 
        The fields were a quiet patchwork of mossy greens and muted tones, simple and 
        understated, as if the world had been washed in watercolour.
      </p>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '300px',
        background: '#5f7470',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, #2f3e46 120%)',
          mixBlendMode: 'multiply',
        }}></div>
      </div>
    </div>
  );
};

export default CountrysideScene;
