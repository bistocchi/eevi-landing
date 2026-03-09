"use client";

import { useState } from "react";

/* ───────── HEADER / NAVBAR ───────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#ensino", label: "Ensino" },
    { href: "#estrutura", label: "Estrutura" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">EV</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-primary font-bold text-sm leading-tight">
                EEVI Vida de Crianca
              </p>
              <p className="text-xs text-gray-500">Colegio Valcris</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20escola."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-green hover:bg-accent-green/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-0.5 bg-gray-700 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-gray-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-gray-700 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-primary font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20escola."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-green text-white text-center px-5 py-3 rounded-full font-semibold mt-2"
            >
              Fale pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────── HERO SECTION ───────── */
function Hero() {
  return (
    <section className="relative gradient-hero text-white pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              Matriculas Abertas 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Onde cada crianca
            <br />
            <span className="text-secondary">aprende e cresce</span>
            <br />
            com amor.
          </h1>

          <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-xl leading-relaxed">
            Escola de Educacao Infantil e Ensino Fundamental em Barretos.
            Do bercario (5 meses) ao Fundamental I com o{" "}
            <strong>Sistema de Ensino Objetivo</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20na%20escola."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-secondary-dark text-foreground font-bold px-8 py-4 rounded-full text-center transition-all hover:scale-105 shadow-lg"
            >
              Agende uma Visita
            </a>
            <a
              href="#sobre"
              className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-center transition-all"
            >
              Conheca a Escola
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+24 anos de historia</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sistema Objetivo</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>5 meses ao Fund. I</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── SOBRE ───────── */
function Sobre() {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Sobre Nos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
              Educacao que transforma desde{" "}
              <span className="text-primary">2002</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Ha mais de 24 anos, o <strong>Colegio Valcris & EEVI Vida de Crianca</strong>{" "}
              forma cidadaos em Barretos com ensino de qualidade, carinho e dedicacao.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Utilizamos o <strong>Sistema de Ensino Objetivo</strong>, reconhecido
              nacionalmente, que prepara os alunos para os desafios do futuro com uma
              metodologia moderna e eficaz.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "+24", label: "Anos de experiencia" },
                { num: "5m", label: "Idade minima (bercario)" },
                { num: "F1", label: "Ate Fundamental I" },
                { num: "OBJ", label: "Sistema Objetivo" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted rounded-2xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">{item.num}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 sm:p-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Nosso Compromisso
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Acreditamos que cada crianca e unica e merece uma educacao que respeite
                  seu ritmo de aprendizagem, estimule a curiosidade e promova o
                  desenvolvimento integral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── ENSINO ───────── */
function Ensino() {
  const niveis = [
    {
      titulo: "Bercario",
      idade: "5 meses a 1 ano",
      descricao:
        "Cuidado afetuoso com estimulacao sensorial, motora e cognitiva em ambiente seguro e acolhedor.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      cor: "from-pink-500 to-rose-500",
    },
    {
      titulo: "Educacao Infantil",
      idade: "1 a 5 anos",
      descricao:
        "Aprendizagem ludica com o Sistema Objetivo. Desenvolvimento da linguagem, socializacao e autonomia.",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      cor: "from-primary to-primary-light",
    },
    {
      titulo: "Fundamental I",
      idade: "6 a 10 anos",
      descricao:
        "Base solida com o Sistema Objetivo. Formacao academica completa com valores eticos e cidadania.",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      cor: "from-secondary to-secondary-dark",
    },
  ];

  return (
    <section id="ensino" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Niveis de Ensino
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Do bercario ao Fundamental I
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Acompanhamos o desenvolvimento do seu filho em cada fase,
            com metodologia e carinho.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {niveis.map((nivel) => (
            <div
              key={nivel.titulo}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${nivel.cor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={nivel.icon}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {nivel.titulo}
              </h3>
              <p className="text-primary font-semibold text-sm mb-3">
                {nivel.idade}
              </p>
              <p className="text-gray-600 leading-relaxed">{nivel.descricao}</p>
            </div>
          ))}
        </div>

        {/* Sistema Objetivo badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white border-2 border-primary/20 px-6 py-3 rounded-full">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">OBJ</span>
            </div>
            <span className="font-semibold text-foreground">
              Sistema de Ensino Objetivo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── ESTRUTURA ───────── */
function Estrutura() {
  const itens = [
    { nome: "Biblioteca", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { nome: "Parque Infantil", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { nome: "Quadra Coberta", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { nome: "Refeitorio", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
    { nome: "Patio Coberto", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { nome: "Salas Equipadas", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <section id="estrutura" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Infraestrutura
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Estrutura completa para seu filho
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Ambientes planejados para estimular o aprendizado e garantir a
            seguranca das criancas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {itens.map((item) => (
            <div
              key={item.nome}
              className="bg-muted hover:bg-primary/5 rounded-2xl p-6 text-center group transition-colors"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mb-3 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
              </div>
              <p className="font-semibold text-foreground">{item.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── DIFERENCIAIS ───────── */
function Diferenciais() {
  const items = [
    {
      titulo: "Sistema Objetivo",
      descricao:
        "Material didatico reconhecido nacionalmente, com metodologia que prepara para o futuro.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    },
    {
      titulo: "Equipe Qualificada",
      descricao:
        "Professores dedicados e em constante formacao para oferecer o melhor ensino.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      titulo: "Ambiente Acolhedor",
      descricao:
        "Espaco seguro e carinhoso onde cada crianca se sente em casa para aprender e crescer.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      titulo: "Acompanhamento Individual",
      descricao:
        "Atencao personalizada ao desenvolvimento de cada aluno, respeitando seu ritmo.",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    },
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Por que escolher a EEVI?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.titulo}
              className="bg-white rounded-2xl p-6 sm:p-8 flex gap-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── DEPOIMENTOS ───────── */
function Depoimentos() {
  const depoimentos = [
    {
      nome: "Maria S.",
      texto:
        "Meu filho ama estudar aqui! Os professores sao muito atenciosos e a estrutura e otima. Recomendo de olhos fechados!",
      estrelas: 5,
    },
    {
      nome: "Carlos R.",
      texto:
        "A melhor escola de Barretos. O Sistema Objetivo e excelente e as criancas aprendem brincando.",
      estrelas: 5,
    },
    {
      nome: "Ana P.",
      texto:
        "Desde o bercario meu filho estuda aqui. Hoje no Fundamental I, vejo o quanto ele evoluiu. Escola maravilhosa!",
      estrelas: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
            O que os pais dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((dep) => (
            <div
              key={dep.nome}
              className="bg-muted rounded-2xl p-6 sm:p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: dep.estrelas }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 italic">
                &ldquo;{dep.texto}&rdquo;
              </p>
              <p className="font-semibold text-foreground">{dep.nome}</p>
              <p className="text-sm text-gray-500">Mae/Pai de aluno</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FORMULARIO DE CONTATO ───────── */
function Contato() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="contato" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Contato
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
              Venha nos conhecer!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Agende uma visita e conheca nossa estrutura. Estamos prontos para
              receber voce e sua familia.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Endereco</p>
                  <p className="text-gray-600">
                    Avenida 25, 437 - Centro
                    <br />
                    Barretos - SP, 14780-330
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <a
                    href="https://wa.me/5517997014713"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-green hover:underline"
                  >
                    (17) 99701-4713
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Horario</p>
                  <p className="text-gray-600">
                    Segunda a Sexta: 7h as 18h
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              <a
                href="https://www.instagram.com/colegiovalcrisvidadecrianca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-xl flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/eeividadecrianca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-xl flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Agende sua visita
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo *
                </label>
                <input
                  name="nome"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp *
                </label>
                <input
                  name="telefone"
                  type="tel"
                  required
                  placeholder="(17) 99999-9999"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interesse
                </label>
                <select
                  name="interesse"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="Bercario">Bercario (5 meses a 1 ano)</option>
                  <option value="Educacao Infantil">Educacao Infantil (1 a 5 anos)</option>
                  <option value="Fundamental I">Fundamental I (6 a 10 anos)</option>
                  <option value="Visita">Agendar Visita</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  rows={3}
                  placeholder="Conte-nos sobre seu interesse..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full gradient-primary text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {formState === "sending"
                  ? "Enviando..."
                  : formState === "sent"
                    ? "Enviado com sucesso!"
                    : "Enviar Mensagem"}
              </button>
              {formState === "error" && (
                <p className="text-accent-red text-sm text-center">
                  Erro ao enviar. Tente pelo WhatsApp.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.8!2d-48.5678!3d-20.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+25%2C+437+-+Centro%2C+Barretos+-+SP!5e0!3m2!1spt-BR!2sbr!4v1"
            width="100%"
            height="300"
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

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="gradient-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">EV</span>
              </div>
              <div>
                <p className="font-bold text-sm">EEVI Vida de Crianca</p>
                <p className="text-xs text-white/70">Colegio Valcris</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Educacao de qualidade em Barretos desde 2002.
              Sistema de Ensino Objetivo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="space-y-2 text-sm text-white/70">
              <a href="#sobre" className="block hover:text-white transition-colors">Sobre</a>
              <a href="#ensino" className="block hover:text-white transition-colors">Ensino</a>
              <a href="#estrutura" className="block hover:text-white transition-colors">Estrutura</a>
              <a href="#contato" className="block hover:text-white transition-colors">Contato</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>Av. 25, 437 - Centro</p>
              <p>Barretos - SP, 14780-330</p>
              <a
                href="https://wa.me/5517997014713"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                (17) 99701-4713
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} EEVI Vida de Crianca - Colegio Valcris.
            Todos os direitos reservados. CNPJ: 05.460.684/0001-28
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ───────── WHATSAPP FLOATING BUTTON ───────── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5517997014713?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20escola."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
      aria-label="Fale pelo WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ───────── PAGE ───────── */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Ensino />
        <Estrutura />
        <Diferenciais />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
