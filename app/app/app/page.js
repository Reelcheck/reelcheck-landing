"use client";

import { useState, useEffect } from "react";

const FONTS = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Satoshi:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap";

// â”€â”€â”€ Translations â”€â”€â”€
const TX = {
  fr: {
    nav: { how: "MÃ©thode", compare: "vs Booking", pricing: "Tarifs", cta: "AccÃ¨s anticipÃ©" },
    hero: {
      tag: "Avis vidÃ©o pour l'hÃ´tellerie",
      h1a: "La preuve",
      h1b: "en vidÃ©o.",
      h1c: "Pas en mots.",
      sub: "Vos clients filment. ReelCheck diffuse. Vos rÃ©servations directes augmentent.",
      cta1: "Tester gratuitement",
      cta2: "Voir comment",
      scroll: "DÃ©filer",
    },
    metrics: {
      items: [
        { num: "1 800â‚¬", text: "perdus chaque mois via Booking" },
        { num: "18Ã—", text: "moins cher que les OTA" },
        { num: "47K+", text: "vues gÃ©nÃ©rÃ©es pour vos clients" },
      ]
    },
    method: {
      title: "4 Ã©tapes",
      sub: "Du check-in Ã  la rÃ©servation suivante.",
      steps: [
        { num: "01", title: "Check-in", text: "Le voyageur arrive. Il reÃ§oit un lien unique par email pour filmer son sÃ©jour." },
        { num: "02", title: "Il filme", text: "Chambre, restaurant, vue. 60 secondes avec son tÃ©lÃ©phone. Rien Ã  installer." },
        { num: "03", title: "Il poste", text: "Upload direct ou publication sur TikTok / Instagram. Vous validez en un clic." },
        { num: "04", title: "Ã‡a convertit", text: "La vidÃ©o apparaÃ®t sur votre site. Elle tourne sur nos rÃ©seaux. Le prochain client rÃ©serve en direct." },
      ]
    },
    editorial: {
      kicker: "Le problÃ¨me",
      title: "Booking empoche 20%. Vos clients ne voient que des photos retouchÃ©es.",
      col1: "90â‚¬ la nuit. Booking prend 18â‚¬. Sur 100 rÃ©servations : 1 800â‚¬/mois envolÃ©s. 21 600â‚¬/an. Et vous n'avez aucun contact direct avec votre client.",
      col2: "Les avis texte sont morts. Faux avis achetÃ©s, photos trompeuses, notes manipulÃ©es. Le voyageur ne fait plus confiance Ã  ce qu'il lit. Il veut voir. La vidÃ©o ne ment pas.",
    },
    compare: {
      title: "Le calcul",
      sub: "100 nuits vendues / mois Ã  90â‚¬",
      headers: ["", "Booking", "ReelCheck"],
      rows: [
        { label: "CA brut", a: "9 000â‚¬", b: "9 000â‚¬", type: "normal" },
        { label: "Commission", a: "- 1 800â‚¬", b: "0â‚¬", type: "highlight" },
        { label: "CoÃ»t mensuel", a: "â€”", b: "- 99â‚¬", type: "normal" },
        { label: "Vous gardez", a: "7 200â‚¬", b: "8 901â‚¬", type: "total" },
        { label: "VisibilitÃ© offerte", a: "0", b: "~47K vues", type: "highlight" },
      ],
      bottom: "Vous rÃ©cupÃ©rez 1 701â‚¬/mois. Soit 20 412â‚¬/an.",
    },
    viral: {
      kicker: "L'effet rÃ©seau",
      title: "Vos clients font votre pub. Gratuitement.",
      text: "Chaque vidÃ©o vit sur TikTok, Instagram et YouTube via la page ReelCheck. Plus le rÃ©seau grandit, plus votre hÃ´tel est vu. Vous ne payez pas de publicitÃ© â€” vos clients la crÃ©ent pour vous.",
      cards: [
        { platform: "TikTok", format: "Compilations et classements hÃ´tels" },
        { platform: "Instagram", format: "Reels et stories partagÃ©es" },
        { platform: "YouTube", format: "Guides de voyage par rÃ©gion" },
      ]
    },
    pricing: {
      title: "Deux offres. ZÃ©ro commission.",
      sub: "Vous payez un forfait fixe. Pas un pourcentage de votre travail.",
      plans: [
        {
          name: "Pro",
          price: "99",
          desc: "Tout ce qu'il faut pour remplacer Booking",
          features: [
            "Avis vidÃ©o illimitÃ©s",
            "Widget vidÃ©o sur votre site",
            "Email automatique au check-in",
            "Tableau de bord et statistiques",
            "Badge Â« Avis vÃ©rifiÃ©s Â»",
            "Diffusion sur la page ReelCheck",
            "Widget personnalisable",
          ],
          cta: "Essai gratuit â€” 3 mois",
          pop: true,
          savings: "Vous Ã©conomisez 1 701â‚¬/mois vs Booking",
        },
        {
          name: "Business",
          price: "199",
          desc: "Pour les hÃ´tels qui veulent tout automatiser",
          features: [
            "Tout le plan Pro inclus",
            "IntÃ©gration PMS (Amenitiz, Mews...)",
            "Contenu crÃ©Ã© par ReelCheck pour vos rÃ©seaux",
            "Analytics avancÃ©s + export API",
            "Support dÃ©diÃ© et onboarding personnalisÃ©",
            "Widget sur mesure Ã  vos couleurs",
            "Mise en avant prioritaire sur nos rÃ©seaux",
          ],
          cta: "Prendre rendez-vous",
          pop: false,
          savings: "IdÃ©al pour les hÃ´tels de +30 chambres",
        },
      ],
      note: "Engagement annuel : 2 mois offerts. Sans engagement : rÃ©siliable Ã  tout moment.",
      guarantee: "Satisfait ou remboursÃ© pendant 30 jours.",
    },
    quotes: [
      { text: "On est passÃ©s de 30% Ã  55% de rÃ©servations directes en 4 mois.", name: "Sophie L.", hotel: "Auberge des Cimes, Annecy" },
      { text: "Une vidÃ©o client a fait 12 000 vues sur TikTok. De la pub qu'on n'aurait jamais pu s'offrir.", name: "Thomas R.", hotel: "Le Continental, Lyon" },
    ],
    final: {
      title: "Vos prochains clients veulent voir votre hÃ´tel. Pas le lire.",
      cta: "Tester gratuitement",
      note: "3 mois offerts â€” sans carte bancaire â€” sans engagement",
    },
    footer: "Â© 2026 ReelCheck â€” L'avis vidÃ©o qui prouve tout.",
  },
  en: {
    nav: { how: "Method", compare: "vs Booking", pricing: "Pricing", cta: "Early access" },
    hero: {
      tag: "Video reviews for hospitality",
      h1a: "Proof",
      h1b: "on video.",
      h1c: "Not in words.",
      sub: "Your guests film. ReelCheck distributes. Your direct bookings grow.",
      cta1: "Try for free",
      cta2: "See how",
      scroll: "Scroll",
    },
    metrics: {
      items: [
        { num: "â‚¬1,800", text: "lost every month via Booking" },
        { num: "18Ã—", text: "cheaper than OTAs" },
        { num: "47K+", text: "views generated for your clients" },
      ]
    },
    method: {
      title: "4 steps",
      sub: "From check-in to the next booking.",
      steps: [
        { num: "01", title: "Check-in", text: "Guest arrives. They get a unique link by email to film their stay." },
        { num: "02", title: "They film", text: "Room, restaurant, view. 60 seconds on their phone. Nothing to install." },
        { num: "03", title: "They post", text: "Direct upload or TikTok / Instagram post. You approve with one click." },
        { num: "04", title: "It converts", text: "The video shows on your site. It spreads on our channels. The next guest books direct." },
      ]
    },
    editorial: {
      kicker: "The problem",
      title: "Booking takes 20%. Your guests only see retouched photos.",
      col1: "â‚¬90/night. Booking takes â‚¬18. Over 100 bookings: â‚¬1,800/month gone. â‚¬21,600/year. And you have zero direct contact with your guest.",
      col2: "Text reviews are dead. Bought reviews, misleading photos, gamed ratings. Travellers don't trust what they read anymore. They want to see. Video doesn't lie.",
    },
    compare: {
      title: "The math",
      sub: "100 nights sold / month at â‚¬90",
      headers: ["", "Booking", "ReelCheck"],
      rows: [
        { label: "Gross revenue", a: "â‚¬9,000", b: "â‚¬9,000", type: "normal" },
        { label: "Commission", a: "- â‚¬1,800", b: "â‚¬0", type: "highlight" },
        { label: "Monthly cost", a: "â€”", b: "- â‚¬99", type: "normal" },
        { label: "You keep", a: "â‚¬7,200", b: "â‚¬8,901", type: "total" },
        { label: "Free visibility", a: "0", b: "~47K views", type: "highlight" },
      ],
      bottom: "You recover â‚¬1,701/month. That's â‚¬20,412/year.",
    },
    viral: {
      kicker: "The network effect",
      title: "Your guests do your marketing. For free.",
      text: "Every video lives on TikTok, Instagram and YouTube through the ReelCheck page. The bigger the network, the more your hotel gets seen. You don't pay for ads â€” your guests create them.",
      cards: [
        { platform: "TikTok", format: "Compilations and hotel rankings" },
        { platform: "Instagram", format: "Shared Reels and stories" },
        { platform: "YouTube", format: "Travel guides by region" },
      ]
    },
    pricing: {
      title: "Two plans. Zero commission.",
      sub: "You pay a flat fee. Not a percentage of your hard work.",
      plans: [
        {
          name: "Pro",
          price: "99",
          desc: "Everything you need to replace Booking",
          features: [
            "Unlimited video reviews",
            "Video widget on your site",
            "Automated check-in email",
            "Dashboard and analytics",
            "\"Verified reviews\" badge",
            "Distribution on ReelCheck page",
            "Customisable widget",
          ],
          cta: "Free trial â€” 3 months",
          pop: true,
          savings: "You save â‚¬1,701/month vs Booking",
        },
        {
          name: "Business",
          price: "199",
          desc: "For hotels that want full automation",
          features: [
            "Full Pro plan included",
            "PMS integration (Amenitiz, Mews...)",
            "Content created by ReelCheck for your channels",
            "Advanced analytics + API export",
            "Dedicated support and personalised onboarding",
            "Fully custom-branded widget",
            "Priority featuring on our channels",
          ],
          cta: "Book a call",
          pop: false,
          savings: "Ideal for hotels with 30+ rooms",
        },
      ],
      note: "Annual commitment: 2 months free. Monthly: cancel anytime.",
      guarantee: "30-day money-back guarantee.",
    },
    quotes: [
      { text: "We went from 30% to 55% direct bookings in 4 months.", name: "Sophie L.", hotel: "Auberge des Cimes, Annecy" },
      { text: "One guest video got 12,000 views on TikTok. Free advertising we could never have afforded.", name: "Thomas R.", hotel: "Le Continental, Lyon" },
    ],
    final: {
      title: "Your next guests want to see your hotel. Not read about it.",
      cta: "Try for free",
      note: "3 months free â€” no credit card â€” no commitment",
    },
    footer: "Â© 2026 ReelCheck â€” The video review that proves everything.",
  }
};

