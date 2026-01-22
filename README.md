# Portal de Conhecimento ConnectPlug

Portal interno de capacitação e conhecimento técnico para o time de vendas e implementação da ConnectPlug. Este projeto centraliza informações sobre produtos, integrações, equipamentos homologados e ferramentas de apoio comercial.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Scripts Auxiliares](#scripts-auxiliares)
- [Manutenção](#manutenção)

## 🎯 Sobre o Projeto

O **Portal de Conhecimento ConnectPlug** é uma plataforma web desenvolvida para fornecer ao time de vendas e implementação acesso rápido e organizado a:

- **Guias técnicos** de produtos e funcionalidades
- **Lista de equipamentos homologados** (impressoras, balanças, TEF, etc.)
- **Documentação de integrações** com plataformas de delivery e ERP
- **Formulários de apoio** para processos de vendas (SDR e Closer)
- **Argumentos de venda** e matriz de objeções
- **Especificações técnicas** de hardware compatível

## 📁 Estrutura do Projeto

```
System-Closer/
│
├── index.html                 # Página inicial do portal
├── header.js                  # Sistema de navegação e menu
├── style.css                  # Estilos globais
│
├── data/
│   └── data.json             # Dados estruturados dos produtos
│
├── codes/                     # Scripts JavaScript auxiliares
│   ├── cupom_direita.js      # Sistema de cupons de desconto
│   ├── envio_zap_pipe.js     # Integração com WhatsApp
│   ├── fila implementacao.js  # Gestão de fila de implementação
│   ├── montagem_plano_sem_app.js  # Montagem de planos
│   └── request_cnpj.js       # Consulta de CNPJ
│
├── src/
│   └── img/                  # Imagens organizadas por módulo
│       ├── Autoatendimento/
│       ├── Balcao/
│       ├── Business-Inteligence/
│       ├── Coletor-de-Dados/
│       ├── Equipamentos/
│       ├── Facilita-NFE/
│       ├── Ifood/
│       ├── Integração-Bling/
│       ├── Integração-Delivery/
│       ├── KDS/
│       ├── Programa-de-fidelidade/
│       ├── Real-Time/
│       ├── Smart-menu/
│       └── Smart-Tef/
│
└── [Módulos HTML]            # Páginas de documentação por funcionalidade
```

## 🛠 Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e layout responsivo
- **JavaScript (Vanilla)** - Funcionalidades interativas
- **Google Fonts** - Tipografia (Bebas Neue, Kanit, Black Ops One)
- **LocalStorage** - Persistência de dados nos formulários
- **JSON** - Estruturação de dados

## ✨ Funcionalidades

### 📚 Módulos de Documentação

#### ERP & Gestão
- **Facilita-NFE.html** - Automação de notas fiscais eletrônicas
- **Business-Inteligence.html** - Relatórios e Business Intelligence
- **Integracao-Bling.html** - Integração com ERP Bling
- **Integrações.html** - Hub de integrações disponíveis

#### PDV & Operações
- **Tef.html** - Sistema de pagamentos TEF
- **SmartTEF.html** - Maquininhas SmartTEF compatíveis
- **autoatendimento.html** - Soluções de autoatendimento
- **Smart-menu.html** - Cardápio digital com QR Code
- **Mesas-e-comandas.html** - Gestão de mesas e comandas
- **Monitor-KDS.html** - Tela de pedidos para cozinha
- **Real-Time.html** - Sincronização em tempo real
- **Coletor-de-dados.html** - Coletor de dados móvel
- **Painel-Senha.html** - Sistema de senhas

#### Delivery & Integrações
- **Ifood.html** - Integração com iFood
- **Rappi.html** - Integração com Rappi
- **AiqFome.html** - Integração com AiqFome
- **AnotaAI.html** - Integração com AnotaAI
- **Delivery-Direto.html** - Delivery direto
- **Neemo.html** - Integração com Neemo
- **Alloy Delivery.html** - Integração com Alloy Delivery
- **Accon.html** - Integração com Accon

#### Outros Módulos
- **Programa-de-fidelidade.html** - Sistema de fidelidade
- **Mytapp.html** - Integração MyTapp
- **Beerpass.html** - Integração Beerpass

### 🛠 Ferramentas de Apoio

#### Equipamentos.html
Guia completo de hardware homologado:
- Impressoras térmicas (rede)
- Requisitos mínimos de PC
- Balanças compatíveis
- Tablets e celulares Android
- Bancos SiTef (PIX)
- POS móvel (Smart POS)
- Maquininhas SmartTEF
- Kits de autoatendimento
- Etiquetadoras compatíveis
- Leitores de código de barras
- Gavetas automáticas

**Recursos:**
- Cards com botão "Copiar" para envio rápido ao cliente
- Altura mínima de 215px com expansão automática
- Layout responsivo em grid

#### Formulario-closer.html
Formulário para processo de fechamento de vendas com:
- Persistência de dados via LocalStorage
- Campos para informações do cliente
- Argumentos de venda
- Matriz de objeções

#### Formulario-sdr.html
Formulário para processo SDR (Sales Development Representative) com:
- Qualificação de leads
- Dados do prospect
- Informações de contato

#### Matriz-objecao.html
Matriz de objeções comuns e respostas estratégicas para o time de vendas.

### 🎨 Sistema de Navegação

O arquivo `header.js` fornece:
- Menu de navegação responsivo
- Sidebar com categorização de módulos
- Destaque automático do link ativo
- Suporte a teclado (ESC para fechar menu)

## 🚀 Como Usar

### Acesso Local

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em um navegador moderno
3. Navegue pelos módulos através do menu superior

### Estrutura de Navegação

- **Menu Superior**: Links diretos para todas as páginas
- **Menu Lateral**: Organizado por categorias (ERP, PDV, Implementação, Comercial)
- **Página Inicial**: Visão geral dos módulos disponíveis

### Funcionalidades Interativas

- **Botão "Copiar"**: Nos cards de equipamentos, copia o texto formatado para envio ao cliente
- **LocalStorage**: Formulários salvam automaticamente os dados digitados
- **Menu Responsivo**: Adapta-se a diferentes tamanhos de tela

## 📂 Estrutura de Diretórios Detalhada

### `/codes/`
Scripts JavaScript reutilizáveis:

- **cupom_direita.js**: Sistema de cupons de desconto com painel lateral
- **envio_zap_pipe.js**: Integração para envio de mensagens via WhatsApp
- **fila implementacao.js**: Gestão de fila de implementação
- **montagem_plano_sem_app.js**: Montagem dinâmica de planos de produtos
- **request_cnpj.js**: Consulta de dados de CNPJ via API

### `/data/`
- **data.json**: Estrutura de dados dos produtos e funcionalidades do sistema

### `/src/img/`
Imagens organizadas por módulo para ilustração das funcionalidades.

## 🔧 Scripts Auxiliares

### header.js
Sistema centralizado de navegação:
- Carrega header dinamicamente em todas as páginas
- Gerencia menu responsivo
- Inicializa links ativos baseado na URL atual

**Nota**: A função `inicializarHardwareCards()` foi desabilitada para permitir expansão automática dos cards de equipamentos.

## 🎨 Personalização

### Cores Principais
- **Azul ConnectPlug**: `#004a99`
- **Cinza Profissional**: `#2c3e50`
- **Background**: `#f4f7f6`

### Fontes
- **Títulos**: Bebas Neue, Black Ops One
- **Corpo**: Kanit, Segoe UI

### Cards de Equipamentos
- Altura mínima: `215px`
- Expansão automática conforme conteúdo
- Layout em grid responsivo

## 📝 Manutenção

### Adicionar Novo Módulo

1. Crie um novo arquivo HTML (ex: `Novo-Modulo.html`)
2. Adicione o link no `header.js` na seção apropriada
3. Inclua imagens em `/src/img/` se necessário
4. Siga o padrão de estrutura dos módulos existentes

### Atualizar Equipamentos

1. Edite `Equipamentos.html`
2. Adicione/remova cards na seção `.grid-hardware`
3. Crie função JavaScript correspondente para o botão "Copiar"
4. Mantenha altura mínima de 215px nos cards

### Atualizar Dados de Produtos

1. Edite `data/data.json`
2. Mantenha a estrutura JSON consistente
3. Atualize referências nos arquivos HTML se necessário

## 🔒 Compatibilidade

- **Navegadores**: Chrome, Firefox, Edge, Safari (versões recentes)
- **Dispositivos**: Desktop, Tablet, Mobile (responsivo)
- **JavaScript**: ES5+ (compatível com navegadores modernos)

## 📄 Licença

Material de apoio interno da ConnectPlug - Uso restrito ao time de vendas e implementação.

## 👥 Contribuições

Este é um projeto interno. Para sugestões ou melhorias, entre em contato com a equipe de desenvolvimento.

---

**© 2026 ConnectPlug - Material de Apoio ao Time de Vendas**

