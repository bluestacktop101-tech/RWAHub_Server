import React, { useEffect, useRef, useState } from 'react'

/* ─── tiny hook: intersection observer ─────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─── animated counter ─────────────────────────────────────────── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const [ref, inView] = useInView()
  useEffect(() => {
    if (!inView) return
    let start = 0; const step = end / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setVal(Math.floor(start))
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── navbar ────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Platform', 'Assets', 'Infrastructure', 'Investors', 'News']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 2.5rem',
      background: scrolled ? 'rgba(8,12,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '72px',
    }}>
      {/* logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="1" y="1" width="34" height="34" rx="8" stroke="var(--gold)" strokeWidth="1.5"/>
          <path d="M9 27V12l9-3 9 3v15" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 27v-8h10v8" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="13" r="2" fill="var(--gold)" opacity="0.8"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.08em', color: 'var(--text)' }}>
          RWA<span style={{ color: 'var(--gold)' }}>Hub</span>
        </span>
      </div>

      {/* desktop links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {links.map(l => (
          <a key={l} href="#" style={{
            color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l}</a>
        ))}
      </div>

      {/* CTA */}
      <button style={{
        background: 'transparent',
        border: '1.5px solid var(--gold)',
        color: 'var(--gold-light)',
        padding: '0.55rem 1.5rem',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600, fontSize: '0.78rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        cursor: 'pointer', borderRadius: '4px',
        transition: 'all 0.25s ease',
      }}
        onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--bg)' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold-light)' }}
      >Launch App</button>
    </nav>
  )
}

