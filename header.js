// Conteúdo do header HTML
var headerHTML = '<header class="cabeça" id="form-header">' +
    '<nav class="header-nav" id="header-nav">' +
        '<a href="index.html" class="header-link">Home</a>' +
        '<a href="Facilita-NFE.html" class="header-link">Facilita NFE</a>' +
        '<a href="Business-Inteligence.html" class="header-link">Business Intelligence</a>' +
        '<a href="Integracao-Bling.html" class="header-link">Bling</a>' +
        '<a href="Integrações.html" class="header-link">Integrações</a>' +
        '<a href="autoatendimento.html" class="header-link">Autoatendimento</a>' +
        '<a href="Smart-menu.html" class="header-link">Smart Menu</a>' +
        '<a href="Monitor-KDS.html" class="header-link">Monitor KDS</a>' +
        '<a href="Programa-de-fidelidade.html" class="header-link">Programa Fidelidade</a>' +
        '<a href="Real-Time.html" class="header-link">Real-Time</a>' +
        '<a href="Mesas-e-comandas.html" class="header-link">Mesas e Comandas</a>' +
        '<a href="Tef.html" class="header-link">TEF</a>' +
        '<a href="SmartTEF.html" class="header-link">Smart TEF</a>' +
        '<a href="Coletor-de-dados.html" class="header-link">Coletor de Dados</a>' +
        '<a href="Painel-Senha.html" class="header-link">Painel de Senha</a>' +
        '<a href="Mytapp.html" class="header-link">MyTapp</a>' +
        '<a href="Beerpass.html" class="header-link">Beerpass</a>' +
        '<a href="Equipamentos.html" class="header-link">Equipamentos</a>' +
        '<a href="Franquias.html" class="header-link">Franquias</a>' +
        '<a href="Formulario-sdr.html" class="header-link">SDR</a>' +
        '<a href="Formulario-closer.html" class="header-link">Formulário</a>' +
        '<a href="Matriz-objecao.html" class="header-link">Matriz Objeção</a>' +
    '</nav>' +
    '<button class="menu-toggle-btn" id="menu-toggle-btn" aria-label="Menu">' +
        '<span class="menu-text">Menu</span>' +
    '</button>' +
    '<div class="menu-overlay" id="menu-overlay"></div>' +
    '<div class="menu-sidebar" id="menu-sidebar">' +
        '<div class="menu-header">' +
            '<h2 class="menu-title">Navegação</h2>' +
            '<button class="menu-close-btn" id="menu-close-btn" aria-label="Fechar">×</button>' +
        '</div>' +
        '<div class="menu-columns">' +
            '<div class="menu-column">' +
                '<h3 class="menu-column-title">ERP</h3>' +
                '<ul class="menu-links-list">' +
                    '<li><a href="Facilita-NFE.html" class="menu-link">Facilita NFE</a></li>' +
                    '<li><a href="Business-Inteligence.html" class="menu-link">Business Intelligence</a></li>' +
                    '<li><a href="Integracao-Bling.html" class="menu-link">Bling</a></li>' +
                    '<li><a href="Integrações.html" class="menu-link">Integrações</a></li>' +
                '</ul>' +
            '</div>' +
            '<div class="menu-column">' +
                '<h3 class="menu-column-title">PDV</h3>' +
                '<ul class="menu-links-list">' +
                    '<li><a href="autoatendimento.html" class="menu-link">Autoatendimento</a></li>' +
                    '<li><a href="Smart-menu.html" class="menu-link">Smart Menu</a></li>' +
                    '<li><a href="Monitor-KDS.html" class="menu-link">Monitor KDS</a></li>' +
                    '<li><a href="Programa-de-fidelidade.html" class="menu-link">Programa Fidelidade</a></li>' +
                    '<li><a href="Real-Time.html" class="menu-link">Real-Time</a></li>' +
                    '<li><a href="Mesas-e-comandas.html" class="menu-link">Mesas e Comandas</a></li>' +
                    '<li><a href="Tef.html" class="menu-link">TEF</a></li>' +
                    '<li><a href="Coletor-de-dados.html" class="menu-link">Coletor de Dados</a></li>' +
                '</ul>' +
            '</div>' +
            '<div class="menu-column">' +
                '<h3 class="menu-column-title">IMPLEMENTAÇÃO</h3>' +
                '<ul class="menu-links-list">' +
                    '<li><a href="Equipamentos.html" class="menu-link">Equipamentos</a></li>' +
                    '<li><a href="Franquias.html" class="menu-link">Franquias</a></li>' +
                    '<li><a href="Formulario-sdr.html" class="menu-link">SDR</a></li>' +
                    '<li><a href="Formulario-closer.html" class="menu-link">Formulário</a></li>' +
                    '<li><a href="Matriz-objecao.html" class="menu-link">Matriz Objeção</a></li>' +
                '</ul>' +
            '</div>' +
            '<div class="menu-column">' +
                '<h3 class="menu-column-title">COMERCIAL</h3>' +
                '<ul class="menu-links-list">' +
                    '<li><a href="AiqFome.html" class="menu-link">AiqFome</a></li>' +
                    '<li><a href="AnotaAI.html" class="menu-link">AnotaAI</a></li>' +
                    '<li><a href="Delivery-Direto.html" class="menu-link">Delivery Direto</a></li>' +
                    '<li><a href="Ifood.html" class="menu-link">iFood</a></li>' +
                    '<li><a href="Rappi.html" class="menu-link">Rappi</a></li>' +
                    '<li><a href="Neemo.html" class="menu-link">Neemo</a></li>' +
                    '<li><a href="Alloy Delivery.html" class="menu-link">Alloy Delivery</a></li>' +
                    '<li><a href="Accon.html" class="menu-link">Accon</a></li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</header>';

