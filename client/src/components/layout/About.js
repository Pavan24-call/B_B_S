import React, { Fragment } from 'react'

const about = () => {
  return (
    <Fragment>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <header className="header" style={{ display: 'flex', alignItems: 'center', height: '60vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container h-100" style={{ marginTop: '0', display: 'flex', alignItems: 'center' }}>
          <div className="row h-100 align-items-center">
            <div className="col-md-12 text-center">
              <h1 style={{ fontWeight: 700, fontSize: '3rem', background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem' }}>
                About Youth Travels
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                We are India's premier bus booking platform, connecting travelers with high-quality, comfortable, and reliable transport partners. With advanced route layouts, dynamic booking, and a modern customer portal, we bring tech-first transport conveniences right to your fingertips.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="message py-5" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container text-center" style={{ marginTop: 0 }}>
          <h2 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>We've Got What You Need!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 1.5rem auto', lineHeight: '1.7' }}>
            Whether you need a quick interstate commuter, a high-frequency city express, or a premium multi-axle luxury sleeper, Youth Travels connects you with 50+ major cities across thousands of weekly departures.
          </p>
        </div>
      </section>

      <section className="services" style={{ padding: '4rem 0' }}>
        <div className="container py-3" style={{ marginTop: 0 }}>
          <h2 className="text-center" style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '3rem' }}>Our Premium Services</h2>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <i className="fa fa-map-marker myicon" style={{ fontSize: '2.5rem', color: '#8b5cf6', marginBottom: '1.5rem' }}></i>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>Extensive Network</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Access routes stretching across key commercial and holiday hubs including Bengaluru, Hyderabad, Chennai, Mumbai, Pune, and New Delhi.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <i className="fa fa-check-circle myicon" style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '1.5rem' }}></i>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>Trusted Fleet Operators</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    We partner only with verified national and private operators (APSRTC, KSRTC, SETC, Orange Travels, VRL, and SRS) ensuring safety and punctuality.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <i className="fa fa-ticket myicon" style={{ fontSize: '2.5rem', color: '#ec4899', marginBottom: '1.5rem' }}></i>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>Seamless E-Ticketing</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Instant seat selection, secure payment checkouts, and clean printable dynamic tickets generated automatically for your travel convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '4rem 0' }}>
        <div className="container text-center" style={{ marginTop: 0 }}>
          <h2 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Let's Get In Touch!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.7' }}>
            Have questions about bookings, ticket cancellations, or bus operator partnerships? Reach out to our dedicated support line.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', marginTop: '1rem' }}>
            <div>
              <i className="fa fa-phone text-warning" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
              <strong style={{ color: 'var(--text-main)' }}>+91 98765 43210</strong>
            </div>
            <div>
              <i className="fa fa-envelope text-danger" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
              <strong style={{ color: 'var(--text-main)' }}>support@youthtravels.com</strong>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: 'rgba(11, 7, 30, 0.9)', borderTop: '1px solid var(--card-border)', padding: '2rem 0' }}>
        <div className="container text-center" style={{ marginTop: 0 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Copyright © {new Date().getFullYear()} - VNSP Youth Travels Pvt Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </Fragment>
  )
}

export default about