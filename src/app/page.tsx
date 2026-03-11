"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════ CONSTANTS ═══════════════════ */

const WA = "https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20escola.";
const WA_VISITA = "https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita.";
const IG = "https://www.instagram.com/colegiovalcrisvidadecrianca/";
const FB = "https://www.facebook.com/eeividadecrianca/";
const PHONE = "(17) 99701-4713";
const TEL = "tel:+5517997014713";
const CNPJ = "05.460.684/0001-28";

const NAV = [
  { href: "#sobre", label: "A Escola" },
  { href: "#ensino", label: "Ensino" },
  { href: "#niveis", label: "Niveis" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

/* ═══════════════════ ICONS (SVG) ═══════════════════ */

function IconPhone({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}

function IconWhatsApp({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
}

function IconInstagram({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
}

function IconFacebook({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}

function IconChevron({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
}

/* ═══════════════════ HOOKS ═══════════════════ */

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale");
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCounter(ref: React.RefObject<HTMLElement | null>, target: number, suffix = "") {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const dur = 2000, start = performance.now();
          const anim = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(anim);
          };
          requestAnimationFrame(anim);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target]);
  return val + suffix;
}

/* ═══════════════════ 1. TOP BAR (dark navy, estilo Objetivo) ═══════════════════ */

function TopBar() {
  return (
    <div className="bg-navy text-white text-xs">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9">
        <div className="flex items-center gap-5">
          <a href={TEL} className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <IconPhone className="w-3 h-3" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green transition-colors">
            <IconWhatsApp className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-white/50">Sistema de Ensino Objetivo</span>
          <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram"><IconInstagram className="w-3.5 h-3.5" /></a>
          <a href={FB} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook"><IconFacebook className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ 2. HEADER (white, estilo Objetivo) ═══════════════════ */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-[70px]">
        <a href="#" className="flex-shrink-0">
          <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-11 sm:h-[52px] w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 text-[13px] font-semibold text-primary hover:text-accent uppercase tracking-wide transition-colors">{l.label}</a>
          ))}
        </nav>

        <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold text-sm px-6 py-2.5 rounded-sm transition-colors">
          Matriculas Abertas
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-primary" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <img src="/logo-valcris-objetivo.jpg" alt="Logo" className="h-9" />
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-gray-100 rounded" aria-label="Fechar"><svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="p-4 space-y-1">
            {NAV.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-primary hover:text-accent hover:bg-gray-50 font-semibold text-sm rounded transition-colors">{l.label}</a>)}
          </div>
          <div className="p-4 border-t border-gray-200">
            <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="block bg-accent text-white text-center font-bold py-3 rounded-sm text-sm">Matriculas Abertas</a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════ 3. HERO BANNER (full-width, estilo Objetivo carousel) ═══════════════════ */

function HeroBanner() {
  const slides = [
    {
      title: "Matriculas Abertas 2026",
      subtitle: "Venha conhecer o Colegio Valcris",
      desc: "Educacao Infantil e Ensino Fundamental com o Sistema de Ensino Objetivo em Barretos.",
      cta: "Agende uma Visita",
      bg: "from-primary via-primary to-navy",
    },
    {
      title: "Sistema de Ensino Objetivo",
      subtitle: "Educacao de qualidade reconhecida em todo Brasil",
      desc: "Material didatico atualizado, metodologia comprovada e tecnologia educacional.",
      cta: "Saiba Mais",
      bg: "from-navy via-primary to-primary",
    },
    {
      title: "Do Bercario ao Fundamental I",
      subtitle: "Cuidado e aprendizagem desde os 5 meses",
      desc: "Ambiente seguro, professores qualificados e infraestrutura completa.",
      cta: "Conheca a Escola",
      bg: "from-primary to-navy-light",
    },
  ];

  const [curr, setCurr] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurr((p) => (p + 1) % slides.length), 7000);
  }, [slides.length]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const goTo = (i: number) => { setCurr(i); startTimer(); };

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slides[curr].bg} transition-all duration-1000`} />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] bg-gold/10 rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4">
        <div className="py-16 sm:py-20 lg:py-28 min-h-[420px] sm:min-h-[480px] flex items-center">
          <div key={curr} className="hero-slide-active max-w-2xl">
            <span className="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-sm mb-5">
              {slides[curr].title}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-white leading-tight mb-4 lg:leading-[1.15]">
              {slides[curr].subtitle}
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {slides[curr].desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3.5 rounded-sm text-sm transition-colors shadow-lg text-center cursor-pointer">
                {slides[curr].cta}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3.5 rounded-sm text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm">
                <IconWhatsApp className="w-4 h-4" />
                Fale pelo WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full transition-all cursor-pointer ${i === curr ? "bg-accent w-8" : "bg-white/40 hover:bg-white/60"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Gold accent bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-gold to-accent" />
    </section>
  );
}

/* ═══════════════════ 4. NIVEIS DE ENSINO (cards estilo Objetivo) ═══════════════════ */

function NiveisEnsino() {
  const niveis = [
    { titulo: "Bercario", idade: "5 meses a 1 ano", desc: "Cuidado afetuoso com estimulacao sensorial, motora e cognitiva em ambiente seguro e acolhedor.", color: "border-t-red", accent: "text-red", bg: "bg-red/5" },
    { titulo: "Educacao Infantil", idade: "1 a 5 anos", desc: "Aprendizagem ludica com o Sistema Objetivo. Socializacao, criatividade e desenvolvimento integral.", color: "border-t-secondary", accent: "text-secondary", bg: "bg-secondary/5" },
    { titulo: "Ensino Fundamental I", idade: "6 a 10 anos", desc: "Base solida com o Sistema Objetivo. Formacao academica, cidadania e preparacao para o futuro.", color: "border-t-green", accent: "text-green", bg: "bg-green/5" },
  ];
  return (
    <section id="niveis" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Niveis de Ensino</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">Do bercario ao Ensino Fundamental</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 reveal">Acompanhamos o desenvolvimento do seu filho em todas as fases com o suporte do Sistema de Ensino Objetivo.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {niveis.map((n) => (
            <div key={n.titulo} className={`reveal bg-white border border-gray-200 ${n.color} border-t-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group`}>
              {/* Card image placeholder */}
              <div className={`${n.bg} h-48 flex items-center justify-center`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-white shadow-sm flex items-center justify-center`}>
                    <svg className={`w-8 h-8 ${n.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <span className={`${n.accent} font-bold text-sm`}>{n.idade}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-primary text-xl mb-2 group-hover:text-accent transition-colors">{n.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{n.desc}</p>
                <a href={WA} target="_blank" rel="noopener noreferrer" className={`${n.accent} font-semibold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer`}>
                  Saiba mais <IconArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 5. POR QUE ESTUDAR (estilo "motivos" do Objetivo) ═══════════════════ */

function PorQueEstudar() {
  const motivos = [
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>, title: "Sistema Objetivo", desc: "Material didatico atualizado e reconhecido nacionalmente." },
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>, title: "Professores qualificados", desc: "Equipe dedicada e em constante formacao." },
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>, title: "Ambiente seguro", desc: "Infraestrutura completa e monitoramento constante." },
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>, title: "Carinho e acolhimento", desc: "Cada aluno e unico e recebe atencao especial." },
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>, title: "Estrutura completa", desc: "Salas climatizadas, parque, quadra, biblioteca e refeitorio." },
    { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>, title: "Valores e cidadania", desc: "Formacao integral com etica, respeito e responsabilidade." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Diferenciais</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">Por que estudar no Colegio Valcris?</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 reveal">Oferecemos uma educacao completa, aliando o melhor sistema de ensino do Brasil a um ambiente acolhedor e seguro.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {motivos.map((m) => (
            <div key={m.title} className="reveal bg-white rounded-sm border border-gray-200 p-6 hover:shadow-md hover:border-accent/30 transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-sm flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">{m.icon}</div>
              <h3 className="font-bold text-primary text-base mb-2">{m.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 6. SOBRE A ESCOLA ═══════════════════ */

function Sobre() {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal-left">
            <p className="text-accent font-bold text-xs uppercase tracking-widest mb-2">A Escola</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-5 leading-tight">Educacao que transforma desde 2002</h2>
            <p className="text-gray-500 leading-relaxed mb-4">Ha mais de 24 anos, o <strong className="text-primary">Colegio Valcris & EEVI Vida de Crianca</strong> forma cidadaos em Barretos com ensino de excelencia e muito carinho.</p>
            <p className="text-gray-500 leading-relaxed mb-6">Somos conveniados ao <strong className="text-primary">Sistema de Ensino Objetivo</strong>, o maior sistema de ensino do Brasil, reconhecido por sua metodologia moderna, resultados comprovados e material didatico de alta qualidade.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Amor e Carinho", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>, color: "text-red bg-red/10" },
                { label: "Seguranca", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>, color: "text-primary bg-primary/10" },
                { label: "Sistema Objetivo", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>, color: "text-accent bg-accent/10" },
                { label: "Familia Escolar", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>, color: "text-green bg-green/10" },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-3 cursor-pointer">
                  <span className={`w-10 h-10 rounded-sm flex items-center justify-center ${v.color}`}>{v.icon}</span>
                  <span className="text-primary font-semibold text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div className="bg-muted rounded-sm border border-gray-200 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-24 w-auto mx-auto mb-4 opacity-60" />
                <p className="text-gray-400 text-sm">Foto da escola</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 7. SISTEMA OBJETIVO (parceria) ═══════════════════ */

function SistemaEnsino() {
  return (
    <section id="ensino" className="py-16 sm:py-24 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <span className="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-4">Parceria</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">Sistema de Ensino Objetivo</h2>
            <p className="text-white/70 leading-relaxed mb-6">Somos escola conveniada ao Sistema de Ensino Objetivo, garantindo educacao de alta qualidade reconhecida em todo o Brasil. Com mais de 60 anos de historia, o Objetivo e referencia em educacao no pais.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { n: "01", title: "Material didatico reconhecido", desc: "Livros atualizados e alinhados a BNCC." },
                { n: "02", title: "Metodologia comprovada", desc: "Decadas de resultados e aprovacoes." },
                { n: "03", title: "Preparacao para o futuro", desc: "Habilidades academicas e socioemocionais." },
                { n: "04", title: "Tecnologia educacional", desc: "Plataformas digitais de aprendizagem." },
              ].map((b) => (
                <div key={b.n} className="bg-white/10 backdrop-blur-sm rounded-sm p-5 hover:bg-white/15 transition-colors cursor-pointer">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-accent/20 text-accent font-bold text-xs rounded-sm mb-3">{b.n}</span>
                  <h3 className="text-white font-bold text-sm mb-1">{b.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right flex justify-center">
            <div className="bg-white rounded-sm p-10 shadow-2xl text-center max-w-sm w-full">
              <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-20 w-auto mx-auto mb-5" />
              <p className="text-primary font-extrabold text-lg mb-1">Escola Conveniada</p>
              <p className="text-accent font-semibold text-sm mb-5">Sistema de Ensino Objetivo</p>
              <div className="h-px bg-gray-200 mb-5" />
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-primary font-extrabold text-2xl">24+</p>
                  <p className="text-gray-400 text-xs">Anos</p>
                </div>
                <div className="text-center">
                  <p className="text-accent font-extrabold text-2xl">500+</p>
                  <p className="text-gray-400 text-xs">Alunos</p>
                </div>
                <div className="text-center">
                  <p className="text-green font-extrabold text-2xl">15+</p>
                  <p className="text-gray-400 text-xs">Professores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 8. NUMEROS (estilo "em numeros" do Objetivo) ═══════════════════ */

function Numeros() {
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const v1 = useCounter(r1, 24, "+");
  const v2 = useCounter(r2, 500, "+");
  const v3 = useCounter(r3, 15, "+");
  const v4 = useCounter(r4, 98, "%");

  return (
    <section className="py-14 sm:py-20 bg-gold/10 border-y border-gold/20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { ref: r1, val: v1, label: "Anos de historia" },
            { ref: r2, val: v2, label: "Alunos formados" },
            { ref: r3, val: v3, label: "Professores dedicados" },
            { ref: r4, val: v4, label: "Satisfacao dos pais" },
          ].map((s) => (
            <div key={s.label} ref={s.ref} className="text-center">
              <p className="counter-value text-4xl sm:text-5xl font-extrabold text-primary mb-1">{s.val}</p>
              <p className="text-gray-600 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 9. ESTRUTURA ═══════════════════ */

function Estrutura() {
  const espacos = [
    { nome: "Salas Climatizadas", desc: "Ambientes modernos e confortaveis", color: "bg-primary" },
    { nome: "Biblioteca", desc: "Acervo amplo e atualizado", color: "bg-secondary" },
    { nome: "Parque Infantil", desc: "Area de recreacao segura", color: "bg-green" },
    { nome: "Quadra Coberta", desc: "Esportes e atividades fisicas", color: "bg-accent" },
    { nome: "Refeitorio", desc: "Alimentacao com nutricionista", color: "bg-red" },
    { nome: "Patio Coberto", desc: "Convivencia e eventos", color: "bg-navy-light" },
  ];
  return (
    <section id="estrutura" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Infraestrutura</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">Espacos planejados para o aprendizado</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 reveal">Nossa estrutura foi pensada para oferecer conforto, seguranca e estimulo ao desenvolvimento dos alunos.</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 reveal-scale">
          {espacos.map((e) => (
            <div key={e.nome} className="group relative rounded-sm overflow-hidden aspect-[3/2] cursor-pointer">
              <div className={`absolute inset-0 ${e.color}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <p className="text-white font-bold text-sm sm:text-lg drop-shadow-sm mb-1">{e.nome}</p>
                <p className="text-white/70 text-xs sm:text-sm hidden sm:block">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3.5 rounded-sm text-sm transition-colors cursor-pointer">
            Agende uma visita e conheca
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 10. DEPOIMENTOS (estilo Objetivo carousel) ═══════════════════ */

function Depoimentos() {
  const deps = [
    { nome: "Maria Silva", rel: "Mae - Fundamental I", txt: "Os professores sao extremamente atenciosos e a evolucao do meu filho foi incrivel. Recomendo de olhos fechados!" },
    { nome: "Carlos Ribeiro", rel: "Pai - Ed. Infantil", txt: "A melhor escola de Barretos, sem duvida. O Sistema Objetivo faz toda a diferenca na qualidade do ensino." },
    { nome: "Ana Paula Costa", rel: "Mae - Bercario", txt: "Equipe muito carinhosa e profissional. Minha filha adora ir para a escola. Confio plenamente no Valcris." },
    { nome: "Roberto Mendes", rel: "Pai - Fundamental I", txt: "A infraestrutura e excelente e os valores ensinados sao fundamentais. Meu filho se desenvolveu muito." },
  ];
  const [curr, setCurr] = useState(0);
  const visible = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Depoimentos</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">O que os pais dizem</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 reveal">A confianca das familias e o nosso maior reconhecimento.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {deps.slice(0, 3).map((d) => (
            <div key={d.nome} className="reveal bg-white border border-gray-200 rounded-sm p-6 hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((s) => <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
              <p className="text-gray-500 text-sm leading-relaxed italic mb-5">&ldquo;{d.txt}&rdquo;</p>
              <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{d.nome[0]}</div>
                <div>
                  <p className="text-primary font-bold text-sm">{d.nome}</p>
                  <p className="text-gray-400 text-xs">{d.rel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 11. FAQ ═══════════════════ */

function FAQ() {
  const [idx, setIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Qual a faixa etaria atendida?", a: "Atendemos criancas de 5 meses (bercario) ate 10 anos (Ensino Fundamental I), acompanhando todo o desenvolvimento na primeira infancia e inicio da vida escolar." },
    { q: "Qual o sistema de ensino utilizado?", a: "Utilizamos o Sistema de Ensino Objetivo, o maior e mais reconhecido sistema de ensino do Brasil, com material didatico atualizado e alinhado a BNCC." },
    { q: "Quais sao os horarios de funcionamento?", a: "Funcionamos de segunda a sexta, das 7h as 18h. Oferecemos periodos manha, tarde e integral." },
    { q: "Como funciona o processo de matricula?", a: "O primeiro passo e agendar uma visita para conhecer nossa escola. Entre em contato pelo WhatsApp e agende o melhor horario para voce." },
    { q: "A escola oferece alimentacao?", a: "Sim, contamos com refeitorio proprio e cardapio elaborado por nutricionista, garantindo alimentacao saudavel e equilibrada." },
    { q: "Quais atividades extracurriculares sao oferecidas?", a: "Oferecemos diversas atividades como educacao fisica, musica, artes, informatica e projetos pedagogicos especiais ao longo do ano." },
  ];
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Duvidas</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">Perguntas Frequentes</h2>
        <p className="text-center text-gray-500 mb-10 reveal">Tire suas duvidas sobre o Colegio Valcris.</p>
        <div className="space-y-3 reveal">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
              <button onClick={() => setIdx(idx === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="font-semibold text-primary text-sm pr-4">{f.q}</span>
                <IconChevron className={`w-5 h-5 text-accent flex-shrink-0 faq-chevron ${idx === i ? "open" : ""}`} />
              </button>
              <div className={`faq-content ${idx === i ? "open" : ""}`}>
                <div className="px-5 pb-5"><p className="text-gray-500 text-sm leading-relaxed">{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 12. CTA MATRICULA ═══════════════════ */

function CTAMatricula() {
  return (
    <section className="py-16 sm:py-24 bg-accent relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full translate-y-1/2 translate-x-1/4" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center reveal-scale">
        <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-sm mb-5">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse-soft" /> Vagas Limitadas
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">Matriculas Abertas 2026</h2>
        <p className="text-white/80 text-lg mb-10">Garanta a vaga do seu filho na melhor escola de Barretos com Sistema Objetivo.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-white text-accent hover:bg-gray-100 font-bold px-10 py-4 rounded-sm text-sm transition-colors shadow-lg cursor-pointer">
            Fale pelo WhatsApp
          </a>
          <a href="#contato" className="bg-primary hover:bg-primary-light text-white font-bold px-10 py-4 rounded-sm text-sm transition-colors cursor-pointer">
            Matricule-se Agora
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 13. CONTATO ═══════════════════ */

function Contato() {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const submit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setState("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome: fd.get("nome"), telefone: fd.get("telefone"), email: fd.get("email"), interesse: fd.get("interesse"), mensagem: fd.get("mensagem") }) });
      if (res.ok) { setState("sent"); (e.target as HTMLFormElement).reset(); setTimeout(() => setState("idle"), 5000); }
      else setState("error");
    } catch { setState("error"); }
  }, []);

  return (
    <section id="contato" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-center text-accent font-bold text-xs uppercase tracking-widest mb-2 reveal">Contato</p>
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-4 reveal">Venha nos conhecer</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 reveal">Estamos prontos para receber sua familia. Agende uma visita ou envie uma mensagem.</p>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal-left space-y-4">
            {[
              { label: "Endereco", value: "Avenida 25, 437 - Centro\nBarretos - SP, 14780-330", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
              { label: "WhatsApp", value: PHONE, link: WA, icon: <IconWhatsApp className="w-5 h-5" /> },
              { label: "Horario", value: "Segunda a Sexta: 7h as 18h", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-4 bg-muted border border-gray-200 rounded-sm">
                <span className="w-10 h-10 bg-accent/10 text-accent rounded-sm flex items-center justify-center flex-shrink-0">{c.icon}</span>
                <div>
                  <p className="text-primary font-bold text-sm">{c.label}</p>
                  {c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-green font-medium text-sm hover:underline cursor-pointer">{c.value}</a> : <p className="text-gray-500 text-sm whitespace-pre-line">{c.value}</p>}
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <a href={IG} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-sm flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" aria-label="Instagram"><IconInstagram className="w-5 h-5" /></a>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] text-white rounded-sm flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" aria-label="Facebook"><IconFacebook className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="reveal-right">
            <form onSubmit={submit} className="bg-muted border border-gray-200 rounded-sm p-6 sm:p-8 space-y-4">
              <h3 className="text-primary font-bold text-lg mb-1">Agende sua visita</h3>
              <p className="text-gray-500 text-sm mb-4">Preencha o formulario e entraremos em contato.</p>
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-600 mb-1">Nome completo <span className="text-red">*</span></label>
                <input id="nome" name="nome" required placeholder="Seu nome completo" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-gray-600 mb-1">WhatsApp <span className="text-red">*</span></label>
                  <input id="telefone" name="telefone" required placeholder="(17) 99999-9999" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="email@exemplo.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="interesse" className="block text-sm font-semibold text-gray-600 mb-1">Interesse</label>
                <select id="interesse" name="interesse" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-colors">
                  <option value="">Selecione o nivel de ensino...</option>
                  <option>Bercario</option>
                  <option>Educacao Infantil</option>
                  <option>Ensino Fundamental I</option>
                  <option>Agendar Visita</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-600 mb-1">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows={3} placeholder="Conte-nos como podemos ajudar..." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none resize-none transition-colors" />
              </div>
              <button type="submit" disabled={state==="sending"} className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-sm text-sm transition-colors disabled:opacity-50 cursor-pointer">
                {state==="sending" ? "Enviando..." : state==="sent" ? "Mensagem Enviada!" : "Enviar Mensagem"}
              </button>
              {state==="error" && <p className="text-red text-sm text-center">Ocorreu um erro. Tente pelo <a href={WA} target="_blank" rel="noopener noreferrer" className="underline cursor-pointer">WhatsApp</a>.</p>}
              {state==="sent" && <p className="text-green text-sm text-center font-medium">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>}
            </form>
          </div>
        </div>
        <div className="mt-12 rounded-sm overflow-hidden border border-gray-200 reveal">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.8!2d-48.5678!3d-20.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+25%2C+437+-+Centro%2C+Barretos+-+SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" title="Localizacao - Colegio Valcris" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 14. FOOTER (dark navy, estilo Objetivo) ═══════════════════ */

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1200px] mx-auto px-4 pt-14 pb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Col 1 - Institucional */}
          <div>
            <img src="/logo-valcris-objetivo.jpg" alt="Logo Colegio Valcris" className="h-14 bg-white p-1.5 rounded-sm mb-4" />
            <p className="text-white/50 text-sm leading-relaxed mb-4">Educacao de qualidade em Barretos desde 2002, com o Sistema de Ensino Objetivo.</p>
            <div className="flex gap-3">
              <a href={IG} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-accent text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer" aria-label="Instagram"><IconInstagram className="w-4 h-4" /></a>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-accent text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer" aria-label="Facebook"><IconFacebook className="w-4 h-4" /></a>
            </div>
          </div>
          {/* Col 2 - Institucional */}
          <div>
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-4">Institucional</h4>
            <div className="space-y-2.5 text-sm">
              <a href="#sobre" className="block text-white/50 hover:text-white transition-colors cursor-pointer">A Escola</a>
              <a href="#ensino" className="block text-white/50 hover:text-white transition-colors cursor-pointer">Sistema Objetivo</a>
              <a href="#niveis" className="block text-white/50 hover:text-white transition-colors cursor-pointer">Niveis de Ensino</a>
              <a href="#estrutura" className="block text-white/50 hover:text-white transition-colors cursor-pointer">Estrutura</a>
              <a href="#depoimentos" className="block text-white/50 hover:text-white transition-colors cursor-pointer">Depoimentos</a>
            </div>
          </div>
          {/* Col 3 - Ensino */}
          <div>
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-4">Ensino</h4>
            <div className="space-y-2.5 text-sm">
              <p className="text-white/50">Bercario (5 meses a 1 ano)</p>
              <p className="text-white/50">Educacao Infantil (1 a 5 anos)</p>
              <p className="text-white/50">Fundamental I (6 a 10 anos)</p>
              <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="block text-accent hover:text-accent-dark font-semibold transition-colors cursor-pointer">Matriculas Abertas</a>
            </div>
          </div>
          {/* Col 4 - Contato */}
          <div>
            <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-4">Contato</h4>
            <div className="space-y-2.5 text-sm text-white/50">
              <p>Avenida 25, 437 - Centro</p>
              <p>Barretos - SP, 14780-330</p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors cursor-pointer">{PHONE}</a>
              <p>Seg a Sex: 7h as 18h</p>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>&copy; 2002 - {new Date().getFullYear()} EEVI Vida de Crianca - Colegio Valcris. Todos os direitos reservados.</p>
          <p>CNPJ: {CNPJ}</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ 15. FLOATING ELEMENTS ═══════════════════ */

function WhatsAppBtn() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" className={`fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer ${v ? "opacity-100" : "opacity-0 translate-y-4"}`} aria-label="WhatsApp">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <IconWhatsApp className="w-7 h-7 relative" />
    </a>
  );
}

function MobileBar() {
  const [v, setV] = useState(false);
  useEffect(() => { const h = () => setV(window.scrollY > 400); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ${v ? "translate-y-0" : "translate-y-full"}`}>
      <div className="flex items-center px-4 py-2.5 gap-3">
        <a href={TEL} className="w-10 h-10 bg-primary/10 text-primary rounded-sm flex items-center justify-center flex-shrink-0 cursor-pointer"><IconPhone className="w-5 h-5" /></a>
        <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="flex-1 bg-accent hover:bg-accent-dark text-white text-center font-bold py-3 rounded-sm text-sm transition-colors cursor-pointer">Agende uma Visita</a>
      </div>
    </div>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */

export default function Home() {
  useScrollReveal();
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <HeroBanner />
        <NiveisEnsino />
        <PorQueEstudar />
        <Sobre />
        <SistemaEnsino />
        <Numeros />
        <Estrutura />
        <Depoimentos />
        <FAQ />
        <CTAMatricula />
        <Contato />
      </main>
      <Footer />
      <WhatsAppBtn />
      <MobileBar />
    </>
  );
}
