"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════ */

const WHATSAPP_URL =
  "https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20escola.";
const WHATSAPP_VISITA_URL =
  "https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20na%20escola.";
const INSTAGRAM_URL =
  "https://www.instagram.com/colegiovalcrisvidadecrianca/";
const FACEBOOK_URL = "https://www.facebook.com/eeividadecrianca/";
const PHONE_DISPLAY = "(17) 99701-4713";
const PHONE_TEL = "tel:+5517997014713";
const ADDRESS = "Avenida 25, 437 - Centro, Barretos - SP, 14780-330";
const CNPJ = "05.460.684/0001-28";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#ensino", label: "Ensino" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

/* ═══════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════ */

/** Scroll-reveal: adds "visible" class on intersection */
function useScrollReveal() {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Counter animation: counts from 0 to target over ~2s */
function useCounterAnimation(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  suffix = ""
) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(eased * target);
              setValue(current);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, target]);

  return value + suffix;
}

/* ═══════════════════════════════════════════════════════════════════════
   1. HEADER
   ═══════════════════════════════════════════════════════════════════════ */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-white shadow-lg py-2"
          : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/logo-valcris-objetivo.jpg"
              alt="Colegio Valcris - Vida de Crianca - Sistema Objetivo"
              className="h-12 sm:h-14 w-auto rounded-lg group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-primary hover:bg-primary/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={PHONE_TEL}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-cta text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 hover:shadow-lg shadow-green/30"
            >
              Matricule-se
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-gray-800" : "bg-white"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-50 transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <img
                src="/logo-valcris-objetivo.jpg"
                alt="Colegio Valcris - Vida de Crianca"
                className="h-10 w-auto rounded-lg"
              />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-primary hover:bg-primary/5 font-medium py-3 px-4 rounded-xl transition-colors text-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="p-6 space-y-3 border-t border-gray-100 mt-auto">
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 hover:border-primary/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block gradient-cta text-white text-center font-bold py-3.5 px-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              Matricule-se
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. HERO
   ═══════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero text-white overflow-hidden">
      {/* Animated decorative blobs */}
      <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-white/5 blob-1 animate-float blur-3xl" />
      <div className="absolute bottom-10 left-[-8%] w-[400px] h-[400px] bg-secondary/10 blob-2 animate-float blur-2xl" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[40%] left-[15%] w-[200px] h-[200px] bg-green/8 blob-1 animate-float blur-2xl" style={{ animationDelay: "3s" }} />

      {/* Floating decorative shapes */}
      <div className="absolute top-32 right-[15%] w-4 h-4 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[60%] right-[25%] w-3 h-3 bg-green/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[30%] right-[10%] w-5 h-5 bg-white/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[25%] left-[40%] w-2 h-2 bg-secondary/50 rounded-full animate-float" style={{ animationDelay: "2.5s" }} />

      {/* Shimmer line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 glass px-5 py-2.5 rounded-full mb-8 animate-slide-up">
            <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse-soft" />
            <span className="text-sm font-semibold tracking-wide">
              Matriculas Abertas 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            Onde cada crianca
            <br />
            <span className="text-secondary">aprende e cresce</span>
            <br />
            com amor.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Escola de Educacao Infantil e Ensino Fundamental em Barretos.
            Do bercario{" "}
            <span className="text-white/90 font-medium">(a partir de 5 meses)</span>{" "}
            ao Fundamental I com o{" "}
            <strong className="text-white">Sistema de Ensino Objetivo</strong>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.45s" }}>
            <a
              href={WHATSAPP_VISITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-cta text-white font-bold px-8 py-4 rounded-full text-center transition-all hover:scale-105 shadow-lg shadow-green/25 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agende uma Visita
            </a>
            <a
              href="#sobre"
              className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-center transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Conheca a Escola
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm animate-slide-up" style={{ animationDelay: "0.6s" }}>
            {[
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "+24 anos" },
              { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", text: "Sistema Objetivo" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", text: "5 meses ao Fund. I" },
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", text: "Barretos-SP" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/70">
                <svg className="w-4.5 h-4.5 text-secondary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. ANIMATED STATS BAR
   ═══════════════════════════════════════════════════════════════════════ */

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const display = useCounterAnimation(ref, target, suffix);

  return (
    <div ref={ref} className="text-center px-4 py-3">
      <p className="text-3xl sm:text-4xl font-extrabold text-white counter-value">
        {display}
      </p>
      <p className="text-sm sm:text-base text-white/70 mt-1 font-medium">{label}</p>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="gradient-primary py-8 sm:py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatItem target={24} suffix="+" label="Anos de Tradicao" />
          <StatItem target={500} suffix="+" label="Alunos Formados" />
          <StatItem target={100} suffix="%" label="Dedicacao" />
          <StatItem target={15} suffix="+" label="Professores" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4. SOBRE (About)
   ═══════════════════════════════════════════════════════════════════════ */

function Sobre() {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div className="reveal-left">
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
              Sobre Nos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Educacao que{" "}
              <span className="text-gradient">transforma</span>{" "}
              desde <span className="text-red">2002</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Ha mais de 24 anos, o{" "}
              <strong className="text-foreground">
                Colegio Valcris & EEVI Vida de Crianca
              </strong>{" "}
              forma cidadaos em Barretos com ensino de excelencia, carinho e
              dedicacao. Nascemos do sonho de criar um espaco onde cada crianca
              pudesse florescer respeitando sua individualidade.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Utilizamos o{" "}
              <strong className="text-foreground">
                Sistema de Ensino Objetivo
              </strong>
              , reconhecido nacionalmente, que prepara os alunos para os
              desafios do futuro com uma metodologia moderna, eficaz e
              alinhada aos valores da familia.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Amor", desc: "Ambiente acolhedor" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Seguranca", desc: "Espaco protegido" },
                { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Conhecimento", desc: "Sistema Objetivo" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Comunidade", desc: "Familia escolar" },
              ].map((v) => (
                <div key={v.title} className="flex items-start gap-3 p-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{v.title}</p>
                    <p className="text-gray-500 text-xs">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image placeholder */}
          <div className="reveal-right relative">
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/10 to-green/20 rounded-[2rem] -z-10" />
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-2xl">
                {/* Placeholder visual */}
                <div className="text-center px-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-primary/60 font-medium text-sm">
                    Foto da escola
                  </p>
                </div>
                {/* Decorative floating elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-secondary/20 rounded-full animate-float" />
                <div className="absolute bottom-8 left-6 w-12 h-12 bg-green/15 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-6 sm:left-4 glass-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-extrabold text-lg">24</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Anos</p>
                  <p className="text-gray-500 text-xs">de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   5. SISTEMA DE ENSINO (Objetivo Partnership)
   ═══════════════════════════════════════════════════════════════════════ */

function SistemaEnsino() {
  const benefits = [
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Material didatico reconhecido",
      desc: "Livros e materiais atualizados, alinhados com a BNCC e as melhores praticas pedagogicas.",
    },
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      title: "Metodologia comprovada",
      desc: "Decadas de experiencia em educacao brasileira com resultados comprovados em aprovacoes.",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Preparacao para o futuro",
      desc: "Formacao integral que desenvolve habilidades academicas, sociais e emocionais.",
    },
    {
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Tecnologia educacional",
      desc: "Plataformas digitais e recursos tecnologicos que enriquecem o processo de aprendizagem.",
    },
  ];

  return (
    <section id="ensino" className="py-20 sm:py-28 gradient-hero text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 blob-2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blob-1 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-secondary font-bold text-sm uppercase tracking-widest mb-3">
            Parceria de Excelencia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Sistema de Ensino{" "}
            <span className="text-secondary">Objetivo</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Somos escola conveniada ao Sistema de Ensino Objetivo, garantindo
            uma educacao de alta qualidade reconhecida em todo o Brasil.
          </p>
        </div>

        {/* Objetivo logo badge */}
        <div className="flex justify-center mb-12 reveal-scale">
          <div className="glass px-8 py-5 rounded-2xl flex items-center gap-5">
            <img
              src="/logo-valcris-objetivo.jpg"
              alt="Colegio Valcris - Sistema de Ensino Objetivo"
              className="h-20 w-auto rounded-lg bg-white p-1.5"
            />
            <div>
              <p className="font-bold text-lg">Escola Conveniada</p>
              <p className="text-secondary font-semibold text-sm">Sistema de Ensino Objetivo</p>
              <p className="text-white/50 text-xs mt-1">Educacao que transforma desde 2002</p>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 gap-6 stagger">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="reveal glass rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition-colors group"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-secondary/20 group-hover:bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   6. NIVEIS DE ENSINO (Education Levels)
   ═══════════════════════════════════════════════════════════════════════ */

function NiveisEnsino() {
  const niveis = [
    {
      titulo: "Bercario",
      idade: "5 meses a 1 ano",
      descricao:
        "Cuidado afetuoso com estimulacao sensorial, motora e cognitiva em ambiente seguro e acolhedor. Profissionais especializados acompanham cada fase do desenvolvimento do seu bebe.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      accentBg: "bg-pink-50",
      accentIcon: "bg-gradient-to-br from-pink-500 to-rose-500",
      accentText: "text-pink-600",
      accentBorder: "border-pink-200",
    },
    {
      titulo: "Educacao Infantil",
      idade: "1 a 5 anos",
      descricao:
        "Aprendizagem ludica com o Sistema Objetivo. Desenvolvimento da linguagem, socializacao, autonomia e criatividade em um ambiente estimulante e preparado para descobertas.",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      accentBg: "bg-blue-50",
      accentIcon: "bg-gradient-to-br from-primary to-primary-light",
      accentText: "text-primary",
      accentBorder: "border-blue-200",
    },
    {
      titulo: "Fundamental I",
      idade: "6 a 10 anos",
      descricao:
        "Base solida com o Sistema Objetivo. Formacao academica completa com valores eticos, cidadania e preparacao para as proximas etapas da vida escolar com confianca.",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      accentBg: "bg-emerald-50",
      accentIcon: "bg-gradient-to-br from-green to-green-light",
      accentText: "text-green",
      accentBorder: "border-emerald-200",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Niveis de Ensino
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Do bercario ao{" "}
            <span className="text-gradient">Fundamental I</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Acompanhamos o desenvolvimento do seu filho em cada fase,
            com metodologia comprovada e muito carinho.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {niveis.map((nivel, i) => (
            <div
              key={nivel.titulo}
              className={`reveal-scale card-lift rounded-3xl p-8 border ${nivel.accentBorder} ${nivel.accentBg} relative overflow-hidden group`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* Decorative circle */}
              <div className={`absolute -top-8 -right-8 w-32 h-32 ${nivel.accentIcon} opacity-5 rounded-full group-hover:opacity-10 transition-opacity`} />

              <div
                className={`w-14 h-14 ${nivel.accentIcon} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={nivel.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-1">
                {nivel.titulo}
              </h3>
              <p className={`${nivel.accentText} font-bold text-sm mb-4`}>
                {nivel.idade}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {nivel.descricao}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 ${nivel.accentText} font-semibold text-sm hover:gap-2.5 transition-all`}
              >
                Saiba mais
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   7. ESTRUTURA / GALERIA (Infrastructure Gallery)
   ═══════════════════════════════════════════════════════════════════════ */

function Galeria() {
  const espacos = [
    { nome: "Biblioteca", color: "from-primary/80 to-primary-dark/90", span: "md:col-span-2 md:row-span-2" },
    { nome: "Parque Infantil", color: "from-green/80 to-green-dark/90", span: "" },
    { nome: "Quadra Coberta", color: "from-secondary/80 to-secondary-dark/90", span: "" },
    { nome: "Refeitorio", color: "from-red/70 to-red-dark/80", span: "" },
    { nome: "Patio", color: "from-primary-light/80 to-primary/90", span: "" },
    { nome: "Salas de Aula", color: "from-green/70 to-primary/80", span: "md:col-span-2" },
  ];

  return (
    <section id="estrutura" className="py-20 sm:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Estrutura
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Espacos planejados para o{" "}
            <span className="text-gradient">aprendizado</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Ambientes modernos, seguros e pensados para estimular a
            curiosidade e o desenvolvimento das criancas.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 reveal-scale">
          {espacos.map((esp) => (
            <div
              key={esp.nome}
              className={`${esp.span} relative rounded-2xl overflow-hidden group cursor-pointer min-h-[180px] sm:min-h-[200px]`}
            >
              {/* Colored placeholder background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${esp.color}`} />
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30" />
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/30 group-hover:text-white/10 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Hover overlay with name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white font-bold text-sm sm:text-base translate-y-2 group-hover:translate-y-0 transition-transform">
                  {esp.nome}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href={WHATSAPP_VISITA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-cta text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg shadow-green/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agende uma visita para conhecer
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   8. VIDEO SECTION
   ═══════════════════════════════════════════════════════════════════════ */

function VideoSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 blob-1 blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 blob-2 blur-3xl translate-x-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Tour Virtual
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
            Conheca nossa escola{" "}
            <span className="text-gradient">por dentro</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Faca um passeio virtual pela nossa estrutura e descubra o
            ambiente onde seu filho vai aprender e se desenvolver.
          </p>
        </div>

        <div className="reveal-scale">
          <div className="video-container shadow-2xl">
            {/* Placeholder - replace src with actual YouTube embed URL */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/95 flex items-center justify-center rounded-2xl">
              <div className="text-center text-white">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer group">
                  <svg className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-semibold text-lg">Assista ao video institucional</p>
                <p className="text-white/60 text-sm mt-1">Em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   9. DEPOIMENTOS (Testimonials)
   ═══════════════════════════════════════════════════════════════════════ */

function Depoimentos() {
  const depoimentos = [
    {
      nome: "Maria Silva",
      relacao: "Mae de aluno - Fundamental I",
      texto:
        "Meu filho ama estudar aqui! Os professores sao muito atenciosos e a estrutura e otima. A evolucao dele desde o bercario foi incrivel. Recomendo de olhos fechados!",
      estrelas: 5,
    },
    {
      nome: "Carlos Ribeiro",
      relacao: "Pai de aluno - Educacao Infantil",
      texto:
        "A melhor escola de Barretos. O Sistema Objetivo e excelente e as criancas aprendem brincando. Minha filha vai para a escola feliz todos os dias.",
      estrelas: 5,
    },
    {
      nome: "Ana Paula Costa",
      relacao: "Mae de aluno - Bercario",
      texto:
        "Desde o bercario meu filho estuda aqui. A equipe e extremamente carinhosa e profissional. Confio plenamente nos cuidados que ele recebe. Escola maravilhosa!",
      estrelas: 5,
    },
    {
      nome: "Fernando Almeida",
      relacao: "Pai de aluno - Fundamental I",
      texto:
        "O diferencial da EEVI e o carinho com que tratam cada crianca. O acompanhamento individualizado fez toda a diferenca no desenvolvimento do meu filho.",
      estrelas: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 sm:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            O que os <span className="text-gradient">pais dizem</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            A confianca das familias e nosso maior reconhecimento.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {depoimentos.map((dep, i) => (
            <div
              key={dep.nome}
              className="reveal card-hover bg-white rounded-2xl p-6 sm:p-7 relative"
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5">
                <svg className="w-8 h-8 text-primary/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: dep.estrelas }).map((_, j) => (
                  <svg key={j} className="w-4.5 h-4.5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed text-sm mb-5 italic">
                &ldquo;{dep.texto}&rdquo;
              </p>

              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-foreground text-sm">{dep.nome}</p>
                <p className="text-xs text-gray-400 mt-0.5">{dep.relacao}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google link */}
        <div className="text-center mt-10 reveal">
          <a
            href="https://www.google.com/search?q=colegio+valcris+eevi+vida+de+crianca+barretos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors text-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver mais avaliacoes no Google
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   10. FAQ
   ═══════════════════════════════════════════════════════════════════════ */

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Qual a faixa etaria atendida?",
      a: "Atendemos criancas a partir de 5 meses de idade (bercario) ate o Ensino Fundamental I (10 anos). Temos turmas de Bercario, Educacao Infantil (1 a 5 anos) e Fundamental I (6 a 10 anos).",
    },
    {
      q: "Qual o sistema de ensino utilizado?",
      a: "Utilizamos o Sistema de Ensino Objetivo, um dos mais reconhecidos do Brasil. O material didatico e atualizado anualmente e alinhado a BNCC, garantindo uma educacao de qualidade e preparacao para o futuro.",
    },
    {
      q: "Quais os horarios de funcionamento?",
      a: "A escola funciona de segunda a sexta-feira, das 7h as 18h. Oferecemos turmas nos periodos da manha e da tarde, alem de horario integral para famílias que necessitam.",
    },
    {
      q: "Como funciona o processo de matricula?",
      a: "O processo de matricula e simples! Voce pode agendar uma visita presencial pelo WhatsApp, conhecer nossa estrutura e conversar com nossa equipe pedagogica. Apos a visita, realizamos a matricula com a documentacao necessaria.",
    },
    {
      q: "A escola oferece alimentacao?",
      a: "Sim! Contamos com um refeitorio proprio e cardapio elaborado por nutricionista, garantindo refeicoes saudaveis e equilibradas para todas as faixas etarias atendidas pela escola.",
    },
    {
      q: "Tem atividades extracurriculares?",
      a: "Sim, oferecemos diversas atividades extracurriculares que complementam a formacao dos alunos, incluindo atividades esportivas, artisticas e culturais, contribuindo para o desenvolvimento integral da crianca.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Duvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Perguntas{" "}
            <span className="text-gradient">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-primary flex-shrink-0 faq-chevron ${
                    openIndex === i ? "open" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`faq-content ${openIndex === i ? "open" : ""}`}>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   11. CTA MATRICULA
   ═══════════════════════════════════════════════════════════════════════ */

function CTAMatricula() {
  return (
    <section className="py-20 sm:py-24 gradient-red relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blob-1 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blob-2 blur-3xl" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal-scale">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
          <span className="text-white/90 text-sm font-semibold">Vagas Limitadas</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          Matriculas Abertas 2026
        </h2>
        <p className="text-xl sm:text-2xl text-white/80 mb-10 font-medium">
          Garanta a vaga do seu filho na melhor escola de Barretos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Fale pelo WhatsApp
          </a>
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 bg-white text-red font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Matricule-se
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   12. CONTATO (Contact)
   ═══════════════════════════════════════════════════════════════════════ */

function Contato() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
      interesse: formData.get("interesse"),
      mensagem: formData.get("mensagem"),
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }, []);

  return (
    <section id="contato" className="py-20 sm:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Venha nos <span className="text-gradient">conhecer</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            Agende uma visita e conheca nossa estrutura. Estamos prontos
            para receber voce e sua familia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: contact info */}
          <div className="reveal-left">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-primary/8 group-hover:bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Endereco</p>
                  <p className="text-gray-600 leading-relaxed">
                    Avenida 25, 437 - Centro
                    <br />
                    Barretos - SP, 14780-330
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-green/8 group-hover:bg-green/15 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">WhatsApp</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green hover:text-green-dark font-medium transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-secondary/8 group-hover:bg-secondary/15 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-5 h-5 text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Horario</p>
                  <p className="text-gray-600">Segunda a Sexta: 7h as 18h</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="font-bold text-foreground mb-4 text-sm">Siga-nos nas redes sociais</p>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-[#1877F2] text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Agende sua visita
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Preencha o formulario e entraremos em contato em breve.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nome completo <span className="text-red">*</span>
                  </label>
                  <input
                    name="nome"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30 hover:border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      WhatsApp <span className="text-red">*</span>
                    </label>
                    <input
                      name="telefone"
                      type="tel"
                      required
                      placeholder="(17) 99999-9999"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30 hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      E-mail
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30 hover:border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Interesse
                  </label>
                  <select
                    name="interesse"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30 hover:border-gray-300 appearance-none cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="Bercario">Bercario (5 meses a 1 ano)</option>
                    <option value="Educacao Infantil">Educacao Infantil (1 a 5 anos)</option>
                    <option value="Fundamental I">Fundamental I (6 a 10 anos)</option>
                    <option value="Visita">Agendar Visita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    rows={4}
                    placeholder="Conte-nos sobre seu interesse..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-muted/30 hover:border-gray-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full gradient-primary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 text-base"
                >
                  {formState === "sending"
                    ? "Enviando..."
                    : formState === "sent"
                      ? "Enviado com sucesso!"
                      : "Enviar Mensagem"}
                </button>
                {formState === "error" && (
                  <p className="text-red text-sm text-center">
                    Erro ao enviar. Tente pelo{" "}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                      WhatsApp
                    </a>
                    .
                  </p>
                )}
                {formState === "sent" && (
                  <p className="text-green text-sm text-center font-medium">
                    Mensagem enviada! Entraremos em contato em breve.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-gray-200 reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.8!2d-48.5678!3d-20.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+25%2C+437+-+Centro%2C+Barretos+-+SP!5e0!3m2!1spt-BR!2sbr!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localizacao EEVI Vida de Crianca"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   13. FOOTER
   ═══════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="gradient-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo & description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img
                src="/logo-valcris-objetivo.jpg"
                alt="Colegio Valcris - Vida de Crianca"
                className="h-16 w-auto rounded-lg bg-white p-1"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Educacao de qualidade em Barretos desde 2002.
              Formando cidadaos com amor, conhecimento e valores
              atraves do Sistema de Ensino Objetivo.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">
              Links
            </h4>
            <div className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contato */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">
              Contato
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>Avenida 25, 437 - Centro</p>
              <p>Barretos - SP, 14780-330</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <p>Segunda a Sexta: 7h as 18h</p>
            </div>
          </div>

          {/* Column 4: Redes Sociais */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">
              Redes Sociais
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
                @colegiovalcrisvidadecrianca
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                /eeividadecrianca
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>
              &copy; {new Date().getFullYear()} EEVI Vida de Crianca - Colegio
              Valcris. Todos os direitos reservados.
            </p>
            <p>CNPJ: {CNPJ}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   14. FLOATING ELEMENTS
   ═══════════════════════════════════════════════════════════════════════ */

/** WhatsApp floating button (bottom-right) */
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 w-15 h-15 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green/30 hover:scale-110 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      aria-label="Fale pelo WhatsApp"
      style={{ width: 60, height: 60 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <svg className="w-7 h-7 relative" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/** Mobile sticky bottom bar */
function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white mobile-sticky-bar border-t border-gray-100 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Phone */}
        <a
          href={PHONE_TEL}
          className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          aria-label="Ligar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366]/20 transition-colors"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Matricule-se CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 gradient-cta text-white text-center font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-green/20"
        >
          Matricule-se
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════════ */

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Sobre />
        <SistemaEnsino />
        <NiveisEnsino />
        <Galeria />
        <VideoSection />
        <Depoimentos />
        <FAQ />
        <CTAMatricula />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  );
}