/* ─── hero ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '0 2.5rem 0 4rem',
      position: 'relative', overflow: 'hidden',
      gap: '4rem',
    }}>
      {/* background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}/>
      {/* glow orb */}
      <div style={{
        position: 'absolute', right: '5%', top: '20%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,229,195,0.06) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', left: '0', bottom: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
      }}/>

      {/* left text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,229,195,0.08)', border: '1px solid rgba(0,229,195,0.2)',
          borderRadius: '100px', padding: '0.3rem 0.9rem', marginBottom: '2rem',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
          <span style={{ color: 'var(--teal)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Next-Gen RWA Protocol
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 5.5vw, 5rem)',
          fontWeight: 600, lineHeight: 1.08,
          color: 'var(--text)',
          marginBottom: '1.25rem',
        }}>
          Real Assets,<br/>
          <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Unlocked</span><br/>
          On-Chain.
        </h1>

        <p style={{
          color: 'var(--text-muted)', fontSize: '1rem',
          lineHeight: 1.75, maxWidth: '480px',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-ui)', fontWeight: 400,
        }}>
          RWAHub bridges physical and financial assets to blockchain infrastructure—enabling fractional ownership, global liquidity, and transparent settlement at unprecedented scale.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(135deg, var(--gold) 0%, #a07830 100%)',
            border: 'none', color: 'var(--bg)',
            padding: '0.9rem 2.2rem',
            fontFamily: 'var(--font-ui)', fontWeight: 700,
            fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: '4px',
            boxShadow: '0 0 30px rgba(201,168,76,0.25)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >Get Started</button>

          <button style={{
            background: 'transparent', border: '1px solid var(--border2)',
            color: 'var(--text)', padding: '0.9rem 2rem',
            fontFamily: 'var(--font-ui)', fontWeight: 500,
            fontSize: '0.82rem', letterSpacing: '0.08em',
            cursor: 'pointer', borderRadius: '4px',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--gold-dim)'; e.target.style.color = 'var(--gold-light)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.color = 'var(--text)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
              <polygon points="6,5 12,8 6,11" fill="currentColor"/>
            </svg>
            Watch Overview
          </button>
        </div>

        {/* small stats row */}
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'Assets Tokenized', val: '$4.2B+' },
            { label: 'Global Investors', val: '18,000+' },
            { label: 'Uptime', val: '99.97%' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--gold-light)' }}>{s.val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* right — 3d token visual */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TokenVisual />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes shimmer { 0%{opacity:0.5} 50%{opacity:1} 100%{opacity:0.5} }
      `}</style>
    </section>
  )
}

/* ─── token SVG visual ──────────────────────────────────────────── */
function TokenVisual() {
  return (
    <div style={{ position: 'relative', width: '480px', height: '480px' }}>
      {/* outer orbit ring */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '50%',
        animation: 'spin-slow 30s linear infinite',
      }}>
        {[0, 90, 180, 270].map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            width: 8, height: 8,
            background: 'var(--gold)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: `rotate(${deg}deg) translateX(238px) translateY(-50%)`,
            boxShadow: '0 0 8px var(--gold)',
          }}/>
        ))}
      </div>
      {/* middle ring */}
      <div style={{
        position: 'absolute', inset: '60px',
        border: '1px solid rgba(0,229,195,0.12)',
        borderRadius: '50%',
        animation: 'spin-rev 20s linear infinite',
      }}>
        {[45, 135, 225, 315].map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            width: 5, height: 5,
            background: 'var(--teal)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: `rotate(${deg}deg) translateX(178px) translateY(-50%)`,
            boxShadow: '0 0 6px var(--teal)',
          }}/>
        ))}
      </div>

      {/* center coin */}
      <div style={{
        position: 'absolute', inset: '120px',
        background: 'radial-gradient(circle at 35% 35%, #e8c97a 0%, #c9a84c 40%, #7a5a1a 75%, #3a2a0a 100%)',
        borderRadius: '50%',
        boxShadow: `
          0 0 60px rgba(201,168,76,0.4),
          0 0 120px rgba(201,168,76,0.15),
          inset 0 2px 8px rgba(255,255,255,0.3),
          inset 0 -4px 12px rgba(0,0,0,0.5)
        `,
        animation: 'float 5s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* coin symbol */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <circle cx="50" cy="50" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          {/* R + W letter mark */}
          <text x="50" y="44" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="700" fontFamily="Syne, sans-serif">RWA</text>
          <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="500" fontFamily="Syne, sans-serif" letterSpacing="3">HUB</text>
          <path d="M30 68 Q50 72 70 68" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* floating data cards */}
      <FloatingCard top="8%" right="-8%" label="Real Estate" val="+34.2%" color="var(--gold)" delay="0s"/>
      <FloatingCard top="40%" left="-12%" label="Commodities" val="+18.7%" color="var(--teal)" delay="0.8s"/>
      <FloatingCard bottom="10%" right="0%" label="Private Credit" val="+22.1%" color="var(--gold-light)" delay="1.4s"/>
    </div>
  )
}

function FloatingCard({ top, bottom, left, right, label, val, color, delay }) {
  return (
    <div style={{
      position: 'absolute', top, bottom, left, right,
      background: 'rgba(13,18,25,0.9)',
      border: `1px solid ${color}40`,
      borderRadius: '10px',
      padding: '0.7rem 1rem',
      backdropFilter: 'blur(12px)',
      minWidth: '130px',
      animation: `float 5s ease-in-out infinite`,
      animationDelay: delay,
      boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}20`,
    }}>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: 600, color }}>{val}</div>
    </div>
  )
}

/* ─── stats band ─────────────────────────────────────────────────── */
function StatsBand() {
  const stats = [
    { label: 'Total Value Locked', num: 4200, suffix: 'M+', prefix: '$' },
    { label: 'Asset Classes', num: 12, suffix: '+', prefix: '' },
    { label: 'Active Investors', num: 18000, suffix: '+', prefix: '' },
    { label: 'Countries Supported', num: 47, suffix: '', prefix: '' },
  ]
  return (
    <section style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '4rem 4rem',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
    }}>
      {stats.map(s => {
        const [ref, inView] = useInView()
        return (
          <div key={s.label} ref={ref} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--gold-light)', lineHeight: 1 }}>
              {s.prefix}{inView ? <Counter end={s.num} suffix={s.suffix} /> : `0${s.suffix}`}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>{s.label}</div>
          </div>
        )
      })}
    </section>
  )
}

