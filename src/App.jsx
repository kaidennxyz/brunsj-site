import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream: #FAF5EE;
    --warm-white: #FDF9F4;
    --beige: #EDE0CE;
    --sand: #D9C4A8;
    --terracotta: #B87055;
    --rust: #9B5E3F;
    --brown: #3D2412;
    --dark-brown: #241509;
    --sage: #8E9E82;
    --sage-light: #C5CEB9;
    --blush: #E8C4B0;
    --gold: #C9A96E;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--cream);
    color: var(--brown);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .display { font-family: 'Playfair Display', serif; }
  .italic { font-family: 'Cormorant Garamond', serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 60px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.4s ease;
  }
  .nav.scrolled {
    background: rgba(250, 245, 238, 0.92);
    backdrop-filter: blur(12px);
    padding: 14px 60px;
    border-bottom: 1px solid var(--sand);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 600;
    color: var(--brown); letter-spacing: 1px;
  }
  .nav-logo span { color: var(--terracotta); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 13px; font-weight: 400; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--brown);
    text-decoration: none; opacity: 0.75;
    transition: opacity 0.2s;
  }
  .nav-links a:hover { opacity: 1; }
  .nav-cta {
    background: var(--terracotta); color: white;
    padding: 10px 24px; border-radius: 100px;
    font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
    border: none; cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-cta:hover { background: var(--rust); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--warm-white);
    display: grid; grid-template-columns: 1fr 1fr;
    position: relative; overflow: hidden;
  }
  .hero-left {
    display: flex; flex-direction: column;
    justify-content: center; padding: 120px 60px 80px;
    position: relative; z-index: 2;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 28px;
  }
  .hero-tag-line { width: 36px; height: 1px; background: var(--terracotta); }
  .hero-tag span {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--terracotta); font-weight: 500;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(52px, 5.5vw, 80px);
    line-height: 1.1; font-weight: 500;
    color: var(--dark-brown); margin-bottom: 20px;
  }
  .hero-title em { color: var(--terracotta); font-style: italic; }
  .hero-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 300; font-style: italic;
    color: var(--brown); opacity: 0.75; margin-bottom: 40px;
    line-height: 1.7; max-width: 400px;
  }
  .hero-btns { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--terracotta); color: white;
    padding: 15px 32px; border-radius: 100px;
    font-size: 14px; letter-spacing: 1px; text-transform: uppercase;
    border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: all 0.3s;
  }
  .btn-primary:hover { background: var(--rust); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,112,85,0.35); }
  .btn-ghost {
    background: transparent; color: var(--brown);
    padding: 14px 28px; border-radius: 100px;
    border: 1.5px solid var(--sand); cursor: pointer;
    font-size: 14px; letter-spacing: 1px; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .btn-ghost:hover { border-color: var(--terracotta); color: var(--terracotta); }
  .hero-stats {
    margin-top: 60px; display: flex; gap: 40px;
    padding-top: 40px; border-top: 1px solid var(--sand);
  }
  .stat-item { }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 32px; font-weight: 600; color: var(--dark-brown);
  }
  .stat-label {
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--terracotta); opacity: 0.8; margin-top: 4px;
  }

  .hero-right {
    position: relative; overflow: hidden;
  }
  .hero-bg-img {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--beige) 0%, var(--blush) 50%, var(--sand) 100%);
  }
  .hero-float-card {
    position: absolute; background: white;
    border-radius: 20px; padding: 20px 24px;
    box-shadow: 0 20px 60px rgba(61,36,18,0.12);
  }
  .hero-card-1 {
    bottom: 80px; left: 20px;
    width: 200px;
    animation: float1 4s ease-in-out infinite;
  }
  .hero-card-2 {
    top: 100px; right: 30px;
    width: 170px;
    animation: float2 5s ease-in-out infinite;
  }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
  .fc-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--terracotta); margin-bottom: 6px; }
  .fc-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--dark-brown); }
  .fc-price { font-size: 13px; color: var(--sage); margin-top: 4px; font-weight: 500; }

  /* decorative rings */
  .hero-ring {
    position: absolute; border-radius: 50%; border: 1px solid;
    opacity: 0.15;
  }
  .ring-1 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%); border-color: var(--terracotta); }
  .ring-2 { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%,-50%); border-color: var(--rust); }

  /* bakery illustrations in hero */
  .hero-illustration {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 360px; height: 360px;
    background: radial-gradient(circle, var(--blush) 0%, var(--beige) 60%, transparent 100%);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 100px;
  }

  /* MARQUEE */
  .marquee-wrap {
    background: var(--terracotta);
    padding: 14px 0; overflow: hidden;
  }
  .marquee-track {
    display: flex; gap: 0;
    animation: marquee 25s linear infinite;
    white-space: nowrap;
  }
  .marquee-item {
    display: inline-flex; align-items: center; gap: 20px;
    padding: 0 30px;
    font-size: 13px; letter-spacing: 3px; text-transform: uppercase;
    color: white; opacity: 0.92;
  }
  .marquee-dot { width: 5px; height: 5px; background: rgba(255,255,255,0.5); border-radius: 50%; }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ABOUT */
  .about {
    padding: 120px 60px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; max-width: 1200px; margin: 0 auto;
  }
  .about-visual {
    position: relative; height: 560px;
  }
  .about-img-main {
    position: absolute; top: 0; left: 0; right: 60px; bottom: 60px;
    background: linear-gradient(160deg, var(--beige), var(--blush));
    border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
    font-size: 80px;
    box-shadow: 0 30px 80px rgba(61,36,18,0.1);
  }
  .about-img-accent {
    position: absolute; bottom: 0; right: 0;
    width: 200px; height: 200px;
    background: var(--sage-light);
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
    box-shadow: 0 15px 40px rgba(61,36,18,0.1);
  }
  .about-badge {
    position: absolute; top: 30px; right: 80px;
    background: var(--terracotta); color: white;
    width: 100px; height: 100px; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 10px 30px rgba(184,112,85,0.4);
  }
  .about-badge-num { font-size: 24px; font-weight: 600; }
  .about-badge-text { font-size: 10px; letter-spacing: 1px; text-align: center; opacity: 0.9; }
  .section-tag {
    display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;
  }
  .section-tag-line { width: 30px; height: 1px; background: var(--terracotta); }
  .section-tag span {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--terracotta);
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 3.5vw, 52px);
    line-height: 1.15; font-weight: 500;
    color: var(--dark-brown); margin-bottom: 20px;
  }
  .section-title em { font-style: italic; color: var(--terracotta); }
  .section-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 300; line-height: 1.8;
    color: var(--brown); opacity: 0.85; margin-bottom: 16px;
  }
  .about-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
  .pill {
    padding: 8px 18px; border-radius: 100px;
    border: 1.5px solid var(--sand);
    font-size: 13px; color: var(--brown); letter-spacing: 0.5px;
    font-family: 'DM Sans', sans-serif;
  }

  /* MENU */
  .menu-section {
    background: var(--dark-brown); padding: 100px 60px;
    position: relative; overflow: hidden;
  }
  .menu-header {
    text-align: center; margin-bottom: 64px;
  }
  .menu-header .section-tag { justify-content: center; }
  .menu-header .section-title { color: var(--cream); }
  .menu-header .section-title em { color: var(--blush); }
  .menu-subtitle {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 20px; color: var(--sand); opacity: 0.8; margin-top: 12px;
  }

  .menu-tabs {
    display:flex;
    justify-content:center;
    margin-bottom:48px;
    background:rgba(255,255,255,.06);
    border-radius:100px; padding:5px;
    width:fit-content;
    max-width:100%;
    margin-left:auto;
    margin-right:auto;
    flex-wrap:wrap;
    gap:4px;
    overflow-x:auto;
  }

  .menu-tab {
    padding:8px 16px;
    border-radius:100px;
    border:none;
    background:transparent;
    color:var(--sand);
    font-size:11px;
    letter-spacing:1px;
    text-transform:uppercase;
    cursor:pointer;
    transition:all .3s;
    font-family:'DM Sans',sans-serif;
    white-space:nowrap;
    }
  
  .menu-tab.active {
    background: var(--terracotta); color: white;
    box-shadow: 0 4px 16px rgba(184,112,85,0.4);
  }

  .menu-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    max-width: 1100px; margin: 0 auto;
  }
  .menu-card {
    background: rgba(255,255,255,0.06); border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 28px; transition: all 0.3s; cursor: pointer;
    position: relative; overflow: hidden;
  }
  .menu-card::before {
    content: ''; position: absolute; inset: 0; border-radius: 20px;
    background: linear-gradient(135deg, rgba(184,112,85,0.1) 0%, transparent 100%);
    opacity: 0; transition: opacity 0.3s;
  }
  .menu-card:hover { transform: translateY(-4px); border-color: rgba(184,112,85,0.3); }
  .menu-card:hover::before { opacity: 1; }
  .menu-card-emoji { font-size: 42px; margin-bottom: 16px; }
  .menu-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; color: var(--cream); margin-bottom: 8px;
  }
  .menu-card-desc {
    font-size: 14px; color: var(--sand); opacity: 0.7;
    line-height: 1.6; margin-bottom: 20px;
  }
  .menu-card-footer { display: flex; justify-content: space-between; align-items: center; }
  .menu-price {
    font-family: 'Playfair Display', serif; font-size: 22px;
    color: var(--gold);
  }
  .menu-badge {
    padding: 4px 12px; border-radius: 100px;
    background: rgba(184,112,85,0.25); border: 1px solid rgba(184,112,85,0.4);
    font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
    color: var(--blush);
  }

  /* GALLERY */
  .gallery-section { padding:100px 60px; background:var(--warm-white); }
  .gallery-header { max-width:540px; margin-bottom:60px; }
  .gallery-grid { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:280px 280px; gap:16px; max-width:1200px; }
  .gallery-item { border-radius:20px; overflow:hidden; position:relative; cursor:pointer; }
  .gallery-item-inner { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:64px; transition:transform .4s; }
  .gallery-item:hover .gallery-item-inner { transform:scale(1.08); }
  .gallery-item-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(36,21,9,.7) 0%,transparent 50%); opacity:0; transition:opacity .3s; display:flex; align-items:flex-end; padding:24px; }
  .gallery-item:hover .gallery-item-overlay,
  .gallery-item:focus .gallery-item-overlay,
  .gallery-item:active .gallery-item-overlay { opacity:1; }
  .gallery-item-label { font-family:'Playfair Display',serif; font-style:italic; color:white; font-size:18px; }
  .gallery-item:nth-child(1) { grid-row:1/3; background:linear-gradient(160deg,var(--beige),var(--blush)); }
  .gallery-item:nth-child(2) { background:linear-gradient(160deg,var(--sand),var(--beige)); }
  .gallery-item:nth-child(3) { background:linear-gradient(160deg,var(--sage-light),var(--beige)); }
  .gallery-item:nth-child(4) { background:linear-gradient(160deg,var(--blush),var(--sand)); }
  .gallery-item:nth-child(5) { background:linear-gradient(160deg,var(--beige),var(--sage-light)); }

  /* VISIT */
  .visit-section {
    padding: 100px 60px;
    background: linear-gradient(160deg, var(--beige) 0%, var(--cream) 100%);
  }
  .visit-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center;
  }
  .visit-info-title {
    font-family: 'Playfair Display', serif; font-size: 48px;
    color: var(--dark-brown); line-height: 1.2; margin-bottom: 32px;
  }
  .visit-info-title em { font-style: italic; color: var(--terracotta); }
  .visit-cards { display: flex; flex-direction: column; gap: 16px; }
  .visit-card {
    background: white; border-radius: 16px; padding: 20px 24px;
    display: flex; align-items: flex-start; gap: 16px;
    box-shadow: 0 4px 20px rgba(61,36,18,0.06);
    text-align: left;
  }
  .visit-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--blush); display: flex; align-items: center;
    justify-content: center; font-size: 20px; flex-shrink: 0;
  }
  .visit-card-title { font-weight: 500; font-size: 15px; color: var(--dark-brown); margin-bottom: 4px; }
  .visit-card-text { font-size: 14px; color: var(--brown); opacity: 0.75; line-height: 1.6; text-align: left;}

  .map-placeholder {
    background: linear-gradient(160deg, var(--sand), var(--beige));
    border-radius: 24px; height: 400px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    box-shadow: 0 20px 60px rgba(61,36,18,0.1);
  }
  .map-placeholder-emoji { font-size: 60px; }
  .map-placeholder-text {
    font-family: 'Playfair Display', serif; font-size: 22px;
    color: var(--dark-brown); text-align: center;
  }
  .map-placeholder-sub { font-size: 14px; color: var(--brown); opacity: 0.7; text-align: center; }
  .map-btn {
    background: var(--terracotta); color: white;
    padding: 12px 28px; border-radius: 100px;
    border: none; cursor: pointer; font-size: 14px;
    font-family: 'DM Sans', sans-serif; letter-spacing: 1px;
    transition: all 0.3s; text-decoration: none; display: inline-block;
  }
  .map-btn:hover { background: var(--rust); transform: translateY(-2px); }

  /* TESTIMONIALS */
  .testi-section { padding: 100px 60px; background: var(--warm-white); }
  .testi-header { text-align: center; margin-bottom: 60px; }
  .testi-header .section-tag { justify-content: center; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
  .testi-card {
    background: var(--cream); border-radius: 20px; padding: 32px;
    border: 1px solid var(--sand); transition: all 0.3s;
    text-align: left;
  }
  .testi-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(61,36,18,0.1); }
  .testi-stars { color: var(--gold); font-size: 16px; margin-bottom: 16px; letter-spacing: 2px; }
  .testi-text {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 18px; line-height: 1.75; color: var(--brown);
    margin-bottom: 24px;
  }
  .testi-author { display: flex; align-items: center; gap: 12px; text-align: left; }
  .testi-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--blush); display: flex; align-items: center;
    justify-content: center; font-size: 20px;
  }
  .testi-name { font-weight: 500; font-size: 14px; color: var(--dark-brown); text-align: left; }
  .testi-handle { font-size: 12px; color: var(--terracotta); text-align: left; }

  /* FOOTER */
  .footer { background: var(--dark-brown); padding: 72px 60px 36px; }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px; margin-bottom: 60px;
    padding-bottom: 60px; border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .footer-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 28px; color: var(--cream); margin-bottom: 16px;
  }
  .footer-brand-name span { color: var(--terracotta); }
  .footer-tagline {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 16px; color: var(--sand); opacity: 0.7; margin-bottom: 28px; line-height: 1.6;
  }
  .footer-socials { display: flex; gap: 12px; }
  .social-btn {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(255,255,255,0.08); border: none; cursor: pointer;
    font-size: 16px; transition: all 0.3s; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
  }
  .social-btn:hover { background: var(--terracotta); transform: translateY(-2px); }
  .footer-col-title {
    font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--terracotta); margin-bottom: 20px; font-weight: 500;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a {
    font-size: 14px; color: var(--sand); opacity: 0.75;
    text-decoration: none; transition: opacity 0.2s;
  }
  .footer-links a:hover { opacity: 1; }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-size: 13px; color: var(--sand); opacity: 0.5; }
  .footer-legal { display: flex; gap: 24px; }
  .footer-legal a { font-size: 13px; color: var(--sand); opacity: 0.5; text-decoration: none; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--sand); border-radius: 4px; }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
  .nav { padding: 16px 24px; }
  .nav.scrolled { padding: 12px 24px; }
  .nav-links, .nav-cta { display: none; }
  .hero { grid-template-columns: 1fr; }
  .hero-right { display: none; }
  .hero-left { padding: 100px 24px 60px; }
  .about, .visit-inner { grid-template-columns: 1fr; gap: 40px; }
  .about-visual { height: 300px; }
  .menu-tabs { border-radius: 16px; width: 100%; justify-content: space-around; }
  .menu-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .menu-card { padding: 18px; }
  .menu-card-name { font-size: 15px; }
  .testi-grid { grid-template-columns: 1fr; }
  .about, .menu-section, .gallery-section, .visit-section, .testi-section, .footer { padding: 60px 24px; }
  .menu-section { padding: 60px 16px; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }

  .gallery-section { padding: 60px 16px; }
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: none; gap: 12px; width: 100%; }
  .gallery-item { height: 160px; border-radius: 16px; }
  .gallery-item:nth-child(1) { grid-column: 1 / -1; height: 200px; grid-row: auto; }
  .gallery-item:nth-child(2) { grid-column: auto; height: 160px; }
  .gallery-item:nth-child(3) { grid-column: auto; height: 160px; }
  .gallery-item:nth-child(4) { grid-column: auto; height: 160px; }
  .gallery-item:nth-child(5) { grid-column: auto; height: 160px; }
  .gallery-item-inner { font-size: 40px; height: 100%; }
  .gallery-item-overlay { opacity: 1; }
}
`;

const menuData = {
  // ── CAKES ─────────────────────────────────────────────────
  cakes: [
    { emoji: "🍰", name: "OG Burnt Cheesecake",           desc: "The classic that started it all — silky, caramelised, impossibly creamy basque.",              price: "Rp 65K", badge: "Signature"  },
    { emoji: "🍫", name: "Choco Mousse BBC",               desc: "Half dark chocolate mousse, half burnt cheesecake — rich, luscious, never too sweet.",         price: "Rp 40K", badge: "Bestseller" },
    { emoji: "🍒", name: "Blackforest Tiramisu",           desc: "Dark chocolate + espresso-soaked ladyfingers layered with mascarpone and sour cherries.",       price: "Rp 55K", badge: "New"        },
    { emoji: "☕", name: "Tiramisu Cake",                  desc: "Creamy, not-too-sweet tiramisu served straight from the tray — coffee lovers' dream.",          price: "Rp 45K", badge: "Creamy"     },
    { emoji: "🔥", name: "Crème Brûlée Burnt Cheesecake", desc: "Caramelised sugar crust meets our silky basque — a beautiful two-textured dessert.",            price: "Rp 65K", badge: "Classic"    },
    { emoji: "🍮", name: "Molten Choco Mousse Tart",       desc: "Collab masterpiece — warm molten centre, chocolate mousse, crispy cheese tart shell.",         price: "Rp 72K", badge: "Limited"    },
  ],

  // ── PASTRIES ──────────────────────────────────────────────
  pastries: [
    { emoji: "🥐", name: "Original Salt Bread",            desc: "Pillowy soft inside, golden and buttery outside — baked fresh every single morning.",          price: "Rp 16K", badge: "Daily Baked" },
    { emoji: "🍫", name: "Chocolate Salt Bread",           desc: "Our famous salt bread filled generously with rich dark chocolate — gooey every bite.",         price: "Rp 18K", badge: "Fan Fave"   },
    { emoji: "🧀", name: "Cream Cheese Croissant",         desc: "Flaky laminated dough stuffed with whipped cream cheese and a drizzle of honey.",              price: "Rp 32K", badge: "Popular"    },
    { emoji: "🍵", name: "Matcha Soufflé Roll",            desc: "Airy Japanese-style roll filled with uji matcha cream and white chocolate drizzle.",           price: "Rp 45K", badge: "Limited"    },
    { emoji: "🌀", name: "Cinnamon Sugar Roll",            desc: "Soft-baked roll coated in cinnamon butter glaze — warm, fragrant, utterly comforting.",        price: "Rp 28K", badge: "Warm"       },
    { emoji: "🫧", name: "Lotus Biscoff Tart",             desc: "Buttery tart shell layered with Biscoff spread and creamy custard filling.",                   price: "Rp 38K", badge: "Viral"      },
  ],

  // ── MAINS ─────────────────────────────────────────────────
  mains: [
    { emoji: "🍝", name: "Chicken Alfredo",                desc: "Creamy parmesan sauce, tender chicken, and fresh herbs over perfectly al dente pasta.",        price: "Rp 68K", badge: "Popular"    },
    { emoji: "🍜", name: "Miso Beef Noodle",               desc: "Savoury miso broth with tender sliced beef, silky noodles, and a soft-boiled egg.",            price: "Rp 55K", badge: "Umami"      },
    { emoji: "🥪", name: "Triple Onion Sandwich",          desc: "Caramelised, crispy, and pickled onions triple-layered into a toasted brioche sandwich.",      price: "Rp 38K", badge: "Savoury"    },
    { emoji: "🍄", name: "Truffle Mushroom Toast",         desc: "Sourdough toast topped with sautéed forest mushrooms and a generous drizzle of truffle oil.",  price: "Rp 55K", badge: "Veg"        },
    { emoji: "🥭", name: "Coco Mango Bowl",                desc: "Fresh tropical salad bowl with coconut flakes, ripe mango, and zesty lime dressing.",          price: "Rp 35K", badge: "Fresh"      },
    { emoji: "🍳", name: "Brunsj Brunch Plate",            desc: "Eggs your way, salt bread toast, sautéed greens, and a side of our house-made jam.",           price: "Rp 72K", badge: "Set"        },
  ],

  // ── DRINKS ────────────────────────────────────────────────
  drinks: [
    { emoji: "☕", name: "Spanish Latte",                  desc: "Rich espresso over condensed milk and fresh milk — the classic crowd-pleaser.",                price: "Rp 32K", badge: "Classic"    },
    { emoji: "🍹", name: "Bons Drink",                    desc: "Brunsj's signature house drink — fruity, refreshing, and endlessly Instagrammable.",           price: "Rp 27K", badge: "Signature"  },
    { emoji: "🥛", name: "Brunsj Latte",                  desc: "Hana Roastery beans, steamed local milk, pulled to silky perfection in-house.",                price: "Rp 35K", badge: "House Blend" },
    { emoji: "🍵", name: "Matcha Latte",                  desc: "Ceremonial grade matcha whisked smooth, paired with your choice of oat or dairy milk.",        price: "Rp 35K", badge: "Trending"   },
    { emoji: "🧃", name: "Coco Lychee Fizz",              desc: "Sparkling coconut water with lychee syrup and fresh lime — light and tropical.",               price: "Rp 28K", badge: "Seasonal"   },
    { emoji: "🎂", name: "Coffee + Cake Set",             desc: "Any espresso drink paired with your choice of cake slice — the perfect Brunsj duo.",           price: "Rp 75K", badge: "Best Value" },
  ],
};

const galleryItems = [
  { emoji: "🏠", label: "The Bake House" },
  { emoji: "🍰", label: "Signature Cheesecake" },
  { emoji: "☕", label: "Morning Coffee" },
  { emoji: "🥐", label: "Fresh Pastries" },
  { emoji: "🌸", label: "Our Corner" },
];

export default function BrunsjBakeHouse() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("cakes");
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [activeTab]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">Brunsj <span>·</span> Bake House</div>
        <ul className="nav-links">
          {["About", "Menu", "Gallery", "Visit"].map(l => (
            <li key={l}><a href="#" onClick={e => { e.preventDefault(); scrollTo(l.toLowerCase()); }}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("footer")}>Find Us</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-tag">
            <div className="hero-tag-line" />
            <span>Surabaya's Pioneer Cheesecake</span>
          </div>
          <h1 className="hero-title display">
            Baked with<br /><em>Love,</em><br />Served with Soul.
          </h1>
          <p className="hero-sub italic">
            Where every bite tells a story — from our kitchen to your heart, handcrafted daily in the heart of Surabaya.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("menu")}>Explore Menu</button>
            <button className="btn-ghost" onClick={() => scrollTo("about")}>Our Story</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num display">17K+</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-item">
              <div className="stat-num display">∞</div>
              <div className="stat-label">Happy Bites</div>
            </div>
            <div className="stat-item">
              <div className="stat-num display">2</div>
              <div className="stat-label">Bake House</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-bg-img" />
          <div className="hero-ring ring-1" />
          <div className="hero-ring ring-2" />
          <div className="hero-illustration">📍</div>
          <div className="hero-float-card hero-card-1">
            <div className="fc-label">Open Today</div>
            <div className="fc-title display">11AM - 9PM</div>
            <div className="fc-price" style={{color:"var(--sage)"}}>Jl. Wonorejo Permai 63, Wonorejo</div>
          </div>
          <div className="hero-float-card hero-card-2">
            <div className="fc-label">Open Today</div>
            <div className="fc-title display">11AM — 9PM</div>
            <div className="fc-price" style={{color:"var(--sage)"}}>Jl. Nias 96, Gubeng</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{display:"inline-flex"}}>
              {["🥐 Fresh Baked Daily", "🍰 Signature Cheesecakes", "☕ Artisan Coffee", "🌸 Aesthetic Vibes", "🍫 Seasonal Specials", "🏠 Bake House Surabaya"].map((item, j) => (
                <span key={j} className="marquee-item">{item}<span className="marquee-dot" /></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{background:"var(--warm-white)"}}>
        <div className="about">
          <div className="about-visual fade-in">
            <div className="about-img-main">🏠</div>
            <div className="about-img-accent">🍰</div>
            <div className="about-badge">
              <div className="about-badge-num display">No. 1</div>
              <div className="about-badge-text">Cheesecake<br/>Pioneer</div>
            </div>
          </div>
          <div className="fade-in">
            <div className="section-tag">
              <div className="section-tag-line" />
              <span>Our Story</span>
            </div>
            <h2 className="section-title display">From a <em>small ruko</em> to a full Bake House</h2>
            <p className="section-body italic">
              What began as Surabaya's first burnt cheesecake shop in a humble East Surabaya ruko has blossomed into something bigger — a full Bake House experience at Jl. Nias 96, Gubeng.
            </p>
            <p className="section-body italic">
              At Brunsj, we believe in food that feels like a warm hug. Every cheesecake is hand-mixed, every pastry is shaped with intention, and every dish on our menu carries a piece of our heart.
            </p>
            <div className="about-pills">
              {["Handcrafted Daily", "No Preservatives", "Local Ingredients", "Aesthetic Space", "Dine In & Takeaway"].map(p => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="menu-section">
        <div className="menu-header fade-in">
          <div className="section-tag">
            <div className="section-tag-line" style={{background:"var(--blush)"}} />
            <span style={{color:"var(--blush)"}}>What We Bake</span>
          </div>
          <h2 className="section-title display">Our <em>Menu</em></h2>
          <p className="menu-subtitle italic">Handcrafted with seasonal ingredients, served with love</p>
        </div>
        <div className="menu-tabs fade-in">
          {[["cakes", "🍰 Cakes"], ["pastries", "🥐 Pastries"], ["mains", "🍝 Mains"], ["drinks", "☕ Drinks"]].map(([id, label]) => (
            <button key={id} className={`menu-tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item, i) => (
            <div key={i} className="menu-card fade-in">
              <div className="menu-card-emoji">{item.emoji}</div>
              <div className="menu-card-name display">{item.name}</div>
              <div className="menu-card-desc">{item.desc}</div>
              <div className="menu-card-footer">
                <div className="menu-price display">{item.price}</div>
                <div className="menu-badge">{item.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery-section">
        <div className="gallery-header fade-in">
          <div className="section-tag">
            <div className="section-tag-line" />
            <span>Our Space</span>
          </div>
          <h2 className="section-title display">A place as <em>beautiful</em> as what's inside</h2>
          <p className="section-body italic">Every corner of Brunsj Bake House is designed to delight — from the warm interiors to the artisan displays.</p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div key={i} className="gallery-item fade-in">
              <div className="gallery-item-inner">{item.emoji}</div>
              <div className="gallery-item-overlay">
                <div className="gallery-item-label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="testi-header fade-in">
          <div className="section-tag">
            <div className="section-tag-line" />
            <span>Kind Words</span>
          </div>
          <h2 className="section-title display">What our guests <em>say</em></h2>
        </div>
        <div className="testi-grid">
          {[
            { text: "Pioneer cheesecake di Surabaya! Brunsj sudah jadi tempat favorit saya sejak awal buka. Sekarang dengan Bake House-nya, makin sempurna.", name: "Ariel F.", handle: "@arif_erza", emoji: "🌸" },
            { text: "The blackforest tiramisu is a masterpiece — balance of chocolate and espresso that I've never tasted anywhere else in Surabaya. Must try!", name: "Maya P.", handle: "@mayaprmtsr", emoji: "✨" },
            { text: "Tempat yang penuh dengan aesthetic things — dari dekornya, cakenya, semuanya eye pleasing. Worth every rupiah and every visit!", name: "Calista R.", handle: "@calistar_", emoji: "🍰" },
          ].map((t, i) => (
            <div key={i} className="testi-card fade-in">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text italic">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.emoji}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-handle">{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="visit-section">
        <div className="visit-inner">
          <div className="fade-in">
            <div className="section-tag">
              <div className="section-tag-line" />
              <span>Come Visit</span>
            </div>
            <h2 className="visit-info-title display">We can't wait to<br /><em>welcome you.</em></h2>
            <div className="visit-cards">
              <div className="visit-card">
                <div className="visit-icon">📍</div>
                <div>
                  <div className="visit-card-title">Address</div>
                  <div className="visit-card-text">Jl. Nias No. 96, Gubeng,<br />Surabaya, East Java</div>
                </div>
              </div>
              <div className="visit-card">
                <div className="visit-icon">🕐</div>
                <div>
                  <div className="visit-card-title">Opening Hours</div>
                  <div className="visit-card-text">Monday – Sunday<br />11:00 AM – 9:00 PM</div>
                </div>
              </div>
              <div className="visit-card">
                <div className="visit-icon">📱</div>
                <div>
                  <div className="visit-card-title">Follow & Order</div>
                  <div className="visit-card-text">@__brunsj on Instagram & TikTok<br />DM for catering & bulk orders</div>
                </div>
              </div>
            </div>
          </div>
          <div className="fade-in">
            <div className="map-placeholder">
              <div className="map-placeholder-emoji">🗺️</div>
              <div className="map-placeholder-text display">Brunsj Bake House</div>
              <div className="map-placeholder-sub">Jl. Nias No. 96, Gubeng, Surabaya</div>
              <a href="https://maps.app.goo.gl/KigSETZQdP3QFUgA7" target="_blank" rel="noopener noreferrer" className="map-btn">Open in Maps</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name display">Brunsj <span>·</span> Bake House</div>
            <div className="footer-tagline italic">"Baked with love, served with soul — Surabaya's pioneer cheesecake, now a full Bake House experience."</div>
            <div className="footer-socials">
              <a href="https://www.instagram.com/__brunsj/" target="_blank" rel="noopener noreferrer" className="social-btn">📸</a>
              <a href="https://www.tiktok.com/@__brunsj" target="_blank" rel="noopener noreferrer" className="social-btn">🎵</a>
              <a href="https://maps.app.goo.gl/KigSETZQdP3QFUgA7" target="_blank" rel="noopener noreferrer" className="social-btn">📍</a>
              <a href="https://maps.app.goo.gl/TqfVm8yce9MrcHN18" target="_blank" rel="noopener noreferrer" className="social-btn">📍</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Menu</div>
            <ul className="footer-links">
              {[
                { label: "Signature Cheesecakes", tab: "cakes" },
                { label: "Pastries & Bread",      tab: "pastries" },
                { label: "Main Course",           tab: "mains" },
                { label: "Coffee & Drinks",       tab: "drinks" },
              ].map(item => (
                <li key={item.label}>
                  <a href="#" onClick={e => {
                    e.preventDefault();
                    setActiveTab(item.tab);
                    scrollTo("menu");
                  }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Visit</div>
            <ul className="footer-links">
              {["Dine In", "Takeaway", "Catering", "Bulk Orders", "Gift Vouchers"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              {[
                { label: "Instagram",   href: "https://www.instagram.com/__brunsj/" },
                { label: "TikTok",      href: "https://www.tiktok.com/@__brunsj" },
                { label: "Google Maps (Gubeng)", href: "https://maps.app.goo.gl/KigSETZQdP3QFUgA7" },
                { label: "Google Maps (Wonorejo)", href: "https://maps.app.goo.gl/TqfVm8yce9MrcHN18" },
              ].map(item => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">©2026 Brunsj Bake House. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}