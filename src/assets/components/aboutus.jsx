import React from 'react';
import Footer from './footer';

export default function AboutUs({ setCurrentPage }) {
  return (
    <>
      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-image">
          <img src="src/image/image2.png" alt="Our Mission" className="full-width-image" loading="lazy" />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At SkillSwap, our mission is to empower everyone to learn, share, and grow by exchanging skills and knowledge.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: '#01579b', marginBottom: '2rem' }}>Our Team</h2>
        <div className="team-members" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="team-member" style={{ maxWidth: '250px' }}>
            <div className="member-photo" style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              backgroundColor: '#01579b', 
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '4rem'
            }}>
              A
            </div>
            <h3 style={{ color: '#0288d1' }}>Ali Alawieh</h3>
            <p>Founder & Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section" style={{ 
        background: '#f7f9fc', 
        padding: '3rem 1rem', 
        textAlign: 'center',
        margin: '2rem 0'
      }}>
        <h2 style={{ color: '#01579b', marginBottom: '2rem' }}>Our Values</h2>
        <div className="values-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="value-card" style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            maxWidth: '300px'
          }}>
            <div className="value-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ color: '#01579b' }}>Community</h3>
            <p>Building connections and fostering collaborative learning environments.</p>
          </div>
          <div className="value-card" style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            maxWidth: '300px'
          }}>
            <div className="value-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
            <h3 style={{ color: '#01579b' }}>Exchange</h3>
            <p>Believing in the power of mutual skill sharing for everyone's growth.</p>
          </div>
          <div className="value-card" style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            maxWidth: '300px'
          }}>
            <div className="value-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ color: '#01579b' }}>Growth</h3>
            <p>Encouraging continuous learning and personal development for all.</p>
          </div>
        </div>
      </section>

      <Footer setCurrentPage={setCurrentPage}/>
    </>
  );
}