/* ─── how it works ───────────────────────────────────────────────── */
function HowItWorks() {
  const [ref, inView] = useInView()
  const steps = [
    { n: '01', title: 'Asset Onboarding', desc: 'Submit your real-world asset for due diligence. Our smart legal wrappers handle jurisdiction-specific compliance and documentation.' },
    { n: '02', title: 'Tokenization', desc: 'Assets are converted to ERC-3643 compliant digital tokens with on-chain provenance, audit trails, and embedded compliance rules.' },
    { n: '03', title: 'Fractional Distribution', desc: 'Tokens are distributed to verified investors globally, enabling fractional ownership from as little as $100.' },
    { n: '04', title: 'On-Chain Settlement', desc: 'Smart contracts automate distributions, reporting, and secondary market trading with full transparency and finality.' },
  ]
  return (
    <section style={{ padding: '8rem 4rem', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <SectionLabel>How It Works</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--text)', marginTop: '1rem' }}>
          From Physical to Digital—<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Seamlessly.</span>
        </h2>
      </div>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: 'var(--border)' }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            background: 'var(--bg)', padding: '2.5rem 2rem',
            transition: 'background 0.3s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, background 0.3s`,
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-dim)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>{s.n}</div>
            <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: '1.5rem' }}/>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', marginBottom: '1rem' }}>{s.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── asset classes ──────────────────────────────────────────────── */
