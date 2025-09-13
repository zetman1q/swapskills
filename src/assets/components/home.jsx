import React from 'react';
import Footer from './footer';

export default function Home({ setCurrentPage }) {
    return (<>
      <div id='hero' className='hero-container'>
        <div className='hero-text'>
          <h1>Welcome to SkillSwap</h1>
          <h2>Exchange Skills • Learn Together • Grow Together</h2>
          <p className="hero-subtitle">
            Join thousands of learners teaching and learning skills in a collaborative community
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => setCurrentPage('Skills')}>Start Learning Now</button>
            {/* <button className="cta-secondary">Browse Skills</button> */}
          </div>
        </div>
        <div className='hero-image'>
          <img src="src/image/image4.png" alt="Skill Swap Community" loading="lazy" />
        </div>
      </div>
      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-image">
          <img src="src/image/image2.png" alt="Our Mission" className="full-width-image" loading="lazy" />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At SkillSwap, our mission is to empower everyone to learn, share, and grow by exchanging skills and knowledge. We believe learning should be accessible, collaborative, and fun for all.
          </p>
        </div>
      </section>
      {/* feature section */}
      <div id='feature' className='feature-container'>
        <div className='feature-text'>
          <h2>Website Features</h2>
          <div className='feature-cards'>
            <div className='feature-card feature-exchange'>
              <span className='feature-icon'>🔄</span>
              <h3>Skill Exchange System</h3>
              <p>Let users teach a skill they know and learn one in return — no money needed.</p>
              <blockquote>“Teach design, learn coding — simple and fair.”</blockquote>
            </div>
            <div className='feature-card feature-community'>
              <span className='feature-icon'>👥</span>
              <h3>Community-Based Learning</h3>
              <p>Connect with other teens or learners who share your interests and goals.</p>
              <blockquote>“Learn together, grow together.”</blockquote>
            </div>
            <div className='feature-card feature-schedule'>
              <span className='feature-icon'>🕓</span>
              <h3>Flexible Scheduling</h3>
              <p>Users can set their own time and availability for swaps or sessions.</p>
              <blockquote>“Your time, your pace.”</blockquote>
            </div>
            <div className='feature-card feature-review'>
              <span className='feature-icon'>⭐</span>
              <h3>Review and Rating System</h3>
              <p>Allow learners to leave feedback and build trust in the community.</p>
              <blockquote>“Great learning starts with great people.”</blockquote>
            </div>
          </div>
        </div>
        <div className='feature-image'>
          <img src="src/image/image1.png" alt="Features" loading="lazy" />
        </div>
      </div>
      {/* How It Works Section */}
<section className="how-it-works-section">
  <h2>How It Works</h2>
  <div className="how-it-works-roadmap">
    <div className="how-it-works-step">
      <strong>Sign Up</strong>
      <span>Create your free SkillSwap account.</span>
    </div>
    <div className="how-it-works-step">
      <strong>Add Your Skills</strong>
      <span>List what you can teach and what you want to learn.</span>
    </div>
    <div className="how-it-works-step">
      <strong>Find a Match</strong>
      <span>Browse and connect with other users.</span>
    </div>
    <div className="how-it-works-step">
      <strong>Swap & Learn</strong>
      <span>Schedule a session and start learning together!</span>
    </div>
  </div>
</section>
{/* footer */}

<Footer setCurrentPage={setCurrentPage} />
      
      </>)
    }