// â”€â”€â”€ Design tokens â”€â”€â”€
const ff = "'Satoshi', sans-serif";
const ffSerif = "'Instrument Serif', serif";
const black = "#0C0C0C";
const white = "#FEFEFE";
const grey50 = "#F7F7F5";
const grey100 = "#EDEDEB";
const grey200 = "#D4D4D0";
const grey400 = "#8A8A85";
const grey600 = "#5A5A56";
const accent = "#E85D2A";
const accentDark = "#C94A1E";

export default function ReelCheckV2() {
  const [lang, setLang] = useState("fr");
  const [scrolled, setScrolled] = useState(false);
  const l = TX[lang];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const LangSwitch = ({ light }) => (
    <div style={{ display: "flex", border: `1px solid ${light ? "rgba(255,255,255,0.2)" : grey100}`, borderRadius: 6, overflow: "hidden" }}>
      {["fr","en"].map(lg => (
        <button key={lg} onClick={() => setLang(lg)} style={{
          padding: "5px 12px", border: "none", cursor: "pointer",
          fontSize: 11, fontWeight: 700, fontFamily: ff, letterSpacing: 1,
          background: lang === lg ? (light ? "rgba(255,255,255,0.15)" : grey100) : "transparent",
          color: lang === lg ? (light ? "#fff" : black) : (light ? "rgba(255,255,255,0.5)" : grey400),
          transition: "all 0.2s",
        }}>{lg.toUpperCase()}</button>
      ))}
    </div>
  );

  return (
    <div style={{ background: white, fontFamily: ff, color: black, overflowX: "hidden" }}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: ${accent}; color: white; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease-out both; }
        .fade-d1 { animation-delay: 0.1s; }
        .fade-d2 { animation-delay: 0.2s; }
        .fade-d3 { animation-delay: 0.35s; }
        .fade-d4 { animation-delay: 0.5s; }
      `}</style>

      {/* â•â•â• NAV â•â•â• */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        height: 60, display: "flex", alignItems: "center", justifyContent: "center",
        background: scrolled ? "rgba(254,254,254,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
        borderBottom: scrolled ? `1px solid ${grey100}` : "none",
        transition: "all 0.4s ease",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>
            reel<span style={{ color: accent }}>check</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["#method", l.nav.how], ["#compare", l.nav.compare], ["#pricing", l.nav.pricing]].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: 13, fontWeight: 500, color: grey600, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = black}
                onMouseLeave={e => e.target.style.color = grey600}
              >{label}</a>
            ))}
            <LangSwitch />
            <a href="#final" style={{
              padding: "9px 20px", borderRadius: 8,
              background: black, color: white,
              fontSize: 13, fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = accent; }}
            onMouseLeave={e => { e.target.style.background = black; }}
            >{l.nav.cta}</a>
          </div>
        </div>
      </nav>

      {/* â•â•â• HERO â•â•â• */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 32px 60px",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 28,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: grey400, textTransform: "uppercase", letterSpacing: 2 }}>{l.hero.tag}</span>
        </div>

        <h1 className="fade-up fade-d1" style={{
          fontSize: "clamp(48px, 7.5vw, 88px)",
          fontFamily: ffSerif,
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: -2,
          marginBottom: 32,
          maxWidth: 800,
        }}>
          {l.hero.h1a}<br />
          <span style={{ fontStyle: "italic", color: accent }}>{l.hero.h1b}</span><br />
          {l.hero.h1c}
        </h1>

        <p className="fade-up fade-d2" style={{
          fontSize: 17, lineHeight: 1.7, color: grey600,
          maxWidth: 520, marginBottom: 40,
        }}>{l.hero.sub}</p>

        <div className="fade-up fade-d3" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#final" style={{
            padding: "16px 32px", borderRadius: 10,
            background: accent, color: white,
            fontSize: 15, fontWeight: 700,
            boxShadow: `0 4px 24px rgba(232,93,42,0.25)`,
            transition: "all 0.25s",
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >{l.hero.cta1}</a>
          <a href="#method" style={{
            padding: "16px 28px", borderRadius: 10,
            border: `1.5px solid ${grey200}`,
            fontSize: 15, fontWeight: 600, color: black,
            transition: "all 0.25s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = black; }}
          onMouseLeave={e => { e.target.style.borderColor = grey200; }}
          >{l.hero.cta2}</a>
        </div>

        <div className="fade-up fade-d4" style={{
          marginTop: "auto", paddingTop: 60,
          display: "flex", gap: 0, borderTop: `1px solid ${grey100}`,
        }}>
          {l.metrics.items.map((m, i) => (
            <div key={i} style={{
              flex: 1, padding: "24px 0",
              borderRight: i < 2 ? `1px solid ${grey100}` : "none",
              paddingRight: i < 2 ? 24 : 0,
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, color: black }}>{m.num}</div>
              <div style={{ fontSize: 13, color: grey400, marginTop: 4 }}>{m.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â• METHOD â•â•â• */}
      <section id="method" style={{ padding: "100px 32px", background: grey50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{l.method.sub}</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontFamily: ffSerif, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>{l.method.title}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: grey200, borderRadius: 16, overflow: "hidden" }}>
            {l.method.steps.map((s, i) => (
              <div key={i} style={{
                background: white, padding: "36px 28px",
                display: "flex", flexDirection: "column", gap: 16,
                transition: "background 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = grey50}
              onMouseLeave={e => e.currentTarget.style.background = white}
              >
                <span style={{ fontSize: 42, fontFamily: ffSerif, fontStyle: "italic", color: accent, lineHeight: 1 }}>{s.num}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: grey600, lineHeight: 1.65 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â• EDITORIAL â•â•â• */}
      <section style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{l.editorial.kicker}</p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontFamily: ffSerif,
            fontWeight: 400, lineHeight: 1.2, letterSpacing: -0.5,
            maxWidth: 700, marginBottom: 40,
          }}>{l.editorial.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: grey600, borderLeft: `3px solid ${accent}`, paddingLeft: 24 }}>{l.editorial.col1}</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: grey600 }}>{l.editorial.col2}</p>
          </div>
        </div>
      </section>

      {/* â•â•â• COMPARE â•â•â• */}
      <section id="compare" style={{ padding: "100px 32px", background: black, color: white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontFamily: ffSerif, fontWeight: 400, letterSpacing: -0.5, marginBottom: 10 }}>{l.compare.title}</h2>
            <p style={{ fontSize: 14, color: grey400 }}>{l.compare.sub}</p>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr" }}>
              {l.compare.headers.map((h, i) => (
                <div key={i} style={{
                  padding: "16px 20px", fontSize: 12, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: 1.5,
                  color: i === 0 ? "transparent" : i === 1 ? "#F87171" : "#6EE7A0",
                  background: "rgba(255,255,255,0.03)",
                  textAlign: i === 0 ? "left" : "center",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>{h}</div>
              ))}
            </div>
            {l.compare.rows.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
                borderBottom: i < l.compare.rows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div style={{
                  padding: "16px 20px", fontSize: 14,
                  fontWeight: row.type === "total" ? 800 : 400,
                  color: row.type === "total" ? white : "rgba(255,255,255,0.7)",
                }}>{row.label}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14, textAlign: "center",
                  fontWeight: row.type === "total" ? 800 : row.type === "highlight" ? 600 : 400,
                  color: row.type === "highlight" ? "#F87171" : row.type === "total" ? white : "rgba(255,255,255,0.5)",
                }}>{row.a}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14, textAlign: "center",
                  fontWeight: row.type === "total" ? 800 : row.type === "highlight" ? 600 : 400,
                  color: row.type === "highlight" ? "#6EE7A0" : row.type === "total" ? "#6EE7A0" : "rgba(255,255,255,0.5)",
                }}>{row.b}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 24, textAlign: "center",
            padding: "20px", borderRadius: 12,
            background: "rgba(110,231,160,0.06)",
            border: "1px solid rgba(110,231,160,0.12)",
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#6EE7A0", fontFamily: ff }}>{l.compare.bottom}</p>
          </div>
        </div>
      </section>

      {/* â•â•â• VIRAL â•â•â• */}
      <section style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{l.viral.kicker}</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontFamily: ffSerif, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.5, marginBottom: 20 }}>{l.viral.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: grey600 }}>{l.viral.text}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {l.viral.cards.map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 20,
                  padding: "24px 28px", borderRadius: 14,
                  background: grey50, border: `1px solid ${grey100}`,
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = grey100; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ fontSize: 18, fontWeight: 900, color: accent, fontFamily: ff, minWidth: 80 }}>{c.platform}</span>
                  <span style={{ fontSize: 14, color: grey600 }}>{c.format}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â• QUOTES â•â•â• */}
      <section style={{ padding: "80px 32px", background: grey50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: grey200, borderRadius: 16, overflow: "hidden" }}>
          {l.quotes.map((q, i) => (
            <div key={i} style={{ background: white, padding: "48px 40px" }}>
              <p style={{
                fontSize: 20, fontFamily: ffSerif, fontStyle: "italic",
                lineHeight: 1.5, color: black, marginBottom: 24,
              }}>"{q.text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{q.name}</div>
                <div style={{ fontSize: 13, color: grey400 }}>{q.hotel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â• PRICING â•â•â• */}
      <section id="pricing" style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: ffSerif, fontWeight: 400, letterSpacing: -1, marginBottom: 10 }}>{l.pricing.title}</h2>
            <p style={{ fontSize: 15, color: grey400 }}>{l.pricing.sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: grey200, borderRadius: 20, overflow: "hidden" }}>
            {l.pricing.plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.pop ? black : white,
                padding: "48px 36px",
                display: "flex", flexDirection: "column",
              }}>
                {plan.pop && <div style={{
                  alignSelf: "flex-start", marginBottom: 16,
                  padding: "4px 12px", borderRadius: 20,
                  background: accent, color: white,
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                }}>Populaire</div>}
                <h3 style={{ fontSize: 13, fontWeight: 700, color: plan.pop ? "rgba(255,255,255,0.5)" : grey400, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1.5 }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: -3, color: plan.pop ? white : black }}>{plan.price}â‚¬</span>
                  <span style={{ fontSize: 14, color: plan.pop ? "rgba(255,255,255,0.35)" : grey400 }}>/mois</span>
                </div>
                <p style={{ fontSize: 14, color: plan.pop ? "rgba(255,255,255,0.6)" : grey600, marginBottom: 28, lineHeight: 1.5 }}>{plan.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                      <span style={{ color: accent, fontWeight: 800, fontSize: 12, marginTop: 2, flexShrink: 0 }}>+</span>
                      <span style={{ color: plan.pop ? "rgba(255,255,255,0.8)" : grey600, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                {plan.savings && (
                  <div style={{
                    padding: "10px 14px", borderRadius: 8, marginBottom: 20,
                    background: plan.pop ? "rgba(110,231,160,0.08)" : grey50,
                    border: plan.pop ? "1px solid rgba(110,231,160,0.15)" : `1px solid ${grey100}`,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: plan.pop ? "#6EE7A0" : grey600 }}>{plan.savings}</span>
                  </div>
                )}
                <a href="#final" style={{
                  display: "block", textAlign: "center",
                  padding: "16px 24px", borderRadius: 10,
                  background: plan.pop ? accent : "transparent",
                  color: plan.pop ? white : black,
                  border: plan.pop ? "none" : `1.5px solid ${grey200}`,
                  fontSize: 15, fontWeight: 700,
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => {
                  if (plan.pop) { e.target.style.background = accentDark; }
                  else { e.target.style.borderColor = black; }
                }}
                onMouseLeave={e => {
                  if (plan.pop) { e.target.style.background = accent; }
                  else { e.target.style.borderColor = grey200; }
                }}
                >{plan.cta}</a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <p style={{ fontSize: 13, color: accent, fontWeight: 600, marginBottom: 4 }}>{l.pricing.note}</p>
            <p style={{ fontSize: 12, color: grey400 }}>{l.pricing.guarantee}</p>
          </div>
        </div>
      </section>

      {/* â•â•â• FINAL CTA â•â•â• */}
      <section id="final" style={{ padding: "100px 32px" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: black, borderRadius: 24, padding: "80px 48px",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -100, right: -100,
            width: 400, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(232,93,42,0.12), transparent 70%)`,
          }} />
          <div style={{
            position: "absolute", bottom: -80, left: -80,
            width: 300, height: 300, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(232,93,42,0.08), transparent 70%)`,
          }} />
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 40px)", fontFamily: ffSerif,
            fontWeight: 400, color: white, lineHeight: 1.2,
            letterSpacing: -0.5, marginBottom: 32,
            position: "relative",
          }}>{l.final.title}</h2>
          <a href="#" style={{
            display: "inline-block",
            padding: "18px 40px", borderRadius: 12,
            background: accent, color: white,
            fontSize: 16, fontWeight: 700,
            boxShadow: `0 4px 32px rgba(232,93,42,0.3)`,
            transition: "all 0.25s",
            position: "relative",
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >{l.final.cta}</a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 16, position: "relative" }}>{l.final.note}</p>
        </div>
      </section>

      {/* â•â•â• FOOTER â•â•â• */}
      <footer style={{
        padding: "32px",
        borderTop: `1px solid ${grey100}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <span style={{ fontSize: 13, color: grey400 }}>{l.footer}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: -0.5 }}>
            reel<span style={{ color: accent }}>check</span>
          </span>
          <LangSwitch />
        </div>
      </footer>
    </div>
  );
}
