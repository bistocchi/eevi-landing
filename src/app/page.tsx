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
const CNPJ = "05.460.684/0001-28";

const NAV_LINKS = [
  { href: "#sobre", label: "A Escola" },
  { href: "#ensino", label: "Ensino" },
  { href: "#niveis", label: "Niveis" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

/* ═══════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(animate);
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
   1. TOP BAR (contato rapido - estilo Objetivo)
   ═══════════════════════════════════════════════════════════════════════ */

function TopBar() {
  return (
    <div className="bg-primary text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-light transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Instagram">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Facebook">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. HEADER / NAV (estilo Objetivo - fundo branco, solido, limpo)
   ═══════════════════════════════════════════════════════════════════════ */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3 group flex-shrink-0">
            <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Vida de Crianca - Sistema Objetivo" className="h-11 sm:h-14 w-auto rounded group-hover:opacity-90 transition-opacity" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-md transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-red after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={WHATSAPP_VISITA_URL} target="_blank" rel="noopener noreferrer" className="bg-red hover:bg-red-dark text-white font-bold px-6 py-2.5 rounded-md text-sm transition-colors shadow-sm">
              Agende uma Visita
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-700 hover:text-primary" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris" className="h-10 w-auto rounded" />
            <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-md" aria-label="Fechar">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-primary hover:bg-primary/5 font-semibold py-3 px-4 rounded-md transition-colors border-l-4 border-transparent hover:border-red">
                {link.label}
              </a>
            ))}
          </div>
          <div className="p-5 border-t border-gray-100 space-y-3">
            <a href={PHONE_TEL} className="flex items-center gap-2 text-gray-600 font-medium py-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {PHONE_DISPLAY}
            </a>
            <a href={WHATSAPP_VISITA_URL} target="_blank" rel="noopener noreferrer" className="block bg-red hover:bg-red-dark text-white text-center font-bold py-3 px-4 rounded-md transition-colors">
              Agende uma Visita
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. HERO BANNER (estilo Objetivo - banner azul com CTA vermelho)
   ═══════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-red" />
        <div className="flex-1 bg-green" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-20 lg:py-24">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-red px-4 py-1.5 rounded-sm text-sm font-bold mb-6 animate-slide-up">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
              MATRICULAS ABERTAS 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Venha conhecer o{" "}
              <span className="text-secondary">Colegio Valcris</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Educacao Infantil e Ensino Fundamental em Barretos com o{" "}
              <strong className="text-white">Sistema de Ensino Objetivo</strong>.
              Do bercario (5 meses) ao Fundamental I.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <a href={WHATSAPP_VISITA_URL} target="_blank" rel="noopener noreferrer" className="bg-red hover:bg-red-dark text-white font-bold px-8 py-4 rounded-md text-center transition-colors shadow-lg flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Agende uma Visita
              </a>
              <a href="#sobre" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-md text-center transition-colors flex items-center justify-center gap-2">
                Conheca a Escola
              </a>
            </div>
          </div>

          <div className="hidden lg:block animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/10 rounded-lg aspect-[4/3] flex items-center justify-center relative overflow-hidden border border-white/20">
              <div className="text-center px-8">
                <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-28 w-auto mx-auto mb-4 rounded-lg bg-white p-3 shadow-lg" />
                <p className="text-white/60 font-medium text-sm">+ de 24 anos formando criancas em Barretos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V0L1440 60H0Z" fill="white" /></svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4. STATS BAR
   ═══════════════════════════════════════════════════════════════════════ */

function StatItem({ target, suffix, label, color }: { target: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const display = useCounterAnimation(ref, target, suffix);
  return (
    <div ref={ref} className="text-center">
      <p className={`text-3xl sm:text-4xl font-extrabold counter-value ${color}`}>{display}</p>
      <p className="text-gray-500 text-sm mt-1 font-medium">{label}</p>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem target={24} suffix="+" label="Anos de Tradicao" color="text-primary" />
          <StatItem target={500} suffix="+" label="Alunos Formados" color="text-red" />
          <StatItem target={100} suffix="%" label="Dedicacao" color="text-green" />
          <StatItem target={15} suffix="+" label="Professores" color="text-primary" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   5. SOBRE
   ═══════════════════════════════════════════════════════════════════════ */

function Sobre() {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-red rounded" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">A Escola</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-6">
              Educacao que <span className="text-primary">transforma</span> desde <span className="text-red">2002</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Ha mais de 24 anos, o <strong className="text-foreground">Colegio Valcris & EEVI Vida de Crianca</strong> forma cidadaos em Barretos com ensino de excelencia, carinho e dedicacao.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Utilizamos o <strong className="text-foreground">Sistema de Ensino Objetivo</strong>, reconhecido nacionalmente, com metodologia moderna e alinhada aos valores da familia.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Amor", desc: "Ambiente acolhedor", color: "bg-red/10 text-red" },
                { title: "Seguranca", desc: "Espaco protegido", color: "bg-primary/10 text-primary" },
                { title: "Conhecimento", desc: "Sistema Objetivo", color: "bg-green/10 text-green" },
                { title: "Comunidade", desc: "Familia escolar", color: "bg-secondary/15 text-secondary-dark" },
              ].map((v) => (
                <div key={v.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg ${v.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="font-bold text-xs">{v.title.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{v.title}</p>
                    <p className="text-gray-400 text-xs">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div className="bg-muted rounded-lg aspect-[4/3] flex items-center justify-center border border-gray-200">
              <div className="text-center px-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-gray-400 font-medium text-sm">Foto da escola</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   6. SISTEMA OBJETIVO
   ═══════════════════════════════════════════════════════════════════════ */

function SistemaEnsino() {
  const benefits = [
    { title: "Material didatico reconhecido", desc: "Livros e materiais alinhados com a BNCC." },
    { title: "Metodologia comprovada", desc: "Decadas de experiencia com resultados." },
    { title: "Preparacao para o futuro", desc: "Habilidades academicas e socioemocionais." },
    { title: "Tecnologia educacional", desc: "Plataformas digitais de aprendizagem." },
  ];

  return (
    <section id="ensino" className="py-16 sm:py-24 bg-primary text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-primary-dark" />
        <div className="flex-1 bg-red" />
        <div className="flex-1 bg-green" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 reveal-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-secondary rounded" />
              <span className="text-secondary font-bold text-sm uppercase tracking-widest">Parceria</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6">
              Sistema de Ensino <span className="text-secondary">Objetivo</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Somos escola conveniada ao Sistema de Ensino Objetivo, garantindo educacao de alta qualidade reconhecida em todo o Brasil.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-lg p-5 inline-flex items-center gap-4">
              <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-16 w-auto rounded bg-white p-1.5" />
              <div>
                <p className="font-bold text-sm">Escola Conveniada</p>
                <p className="text-secondary text-xs font-semibold">Sistema de Ensino Objetivo</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 stagger">
            {benefits.map((b, i) => (
              <div key={b.title} className="reveal bg-white/8 border border-white/15 rounded-lg p-5 hover:bg-white/12 transition-colors" style={{ "--i": i } as React.CSSProperties}>
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-secondary font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{b.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   7. NIVEIS DE ENSINO
   ═══════════════════════════════════════════════════════════════════════ */

function NiveisEnsino() {
  const niveis = [
    { titulo: "Bercario", idade: "5 meses a 1 ano", descricao: "Cuidado afetuoso com estimulacao sensorial, motora e cognitiva. Profissionais especializados.", color: "border-t-red", iconBg: "bg-red", textColor: "text-red", letter: "B" },
    { titulo: "Educacao Infantil", idade: "1 a 5 anos", descricao: "Aprendizagem ludica com o Sistema Objetivo. Linguagem, socializacao e criatividade.", color: "border-t-primary", iconBg: "bg-primary", textColor: "text-primary", letter: "EI" },
    { titulo: "Fundamental I", idade: "6 a 10 anos", descricao: "Base solida com o Sistema Objetivo. Formacao academica com valores eticos e cidadania.", color: "border-t-green", iconBg: "bg-green", textColor: "text-green", letter: "FI" },
  ];

  return (
    <section id="niveis" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-red rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Niveis de Ensino</span>
            <div className="w-8 h-1 bg-red rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Do bercario ao <span className="text-primary">Fundamental I</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Acompanhamos cada fase com metodologia comprovada e muito carinho.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {niveis.map((nivel, i) => (
            <div key={nivel.titulo} className={`reveal bg-white rounded-lg border-t-4 ${nivel.color} p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow`} style={{ "--i": i } as React.CSSProperties}>
              <div className={`w-12 h-12 ${nivel.iconBg} rounded-lg flex items-center justify-center mb-5`}>
                <span className="text-white font-extrabold text-lg">{nivel.letter}</span>
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-1">{nivel.titulo}</h3>
              <p className={`${nivel.textColor} font-bold text-sm mb-4`}>{nivel.idade}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{nivel.descricao}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${nivel.textColor} font-semibold text-sm hover:gap-2.5 transition-all`}>
                Saiba mais
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   8. ESTRUTURA
   ═══════════════════════════════════════════════════════════════════════ */

function Estrutura() {
  const espacos = [
    { nome: "Salas de Aula", desc: "Climatizadas e equipadas", color: "bg-primary" },
    { nome: "Biblioteca", desc: "Acervo completo", color: "bg-primary-light" },
    { nome: "Parque Infantil", desc: "Area segura", color: "bg-green" },
    { nome: "Quadra Coberta", desc: "Atividades esportivas", color: "bg-red" },
    { nome: "Refeitorio", desc: "Alimentacao balanceada", color: "bg-secondary-dark" },
    { nome: "Patio Coberto", desc: "Eventos e brincadeiras", color: "bg-primary-dark" },
  ];

  return (
    <section id="estrutura" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-green rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Estrutura</span>
            <div className="w-8 h-1 bg-green rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Espacos planejados para o <span className="text-green">aprendizado</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Ambientes modernos, seguros e pensados para estimular a curiosidade.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 reveal-scale">
          {espacos.map((esp) => (
            <div key={esp.nome} className="group relative rounded-lg overflow-hidden aspect-[4/3] cursor-pointer">
              <div className={`absolute inset-0 ${esp.color}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <svg className="w-8 h-8 mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="font-bold text-sm sm:text-base text-center">{esp.nome}</p>
                <p className="text-white/70 text-xs mt-0.5">{esp.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href={WHATSAPP_VISITA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-white font-bold px-8 py-3.5 rounded-md transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Agende uma visita para conhecer
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   9. VIDEO
   ═══════════════════════════════════════════════════════════════════════ */

function VideoSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-red rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Tour Virtual</span>
            <div className="w-8 h-1 bg-red rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Conheca nossa escola <span className="text-primary">por dentro</span>
          </h2>
        </div>
        <div className="reveal-scale">
          <div className="video-container shadow-lg border border-gray-200">
            <div className="absolute inset-0 bg-primary flex items-center justify-center" style={{ borderRadius: "0.75rem" }}>
              <div className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="font-semibold">Video institucional</p>
                <p className="text-white/50 text-sm mt-1">Em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   10. DEPOIMENTOS
   ═══════════════════════════════════════════════════════════════════════ */

function Depoimentos() {
  const deps = [
    { nome: "Maria Silva", rel: "Mae - Fundamental I", texto: "Meu filho ama estudar aqui! Os professores sao muito atenciosos e a evolucao dele foi incrivel." },
    { nome: "Carlos Ribeiro", rel: "Pai - Ed. Infantil", texto: "A melhor escola de Barretos. O Sistema Objetivo e excelente e as criancas aprendem brincando." },
    { nome: "Ana Paula Costa", rel: "Mae - Bercario", texto: "A equipe e extremamente carinhosa e profissional. Confio plenamente nos cuidados que ele recebe." },
    { nome: "Fernando Almeida", rel: "Pai - Fundamental I", texto: "O diferencial da EEVI e o carinho com cada crianca. O acompanhamento individualizado fez toda diferenca." },
  ];

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-secondary rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Depoimentos</span>
            <div className="w-8 h-1 bg-secondary rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">O que os <span className="text-primary">pais dizem</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {deps.map((dep, i) => (
            <div key={dep.nome} className="reveal bg-muted rounded-lg p-6 border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all" style={{ "--i": i } as React.CSSProperties}>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map((j) => (
                  <svg key={j} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{dep.texto}&rdquo;</p>
              <div className="border-t border-gray-200 pt-3">
                <p className="font-bold text-foreground text-sm">{dep.nome}</p>
                <p className="text-xs text-gray-400 mt-0.5">{dep.rel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   11. FAQ
   ═══════════════════════════════════════════════════════════════════════ */

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "Qual a faixa etaria atendida?", a: "Atendemos de 5 meses (bercario) ate 10 anos (Fundamental I)." },
    { q: "Qual o sistema de ensino?", a: "Sistema de Ensino Objetivo, alinhado a BNCC." },
    { q: "Quais os horarios?", a: "Segunda a sexta, 7h as 18h. Manha, tarde e integral." },
    { q: "Como funciona a matricula?", a: "Agende uma visita pelo WhatsApp, conheca a escola e faca a matricula." },
    { q: "Oferece alimentacao?", a: "Sim, refeitorio com cardapio de nutricionista." },
    { q: "Tem atividades extracurriculares?", a: "Sim, atividades esportivas, artisticas e culturais." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-primary rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Duvidas</span>
            <div className="w-8 h-1 bg-primary rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Perguntas <span className="text-primary">Frequentes</span></h2>
        </div>
        <div className="space-y-2 reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-foreground pr-4 text-sm sm:text-base">{faq.q}</span>
                <svg className={`w-5 h-5 text-primary flex-shrink-0 faq-chevron ${openIndex === i ? "open" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`faq-content ${openIndex === i ? "open" : ""}`}>
                <div className="px-5 pb-5"><p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   12. CTA MATRICULA (banner vermelho)
   ═══════════════════════════════════════════════════════════════════════ */

function CTAMatricula() {
  return (
    <section className="py-16 sm:py-20 bg-red relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-red-dark" />
        <div className="flex-1 bg-green" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal-scale">
        <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-sm mb-6">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
          <span className="text-white text-sm font-bold">Vagas Limitadas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Matriculas Abertas 2026</h2>
        <p className="text-xl text-white/80 mb-8 font-medium">Garanta a vaga do seu filho na melhor escola de Barretos.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-md transition-colors shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Fale pelo WhatsApp
          </a>
          <a href="#contato" className="inline-flex items-center justify-center gap-2 bg-white text-red font-bold px-8 py-4 rounded-md transition-colors shadow-lg hover:bg-gray-50">
            Matricule-se
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   13. CONTATO
   ═══════════════════════════════════════════════════════════════════════ */

function Contato() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const formData = new FormData(e.currentTarget);
    const data = { nome: formData.get("nome"), telefone: formData.get("telefone"), email: formData.get("email"), interesse: formData.get("interesse"), mensagem: formData.get("mensagem") };
    try {
      const res = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setFormState("sent"); (e.target as HTMLFormElement).reset(); setTimeout(() => setFormState("idle"), 5000); }
      else setFormState("error");
    } catch { setFormState("error"); }
  }, []);

  return (
    <section id="contato" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-green rounded" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Contato</span>
            <div className="w-8 h-1 bg-green rounded" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Venha nos <span className="text-green">conhecer</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="reveal-left space-y-5">
            {[
              { label: "Endereco", value: "Avenida 25, 437 - Centro\nBarretos - SP, 14780-330", color: "bg-primary/10 text-primary" },
              { label: "WhatsApp", value: PHONE_DISPLAY, color: "bg-green/10 text-green", link: WHATSAPP_URL },
              { label: "Horario", value: "Segunda a Sexta: 7h as 18h", color: "bg-secondary/10 text-secondary-dark" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg bg-muted border border-gray-100">
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="font-bold text-xs">{item.label.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm mb-0.5">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-green hover:text-green-dark font-medium text-sm transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-gray-600 text-sm whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <p className="font-bold text-foreground text-sm mb-3">Redes Sociais</p>
              <div className="flex gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg flex items-center justify-center hover:scale-105 transition-transform" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:scale-105 transition-transform" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <div className="bg-muted rounded-lg p-6 sm:p-8 border border-gray-200">
              <h3 className="text-lg font-extrabold text-foreground mb-1">Agende sua visita</h3>
              <p className="text-gray-500 text-sm mb-6">Preencha e entraremos em contato.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome completo <span className="text-red">*</span></label>
                  <input name="nome" type="text" required placeholder="Seu nome" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp <span className="text-red">*</span></label>
                    <input name="telefone" type="tel" required placeholder="(17) 99999-9999" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                    <input name="email" type="email" placeholder="seu@email.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Interesse</label>
                  <select name="interesse" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Selecione...</option>
                    <option value="Bercario">Bercario (5 meses a 1 ano)</option>
                    <option value="Educacao Infantil">Educacao Infantil (1 a 5 anos)</option>
                    <option value="Fundamental I">Fundamental I (6 a 10 anos)</option>
                    <option value="Visita">Agendar Visita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mensagem</label>
                  <textarea name="mensagem" rows={3} placeholder="Conte-nos sobre seu interesse..." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none" />
                </div>
                <button type="submit" disabled={formState === "sending"} className="w-full bg-red hover:bg-red-dark text-white font-bold py-3.5 rounded-md transition-colors disabled:opacity-50 text-sm">
                  {formState === "sending" ? "Enviando..." : formState === "sent" ? "Enviado com sucesso!" : "Enviar Mensagem"}
                </button>
                {formState === "error" && <p className="text-red text-sm text-center">Erro ao enviar. Tente pelo <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">WhatsApp</a>.</p>}
                {formState === "sent" && <p className="text-green text-sm text-center font-medium">Mensagem enviada!</p>}
              </form>
            </div>
          </div>
        </div>
        <div className="mt-14 rounded-lg overflow-hidden border border-gray-200 reveal">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.8!2d-48.5678!3d-20.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+25%2C+437+-+Centro%2C+Barretos+-+SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localizacao EEVI" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   14. FOOTER
   ═══════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="h-1 flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-red" />
        <div className="flex-1 bg-green" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris" className="h-14 w-auto rounded bg-white p-1 mb-4" />
            <p className="text-white/50 text-sm leading-relaxed">Educacao de qualidade em Barretos desde 2002. Sistema de Ensino Objetivo.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Links</h4>
            <div className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => <a key={link.href} href={link.href} className="block text-white/50 hover:text-white transition-colors">{link.label}</a>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Contato</h4>
            <div className="space-y-2.5 text-sm text-white/50">
              <p>Av. 25, 437 - Centro</p>
              <p>Barretos - SP, 14780-330</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">{PHONE_DISPLAY}</a>
              <p>Seg a Sex: 7h as 18h</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-secondary">Redes Sociais</h4>
            <div className="space-y-2.5 text-sm">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                @colegiovalcrisvidadecrianca
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                /eeividadecrianca
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} EEVI Vida de Crianca - Colegio Valcris. Todos os direitos reservados.</p>
            <p>CNPJ: {CNPJ}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   15. FLOATING
   ═══════════════════════════════════════════════════════════════════════ */

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} aria-label="WhatsApp">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <svg className="w-6 h-6 relative" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  );
}

function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const h = () => setVisible(window.scrollY > 400); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <a href={PHONE_TEL} className="flex items-center justify-center w-11 h-11 bg-primary/10 text-primary rounded-lg" aria-label="Ligar">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 bg-[#25D366]/10 text-[#25D366] rounded-lg" aria-label="WhatsApp">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 bg-red hover:bg-red-dark text-white text-center font-bold py-3 rounded-lg transition-colors">Matricule-se</a>
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
      <TopBar />
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Sobre />
        <SistemaEnsino />
        <NiveisEnsino />
        <Estrutura />
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