function carregarHeader() {
    var headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
        console.error('Elemento header-placeholder não encontrado');
        return;
    }
    
    // Insere o HTML do header diretamente
    headerPlaceholder.innerHTML = headerHTML;
    
    // Inicializa o menu após o header ser carregado
    inicializarMenu();
    // inicializarHardwareCards(); // Desabilitado - cards agora expandem automaticamente
}

// Função desabilitada - cards agora expandem automaticamente sem botão "Ver mais"
/*
function inicializarHardwareCards() {
    // Torna cards (.hardware-card) colapsáveis quando ultrapassarem 230px de altura
    var COLLAPSED_HEIGHT = 230;
    var cards = document.querySelectorAll('.hardware-card');
    if (!cards || cards.length === 0) return;

    cards.forEach(function(card) {
        if (card.classList && card.classList.contains('no-expand')) return;
        // Evita duplicar botões em caso de reinicialização
        if (card.dataset && card.dataset.expandInit === '1') return;
        if (card.dataset) card.dataset.expandInit = '1';

        // Garante que a medição seja feita sem max-height aplicado
        var previousMaxHeight = card.style.maxHeight;
        card.style.maxHeight = '';

        var needsCollapse = card.scrollHeight > COLLAPSED_HEIGHT;
        if (!needsCollapse) {
            card.style.maxHeight = previousMaxHeight || '';
            return;
        }

        card.classList.add('is-collapsible');
        card.style.maxHeight = COLLAPSED_HEIGHT + 'px';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hardware-card-expand-btn';
        btn.textContent = 'Ver mais';
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', function() {
            var expanded = card.classList.contains('is-expanded');

            if (expanded) {
                // Colapsa
                card.classList.remove('is-expanded');
                btn.textContent = 'Ver mais';
                btn.setAttribute('aria-expanded', 'false');
                // Reaplica altura colapsada com transição
                card.style.maxHeight = COLLAPSED_HEIGHT + 'px';
            } else {
                // Expande
                card.classList.add('is-expanded');
                btn.textContent = 'Ver menos';
                btn.setAttribute('aria-expanded', 'true');
                // Define maxHeight para scrollHeight para animar "abrindo"
                card.style.maxHeight = card.scrollHeight + 'px';
            }
        });

        // Se o usuário redimensionar a janela, atualiza alturas do card expandido
        window.addEventListener('resize', function() {
            if (card.classList.contains('is-expanded')) {
                card.style.maxHeight = card.scrollHeight + 'px';
            }
        });

        card.appendChild(btn);
    });
}
*/

function inicializarMenu() {
    var menuToggleBtn = document.getElementById('menu-toggle-btn');
    var menuCloseBtn = document.getElementById('menu-close-btn');
    var menuSidebar = document.getElementById('menu-sidebar');
    var menuOverlay = document.getElementById('menu-overlay');
    
    if (!menuToggleBtn || !menuSidebar || !menuOverlay) {
        // Tenta novamente após um pequeno delay se os elementos ainda não existirem
        setTimeout(inicializarMenu, 50);
        return;
    }
    
    // Função para abrir o menu
    function abrirMenu() {
        menuSidebar.classList.add('menu-open');
        menuOverlay.classList.add('menu-overlay-active');
        document.body.style.overflow = 'hidden'; // Previne scroll do body
    }
    
    // Função para fechar o menu
    function fecharMenu() {
        menuSidebar.classList.remove('menu-open');
        menuOverlay.classList.remove('menu-overlay-active');
        document.body.style.overflow = ''; // Restaura scroll do body
    }
    
    // Abre o menu ao clicar no botão
    menuToggleBtn.addEventListener('click', abrirMenu);
    
    // Fecha o menu ao clicar no botão de fechar
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', fecharMenu);
    }
    
    // Fecha o menu ao clicar no overlay
    menuOverlay.addEventListener('click', fecharMenu);
    
    // Fecha o menu ao clicar em um link
    var menuLinks = menuSidebar.querySelectorAll('.menu-link');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            setTimeout(fecharMenu, 100); // Pequeno delay para permitir navegação
        });
    });
    
    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuSidebar.classList.contains('menu-open')) {
            fecharMenu();
        }
    });
    
    // Marca o link ativo baseado na URL atual
    var currentPath = window.location.pathname.split('/').pop() || window.location.href;
    menuLinks.forEach(function(link) {
        var linkHref = link.getAttribute('href');
        if (currentPath === linkHref || currentPath.endsWith(linkHref)) {
            link.classList.add('menu-link-active');
        }
    });
    
    // Marca o link ativo no header também
    var headerLinks = document.querySelectorAll('.header-link');
    headerLinks.forEach(function(link) {
        var linkHref = link.getAttribute('href');
        if (currentPath === linkHref || currentPath.endsWith(linkHref)) {
            link.classList.add('header-link-active');
        }
    });
}

// Aguarda o carregamento completo da página
if (window.addEventListener) {
    window.addEventListener('load', carregarHeader, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', carregarHeader);
} else {
    // Fallback para navegadores muito antigos
    if (document.readyState === 'complete') {
        carregarHeader();
    } else {
        window.onload = carregarHeader;
    }
}
