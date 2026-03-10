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

/* ═══════════════════ 1. TOP BAR ═══════════════════ */

function TopBar() {
  return (
    <div className="bg-navy text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        <div className="flex items-center gap-5">
          <a href={TEL} className="flex items-center gap-1.5 hover:text-orange transition-colors">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green transition-colors">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
          <a href={FB} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ 2. HEADER ═══════════════════ */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-[72px]">
        <a href="#" className="flex-shrink-0">
          <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-10 sm:h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-semibold text-gray-600 hover:text-primary uppercase tracking-wide transition-colors">{l.label}</a>
          ))}
        </nav>

        <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold text-sm px-5 py-2.5 rounded transition-colors">
          Agende uma Visita
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <img src="/logo-valcris-objetivo.jpg" alt="Logo" className="h-9" />
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-gray-100 rounded"><svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="p-4 space-y-1">
            {NAV.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-gray-600 hover:text-primary hover:bg-gray-50 font-medium text-sm rounded transition-colors">{l.label}</a>)}
          </div>
          <div className="p-4 border-t border-gray-100">
            <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="block bg-orange text-white text-center font-bold py-3 rounded text-sm">Agende uma Visita</a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════ 3. HERO (fundo claro com imagem, estilo Objetivo) ═══════════════════ */

function Hero() {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 sm:py-16 lg:py-20">
          <div>
            <span className="inline-block bg-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
              Matriculas Abertas 2026
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight mb-5">
              Venha conhecer o<br />
              <span className="text-primary">Colegio Valcris</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Educacao Infantil e Ensino Fundamental em Barretos com o
              Sistema de Ensino Objetivo. Do bercario ao Fundamental I.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="bg-orange hover:bg-orange-dark text-white font-bold px-7 py-3.5 rounded text-center text-sm transition-colors shadow-sm">
                Agende uma Visita
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold px-7 py-3.5 rounded text-center text-sm transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Fale pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-sm w-full border border-gray-100">
              <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-24 w-auto mx-auto mb-5" />
              <p className="text-navy font-bold text-lg">+ de 24 anos</p>
              <p className="text-gray-400 text-sm">formando criancas em Barretos</p>
              <div className="mt-5 pt-5 border-t border-gray-100 flex justify-center gap-6">
                <div className="text-center">
                  <p className="text-primary font-extrabold text-xl">500+</p>
                  <p className="text-gray-400 text-xs">Alunos</p>
                </div>
                <div className="text-center">
                  <p className="text-orange font-extrabold text-xl">24+</p>
                  <p className="text-gray-400 text-xs">Anos</p>
                </div>
                <div className="text-center">
                  <p className="text-green font-extrabold text-xl">15+</p>
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

/* ═══════════════════ 4. NIVEIS (cards estilo Objetivo) ═══════════════════ */

function NiveisEnsino() {
  const niveis = [
    { titulo: "Bercario", idade: "5 meses a 1 ano", desc: "Cuidado afetuoso com estimulacao sensorial, motora e cognitiva.", borderColor: "border-t-red", iconColor: "text-red" },
    { titulo: "Educacao Infantil", idade: "1 a 5 anos", desc: "Aprendizagem ludica com o Sistema Objetivo. Socializacao e criatividade.", borderColor: "border-t-primary", iconColor: "text-primary" },
    { titulo: "Ensino Fundamental", idade: "6 a 10 anos", desc: "Base solida com o Sistema Objetivo. Formacao academica e cidadania.", borderColor: "border-t-green", iconColor: "text-green" },
  ];
  return (
    <section id="niveis" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-primary font-bold text-xs uppercase tracking-widest mb-2 reveal">Niveis de Ensino</p>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-navy mb-10 reveal">Do bercario ao Fundamental I</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {niveis.map((n) => (
            <div key={n.titulo} className={`reveal bg-white border ${n.borderColor} border-t-4 rounded shadow-sm hover:shadow-md transition-shadow p-6`}>
              <h3 className="font-bold text-navy text-lg mb-0.5">{n.titulo}</h3>
              <p className={`${n.iconColor} font-semibold text-sm mb-3`}>{n.idade}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{n.desc}</p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className={`${n.iconColor} font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all`}>
                Saiba mais <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 5. SOBRE ═══════════════════ */

function Sobre() {
  return (
    <section id="sobre" className="py-14 sm:py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">A Escola</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-5 leading-tight">Educacao que transforma desde 2002</h2>
            <p className="text-gray-500 leading-relaxed mb-4">Ha mais de 24 anos, o <strong className="text-navy">Colegio Valcris & EEVI Vida de Crianca</strong> forma cidadaos em Barretos com ensino de excelencia e muito carinho.</p>
            <p className="text-gray-500 leading-relaxed mb-6">Utilizamos o <strong className="text-navy">Sistema de Ensino Objetivo</strong>, reconhecido nacionalmente por sua metodologia moderna e eficaz.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Amor e Carinho", icon: "♥", color: "text-red bg-red/10" },
                { label: "Seguranca", icon: "🛡", color: "text-primary bg-primary/10" },
                { label: "Sistema Objetivo", icon: "📚", color: "text-orange bg-orange/10" },
                { label: "Familia Escolar", icon: "👨‍👩‍👧", color: "text-green bg-green/10" },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded flex items-center justify-center text-sm ${v.color}`}>{v.icon}</span>
                  <span className="text-navy font-semibold text-sm">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div className="bg-white rounded shadow-sm border border-gray-200 aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-14 h-14 mx-auto mb-3 rounded bg-gray-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-gray-300 text-sm">Foto da escola</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 6. SISTEMA OBJETIVO (fundo BRANCO) ═══════════════════ */

function SistemaEnsino() {
  return (
    <section id="ensino" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2 reveal-left">
            <p className="text-orange font-bold text-xs uppercase tracking-widest mb-2">Parceria</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">Sistema de Ensino Objetivo</h2>
            <p className="text-gray-500 leading-relaxed mb-6">Somos escola conveniada ao Sistema de Ensino Objetivo, garantindo educacao de alta qualidade reconhecida em todo o Brasil.</p>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded p-4">
              <img src="/logo-valcris-objetivo.jpg" alt="Colegio Valcris - Sistema Objetivo" className="h-14 w-auto" />
              <div>
                <p className="text-navy font-bold text-sm">Escola Conveniada</p>
                <p className="text-orange text-xs font-semibold">Sistema de Ensino Objetivo</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 reveal-right">
            {[
              { n: "1", title: "Material didatico reconhecido", desc: "Livros atualizados e alinhados com a BNCC." },
              { n: "2", title: "Metodologia comprovada", desc: "Decadas de resultados em aprovacoes." },
              { n: "3", title: "Preparacao para o futuro", desc: "Habilidades academicas e socioemocionais." },
              { n: "4", title: "Tecnologia educacional", desc: "Plataformas digitais de aprendizagem." },
            ].map((b) => (
              <div key={b.n} className="bg-gray-50 border border-gray-200 rounded p-5 hover:border-orange/50 transition-colors">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-orange/10 text-orange font-bold text-sm rounded mb-3">{b.n}</span>
                <h3 className="text-navy font-bold text-sm mb-1">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 7. ESTRUTURA ═══════════════════ */

function Estrutura() {
  const espacos = [
    { nome: "Salas de Aula", color: "bg-primary" },
    { nome: "Biblioteca", color: "bg-primary-light" },
    { nome: "Parque Infantil", color: "bg-green" },
    { nome: "Quadra Coberta", color: "bg-orange" },
    { nome: "Refeitorio", color: "bg-red" },
    { nome: "Patio", color: "bg-navy-light" },
  ];
  return (
    <section id="estrutura" className="py-14 sm:py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-primary font-bold text-xs uppercase tracking-widest mb-2 reveal">Estrutura</p>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-navy mb-10 reveal">Espacos planejados para o aprendizado</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 reveal-scale">
          {espacos.map((e) => (
            <div key={e.nome} className="group relative rounded overflow-hidden aspect-[3/2] cursor-pointer">
              <div className={`absolute inset-0 ${e.color}`} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-bold text-sm sm:text-base drop-shadow">{e.nome}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 reveal">
          <a href={WA_VISITA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold px-6 py-3 rounded text-sm transition-colors">
            Agende uma visita
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 8. DEPOIMENTOS ═══════════════════ */

function Depoimentos() {
  const deps = [
    { nome: "Maria Silva", rel: "Mae - Fundamental I", txt: "Os professores sao atenciosos e a evolucao do meu filho foi incrivel." },
    { nome: "Carlos Ribeiro", rel: "Pai - Ed. Infantil", txt: "A melhor escola de Barretos. O Sistema Objetivo e excelente." },
    { nome: "Ana Paula Costa", rel: "Mae - Bercario", txt: "Equipe carinhosa e profissional. Confio plenamente." },
  ];
  return (
    <section id="depoimentos" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-primary font-bold text-xs uppercase tracking-widest mb-2 reveal">Depoimentos</p>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-navy mb-10 reveal">O que os pais dizem</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {deps.map((d) => (
            <div key={d.nome} className="reveal bg-gray-50 border border-gray-200 rounded p-6">
              <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((s) => <svg key={s} className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
              <p className="text-gray-500 text-sm leading-relaxed italic mb-4">&ldquo;{d.txt}&rdquo;</p>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-navy font-bold text-sm">{d.nome}</p>
                <p className="text-gray-400 text-xs">{d.rel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 9. FAQ ═══════════════════ */

function FAQ() {
  const [idx, setIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Qual a faixa etaria atendida?", a: "De 5 meses (bercario) ate 10 anos (Fundamental I)." },
    { q: "Qual o sistema de ensino?", a: "Sistema de Ensino Objetivo, alinhado a BNCC." },
    { q: "Quais os horarios?", a: "Segunda a sexta, 7h as 18h. Manha, tarde e integral." },
    { q: "Como funciona a matricula?", a: "Agende uma visita pelo WhatsApp e conheca a escola." },
    { q: "Oferece alimentacao?", a: "Sim, refeitorio com cardapio de nutricionista." },
  ];
  return (
    <section className="py-14 sm:py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-primary font-bold text-xs uppercase tracking-widest mb-2 reveal">Duvidas</p>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-navy mb-8 reveal">Perguntas Frequentes</h2>
        <div className="space-y-2 reveal">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded overflow-hidden">
              <button onClick={() => setIdx(idx === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-navy text-sm pr-4">{f.q}</span>
                <svg className={`w-4 h-4 text-primary flex-shrink-0 faq-chevron ${idx === i ? "open" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`faq-content ${idx === i ? "open" : ""}`}>
                <div className="px-4 pb-4"><p className="text-gray-500 text-sm leading-relaxed">{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 10. CTA MATRICULA ═══════════════════ */

function CTAMatricula() {
  return (
    <section className="py-14 sm:py-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-scale">
        <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold uppercase px-3 py-1 rounded mb-4">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-soft" /> Vagas Limitadas
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Matriculas Abertas 2026</h2>
        <p className="text-white/70 text-lg mb-8">Garanta a vaga do seu filho na melhor escola de Barretos.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded text-sm transition-colors shadow-sm">
            Fale pelo WhatsApp
          </a>
          <a href="#contato" className="bg-white text-primary font-bold px-8 py-3.5 rounded text-sm transition-colors hover:bg-gray-50">
            Matricule-se
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 11. CONTATO ═══════════════════ */

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
    <section id="contato" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-primary font-bold text-xs uppercase tracking-widest mb-2 reveal">Contato</p>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-navy mb-10 reveal">Venha nos conhecer</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal-left space-y-4">
            {[
              { label: "Endereco", value: "Avenida 25, 437 - Centro\nBarretos - SP, 14780-330" },
              { label: "WhatsApp", value: PHONE, link: WA },
              { label: "Horario", value: "Segunda a Sexta: 7h as 18h" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="w-8 h-8 bg-primary/10 text-primary rounded flex items-center justify-center flex-shrink-0 text-xs font-bold">{c.label[0]}</span>
                <div>
                  <p className="text-navy font-semibold text-sm">{c.label}</p>
                  {c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-green text-sm font-medium hover:underline">{c.value}</a> : <p className="text-gray-500 text-sm whitespace-pre-line">{c.value}</p>}
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <a href={IG} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#1877F2] text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
            </div>
          </div>
          <div className="reveal-right">
            <form onSubmit={submit} className="bg-gray-50 border border-gray-200 rounded p-6 space-y-4">
              <h3 className="text-navy font-bold mb-1">Agende sua visita</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Nome <span className="text-red">*</span></label>
                <input name="nome" required placeholder="Seu nome" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">WhatsApp <span className="text-red">*</span></label><input name="telefone" required placeholder="(17) 99999-9999" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></div>
                <div><label className="block text-sm font-semibold text-gray-600 mb-1">E-mail</label><input name="email" type="email" placeholder="email@exemplo.com" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-600 mb-1">Interesse</label><select name="interesse" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"><option value="">Selecione...</option><option>Bercario</option><option>Educacao Infantil</option><option>Fundamental I</option><option>Visita</option></select></div>
              <div><label className="block text-sm font-semibold text-gray-600 mb-1">Mensagem</label><textarea name="mensagem" rows={3} placeholder="Conte-nos..." className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" /></div>
              <button type="submit" disabled={state==="sending"} className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 rounded text-sm transition-colors disabled:opacity-50">
                {state==="sending"?"Enviando...":state==="sent"?"Enviado!":"Enviar Mensagem"}
              </button>
              {state==="error" && <p className="text-red text-sm text-center">Erro. Tente pelo <a href={WA} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.</p>}
              {state==="sent" && <p className="text-green text-sm text-center">Mensagem enviada!</p>}
            </form>
          </div>
        </div>
        <div className="mt-10 rounded overflow-hidden border border-gray-200 reveal">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.8!2d-48.5678!3d-20.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+25%2C+437+-+Centro%2C+Barretos+-+SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy" title="Mapa" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 12. FOOTER (navy escuro) ═══════════════════ */

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src="/logo-valcris-objetivo.jpg" alt="Logo" className="h-12 bg-white p-1 rounded mb-3" />
            <p className="text-white/40 text-sm">Educacao de qualidade em Barretos desde 2002.</p>
          </div>
          <div>
            <h4 className="text-orange font-bold text-xs uppercase tracking-wider mb-3">Links</h4>
            <div className="space-y-2 text-sm">{NAV.map((l) => <a key={l.href} href={l.href} className="block text-white/40 hover:text-white transition-colors">{l.label}</a>)}</div>
          </div>
          <div>
            <h4 className="text-orange font-bold text-xs uppercase tracking-wider mb-3">Contato</h4>
            <div className="space-y-2 text-sm text-white/40">
              <p>Av. 25, 437 - Centro</p>
              <p>Barretos - SP</p>
              <a href={WA} className="block hover:text-white transition-colors">{PHONE}</a>
            </div>
          </div>
          <div>
            <h4 className="text-orange font-bold text-xs uppercase tracking-wider mb-3">Redes Sociais</h4>
            <div className="space-y-2 text-sm">
              <a href={IG} target="_blank" rel="noopener noreferrer" className="block text-white/40 hover:text-white transition-colors">Instagram</a>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="block text-white/40 hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/25">
          <p>&copy; {new Date().getFullYear()} EEVI Vida de Crianca - Colegio Valcris</p>
          <p>CNPJ: {CNPJ}</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ 13. FLOATING ═══════════════════ */

function WhatsAppBtn() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" className={`fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all ${v?"opacity-100":"opacity-0 translate-y-4"}`} aria-label="WhatsApp">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <svg className="w-6 h-6 relative" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  );
}

function MobileBar() {
  const [v, setV] = useState(false);
  useEffect(() => { const h = () => setV(window.scrollY > 400); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ${v?"translate-y-0":"translate-y-full"}`}>
      <div className="flex items-center px-4 py-2.5 gap-3">
        <a href={TEL} className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center flex-shrink-0"><svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></a>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="flex-1 bg-orange text-white text-center font-bold py-2.5 rounded text-sm">Agende uma Visita</a>
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
        <Hero />
        <NiveisEnsino />
        <Sobre />
        <SistemaEnsino />
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
