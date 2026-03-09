import { NextResponse } from "next/server";

// Depoimentos fallback (caso o Bubble/n8n esteja offline)
const depoimentosFallback = [
  {
    nome: "Maria Silva",
    texto:
      "Meu filho ama estudar aqui! Os professores sao muito atenciosos e a estrutura e otima. Recomendo de olhos fechados!",
    estrelas: 5,
  },
  {
    nome: "Carlos Santos",
    texto:
      "A melhor escola de Barretos. O sistema Objetivo e excelente e as criancas aprendem brincando.",
    estrelas: 5,
  },
  {
    nome: "Ana Oliveira",
    texto:
      "Desde o bercario meu filho estuda aqui. Hoje no Fundamental I, vejo o quanto ele evoluiu. Escola maravilhosa!",
    estrelas: 5,
  },
];

export async function GET() {
  try {
    // Tenta buscar depoimentos do n8n (que puxa do Bubble)
    const n8nDepoimentosUrl = process.env.N8N_DEPOIMENTOS_URL;

    if (n8nDepoimentosUrl) {
      const response = await fetch(n8nDepoimentosUrl, {
        next: { revalidate: 3600 }, // Cache por 1 hora
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }

    // Fallback para depoimentos estaticos
    return NextResponse.json(depoimentosFallback);
  } catch {
    return NextResponse.json(depoimentosFallback);
  }
}