function AssetClasses() {
  const assets = [
    { icon: '🏢', label: 'Real Estate', desc: 'Commercial, residential, and industrial properties across global markets.', tag: 'Most Popular' },
    { icon: '🥇', label: 'Commodities', desc: 'Precious metals, agricultural goods, and energy resources.', tag: '' },
    { icon: '📊', label: 'Private Credit', desc: 'Corporate loans, SME debt, and structured credit instruments.', tag: '' },
    { icon: '💎', label: 'Collectibles', desc: 'Luxury goods, fine art, vintage wines, and rare memorabilia.', tag: 'New' },
    { icon: '⚡', label: 'Infrastructure', desc: 'Renewable energy, transportation, and utility assets.', tag: '' },
    { icon: '🌐', label: 'IP & Royalties', desc: 'Intellectual property, music rights, and streaming royalties.', tag: 'Coming Soon' },
  ]
  const [ref, inView] = useInView()
  return (
    <section style={{ padding: '8rem 4rem', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <SectionLabel>Asset Classes</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--text)', marginTop: '1rem' }}>
            Every Asset Class,<br/><span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>One Platform.</span>
          </h2>
        </div>
        <a href="#" style={{ color: 'var(--gold)', fontSize: '0.82rem', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '2px' }}>
          View All Assets →
        </a>
      </div>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
        {assets.map((a, i) => (
          <AssetCard key={a.label} {...a} delay={i * 0.1} visible={inView}/>
        ))}
      </div>
    </section>
  )
}

function AssetCard({ icon, label, desc, tag, delay, visible }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{
      background: hover ? 'var(--bg3)' : 'var(--bg2)',
      padding: '2.5rem 2rem',
      cursor: 'pointer', position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, background 0.3s`,
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {tag && <div style={{
        position: 'absolute', top: '1rem', right: '1rem',
        fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        padding: '0.2rem 0.6rem', borderRadius: '100px',
        background: tag === 'New' ? 'rgba(0,229,195,0.15)' : tag === 'Coming Soon' ? 'rgba(255,255,255,0.05)' : 'rgba(201,168,76,0.15)',
        color: tag === 'New' ? 'var(--teal)' : tag === 'Coming Soon' ? 'var(--text-dim)' : 'var(--gold)',
        border: `1px solid ${tag === 'New' ? 'rgba(0,229,195,0.3)' : tag === 'Coming Soon' ? 'var(--border)' : 'rgba(201,168,76,0.3)'}`,
      }}>{tag}</div>}
      <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: hover ? 'var(--gold-light)' : 'var(--text)', marginBottom: '0.75rem', transition: 'color 0.3s' }}>{label}</h3>
      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{desc}</p>
      {hover && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), var(--teal))' }}/>}
    </div>
  )
}

/* ─── infrastructure section ─────────────────────────────────────── */
function Infrastructure() {
  const [ref, inView] = useInView()
  const pillars = [
    { title: 'Smart Contract Automation', detail: 'EVM-compatible contracts automate compliance checks, distributions, and governance—eliminating intermediaries.' },
    { title: 'Institutional-Grade Security', detail: 'Multi-sig custody, hardware security modules, and regular third-party audits protect every asset on platform.' },
    { title: 'Regulatory Compliance', detail: 'Built-in KYC/AML, jurisdiction-aware token restrictions, and automated reporting for 40+ regulatory frameworks.' },
    { title: 'Cross-Chain Liquidity', detail: 'Bridge assets across Ethereum, Polygon, Avalanche, and Arbitrum for maximum liquidity and composability.' },
  ]
  return (
    <section style={{ padding: '8rem 4rem', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '50%', height: '70%', background: 'radial-gradient(ellipse at right, rgba(0,229,195,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        <div>
          <SectionLabel>Infrastructure</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--text)', marginTop: '1rem', marginBottom: '1.5rem' }}>
            Built for<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Institutional Scale.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '480px' }}>
            RWAHub's infrastructure stack is engineered for the demands of global asset markets—combining enterprise-grade security with the openness of decentralized protocols.
          </p>
          <div ref={ref} style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {pillars.map((p, i) => (
              <InfraPillar key={p.title} {...p} delay={i * 0.12} visible={inView}/>
            ))}
          </div>
        </div>
        {/* architecture diagram */}
        <ArchDiagram />
      </div>
    </section>
  )
}

function InfraPillar({ title, detail, delay, visible }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      padding: '1.25rem 0', cursor: 'pointer',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }} onClick={() => setOpen(!open)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: open ? 'var(--gold-light)' : 'var(--text)', transition: 'color 0.2s' }}>{title}</span>
        <span style={{ color: 'var(--gold)', fontSize: '1.2rem', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>+</span>
      </div>
      {open && <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.75, marginTop: '0.75rem', paddingRight: '2rem' }}>{detail}</p>}
    </div>
  )
}

function ArchDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
      {[
        { layer: 'Application Layer', items: ['Investor Portal', 'Asset Dashboard', 'Analytics'], color: 'var(--gold)' },
        { layer: 'Protocol Layer', items: ['Smart Contracts', 'Compliance Engine', 'Oracle Network'], color: 'var(--teal)' },
        { layer: 'Settlement Layer', items: ['Ethereum L1', 'Polygon zkEVM', 'Arbitrum One'], color: '#a78bfa' },
        { layer: 'Data Layer', items: ['On-chain Registry', 'IPFS Storage', 'Chain Indexer'], color: '#60a5fa' },
      ].map(l => (
        <div key={l.layer} style={{ background: 'var(--bg3)', padding: '1.5rem 2rem' }}>
          <div style={{ fontSize: '0.65rem', color: l.color, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>{l.layer}</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {l.items.map(it => (
              <span key={it} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', background: `${l.color}12`, border: `1px solid ${l.color}30`, borderRadius: '4px', color: 'var(--text-muted)' }}>{it}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── testimonials ───────────────────────────────────────────────── */
function Testimonials() {
  const quotes = [
    { q: 'RWAHub gave our fund direct access to private credit markets that were previously gated behind million-dollar minimums. The transparency on-chain is unmatched.', name: 'Sarah K.', role: 'CIO, Meridian Capital' },
    { q: "We tokenized three commercial properties in under 30 days. The compliance tooling handled EU regulations automatically—something that would've taken months manually.", name: 'Thomas R.', role: 'CEO, Vertex Real Estate' },
    { q: 'The fractional ownership model transformed how our clients invest in infrastructure. RWAHub is defining the next era of alternative assets.', name: 'Priya N.', role: 'Head of DeFi, Frontier Asset Management' },
  ]
  return (
    <section style={{ padding: '8rem 4rem', background: 'var(--bg2)' }}>
      <SectionLabel style={{ textAlign: 'center', display: 'block' }}>What Clients Say</SectionLabel>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 600, color: 'var(--text)', marginTop: '1rem', marginBottom: '4rem', textAlign: 'center' }}>
        Trusted by <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Institutions</span> Worldwide.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {quotes.map((t, i) => (
          <div key={i} style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '2.5rem',
            transition: 'border-color 0.3s, transform 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '1.8rem', color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', marginBottom: '1.25rem', lineHeight: 1 }}>"</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{t.q}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dim), var(--bg3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>{t.name[0]}</div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── CTA section ────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{
      padding: '8rem 4rem', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}/>
      <SectionLabel>Get Started</SectionLabel>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, color: 'var(--text)', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.1, position: 'relative' }}>
        The Future of Asset<br/>Ownership Starts <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Here.</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '560px', marginBottom: '3rem', position: 'relative' }}>
        Join thousands of investors and asset owners who are redefining how value is accessed, traded, and managed in the digital age.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        <button style={{
          background: 'linear-gradient(135deg, var(--gold) 0%, #a07830 100%)',
          border: 'none', color: 'var(--bg)', padding: '1rem 2.5rem',
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.85rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          borderRadius: '4px', boxShadow: '0 0 40px rgba(201,168,76,0.3)',
          transition: 'all 0.25s ease',
        }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >Launch Your Portfolio</button>
        <button style={{
          background: 'transparent', border: '1px solid var(--border2)',
          color: 'var(--text)', padding: '1rem 2rem',
          fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: '0.85rem',
          letterSpacing: '0.06em', cursor: 'pointer', borderRadius: '4px',
          transition: 'all 0.25s ease',
        }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--gold-dim)'; e.target.style.color = 'var(--gold-light)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.color = 'var(--text)' }}
        >Talk to Sales</button>
      </div>
    </section>
  )
}

/* ─── footer ─────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: 'Platform', links: ['Asset Tokenization', 'Fractional Ownership', 'Secondary Market', 'Smart Contracts'] },
    { title: 'Assets', links: ['Real Estate', 'Private Credit', 'Commodities', 'Collectibles'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Risk Disclosure', 'Compliance'] },
  ]
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '5rem 4rem 3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        {/* brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect x="1" y="1" width="34" height="34" rx="8" stroke="var(--gold)" strokeWidth="1.5"/>
              <path d="M9 27V12l9-3 9 3v15" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 27v-8h10v8" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.08em' }}>RWA<span style={{ color: 'var(--gold)' }}>Hub</span></span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: '280px' }}>
            Bridging physical value with digital liquidity. Redefining how assets are owned, accessed, and exchanged worldwide.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            {['𝕏', 'in', '◎'].map(icon => (
              <div key={icon} style={{
                width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; e.currentTarget.style.color = 'var(--gold-light)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >{icon}</div>
            ))}
          </div>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>{col.title}</div>
            {col.links.map(l => (
              <a key={l} href="#" style={{
                display: 'block', fontSize: '0.83rem', color: 'var(--text-muted)',
                textDecoration: 'none', marginBottom: '0.75rem',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>© 2025 RWAHub Inc. All rights reserved.</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>v2.4.1 · Mainnet Live</span>
      </div>
    </footer>
  )
}

/* ─── shared label component ──────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: 'var(--teal)',
      fontFamily: 'var(--font-mono)',
    }}>
      <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--teal)', verticalAlign: 'middle' }}/>
      {children}
      <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--teal)', verticalAlign: 'middle' }}/>
    </div>
  )
}

/* ─── app ────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBand />
      <HowItWorks />
      <AssetClasses />
      <Infrastructure />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  )
}
