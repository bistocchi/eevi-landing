import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, telefone, email, mensagem, interesse } = body;

    if (!nome || !telefone) {
      return NextResponse.json(
        { error: "Nome e telefone sao obrigatorios" },
        { status: 400 }
      );
    }

    // Envia para o n8n via webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          telefone,
          email: email || "",
          mensagem: mensagem || "",
          interesse: interesse || "Matricula",
          origem: "landing-page",
          data: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar a mensagem" },
      { status: 500 }
    );
  }
}
