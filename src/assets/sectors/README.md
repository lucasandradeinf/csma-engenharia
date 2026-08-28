# Fotografia dos segmentos

Pasta reservada às fotografias industriais dos cinco segmentos de atuação.

Coloque aqui um arquivo por segmento, **com exatamente estes nomes**:

```
mineracao.jpg
siderurgia.jpg
metalurgia.jpg
celulose.jpg
energia.jpg
```

`.jpg`, `.jpeg`, `.png`, `.webp` e `.avif` são aceitos. O componente
`src/components/Sectors.astro` lê a pasta em tempo de build
(`import.meta.glob`) e troca automaticamente o desenho técnico pela
fotografia correspondente — não é preciso editar código.

Enquanto o arquivo não existir, o painel do segmento exibe o desenho técnico
monolinear (`src/components/ui/SectorGlyph.astro`). O site continua íntegro
com zero, uma ou cinco fotografias.

## O que usar

Fotografia documental industrial real, não ilustração gerada.

| Segmento | Assunto preferido |
| --- | --- |
| Mineração | mina a céu aberto, bancadas, correias, britagem, carregamento |
| Siderurgia | alto-forno, estruturas metálicas, montagem pesada, linha de produção |
| Metalurgia | fornos, equipamentos de processo, linhas industriais, manutenção |
| Celulose | planta de processo, digestores, torres, tubulação |
| Energia | grandes equipamentos, subestações, turbinas, infraestrutura |

Enquadramento horizontal, proporção próxima de 4:3, lado maior a partir de
1600 px. O Astro gera as variantes responsivas e converte para WebP.

## Direitos

Nenhuma imagem de terceiros foi baixada ou incorporada ao repositório.
Use apenas fotografias próprias da CSMA/cliente ou licenciadas para uso
comercial, e registre a origem de cada arquivo antes de publicar.
