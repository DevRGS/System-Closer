(function () {
  // -------------------------------------------------------------------------
  // 1) Injetar CSS com animação suave
  // -------------------------------------------------------------------------
  const css = `
    /* Planos fora de .row.applications têm hover e borda */
    .plan-container {
      transition: box-shadow 0.3s, transform 0.3s;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
    }
    .plan-container:hover {
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
      transform: scale(1.01);
    }

    /* Painel Lateral (slide-in + fade-in) */
    .div-cupom-lateral {
      font-family: sans-serif;
      font-size: 14px;
      position: fixed;
      top: 50px;
      right: 0;
      width: 250px;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      z-index: 9999;
      box-shadow: -2px 2px 5px rgba(0,0,0,0.2);
      transform: translateX(110%);
      opacity: 0;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }
    .div-cupom-lateral.show {
      transform: translateX(0);
      opacity: 1;
    }

    /* Botão fixo de desconto */
    .btn-toggle-painel {
      position: fixed;
      bottom: 50px;
      right: 20px;
      z-index: 9999;
      width: 45px;
      height: 45px;
      background: #0b5ed7;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      line-height: 45px;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }

    /* Cartão de cupom (cada item) */
    .div-timer-cupom {
      position: relative;
      background: #f9f9f9;
      border-radius: 4px;
      margin-top: 10px;
      padding: 5px;
      border: 1px dashed #777;
      text-align: center;
    }
    .btn-close-cupom {
      position: absolute;
      top: 3px; right: 8px;
      background: #f00; color: #fff;
      border: none;
      border-radius: 50%;
      width: 20px; height: 20px;
      cursor: pointer; font-size: 14px;
      line-height: 14px; text-align: center;
    }
    .btn-download-cupom {
      position: absolute;
      top: 30px; right: 3px;
      background: #0b5ed7; color: #fff;
      border: none; border-radius: 4px;
      padding: 3px 6px; cursor: pointer;
      font-size: 12px;
    }

/* Div de aviso no meio da tela */
.div-aviso {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5%;
  z-index: 10000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Quando visível */
.div-aviso.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}

/* Fundo embaçado */
.blur-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0px);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}

.blur-background.show {
  opacity: 1;
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

/* Botão "X" para fechar */
.btn-close-aviso {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f00;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
}


    /* Estilos para spans */
    .span-sublinhada {
      text-decoration: underline;
    }
    .span-aviso-bold {
      font-weight: bold;
      font-size: 15px;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // -------------------------------------------------------------------------
  // 2) Botão fixo de desconto (invisível inicialmente)
  // -------------------------------------------------------------------------
  const btnTogglePainel = document.createElement('button');
  btnTogglePainel.className = 'btn-toggle-painel';
  btnTogglePainel.textContent = '٪';
  btnTogglePainel.style.display = 'none';
  document.body.appendChild(btnTogglePainel);

  btnTogglePainel.addEventListener('click', () => {
    const painel = criarPainelLateral();
    painel.classList.toggle('show');
  });

  // -------------------------------------------------------------------------
  // 3) Marcar planos (checkbox) fora de .row.applications
  // -------------------------------------------------------------------------
  const planContainers = document.querySelectorAll('.plan-container');
  planContainers.forEach((container) => {
    if (container.closest('.row.applications')) return;

    let planName = 'Desconhecido';
    const h2 = container.querySelector('.title-plan h2');
    if (h2) {
      planName = h2.innerText.trim();
    }
    container.dataset.planName = planName;

    if (!container.querySelector('.check-plan')) {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.marginBottom = '5px';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'check-plan';

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` Selecionar Plano ${planName}`));
      container.insertBefore(label, container.firstChild);
    }
  });

  // -------------------------------------------------------------------------
  // 4) LocalStorage + timers
  // -------------------------------------------------------------------------
  let cuponsData = {};

  function salvarCuponsLocalStorage() {
    localStorage.setItem('cuponsData', JSON.stringify(cuponsData));
  }

  function carregarCuponsLocalStorage() {
    const dataStr = localStorage.getItem('cuponsData');
    if (!dataStr) return;
    try {
      cuponsData = JSON.parse(dataStr);
      Object.keys(cuponsData).forEach((planName) => {
        let lista = cuponsData[planName];
        if (!Array.isArray(lista)) lista = [lista];
        lista = lista.filter(c => Date.now() < c.expiraEm);
        cuponsData[planName] = lista;
        lista.forEach((cupomObj) => {
          exibirTimerCupom(planName, cupomObj);
        });
      });
      salvarCuponsLocalStorage();
    } catch (e) {
      console.error('Erro ao carregar cuponsData:', e);
    }
  }

  function getTotalCupons() {
    let total = 0;
    Object.keys(cuponsData).forEach((planName) => {
      const arr = cuponsData[planName];
      if (Array.isArray(arr)) {
        total += arr.length;
      }
    });
    return total;
  }

  function gerarCodigoCupom() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    for (let i = 0; i < 7; i++) {
      const rand = Math.floor(Math.random() * letras.length);
      codigo += letras[rand];
    }
    if (!codigo.includes('C')) {
      const pos = Math.floor(Math.random() * 7);
      codigo = codigo.substring(0, pos) + 'C' + codigo.substring(pos + 1);
    }
    return codigo;
  }

  // -------------------------------------------------------------------------
  // 5) Criar Painel Lateral (inicia sem .show => oculto)
  // -------------------------------------------------------------------------
  function criarPainelLateral() {
    let divCupomLateral = document.querySelector('.div-cupom-lateral');
    if (divCupomLateral) {
      return divCupomLateral;
    }
    divCupomLateral = document.createElement('div');
    divCupomLateral.className = 'div-cupom-lateral';

    const titulo = document.createElement('h4');
    titulo.textContent = 'Cupons Ativos';
    titulo.style.marginTop = '0';
    divCupomLateral.appendChild(titulo);

    const btnAplicar = document.createElement('button');
    btnAplicar.textContent = 'Aplicar Cupom';
    btnAplicar.style.display = 'block';
    btnAplicar.style.marginBottom = '10px';
    btnAplicar.addEventListener('click', () => {
      aplicarCupomViaPainel();
    });
    divCupomLateral.appendChild(btnAplicar);

    const timersContainer = document.createElement('div');
    timersContainer.className = 'timers-container';
    divCupomLateral.appendChild(timersContainer);

    document.body.appendChild(divCupomLateral);
    return divCupomLateral;
  }

  // -------------------------------------------------------------------------
  // 6) Forçar abertura do painel
  // -------------------------------------------------------------------------
  function exibirPainelLateral() {
    const painel = criarPainelLateral();
    painel.classList.add('show');
    btnTogglePainel.style.display = 'block';
  }

  document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('btn-editar-desconto')) {
      console.log('Botão btn-editar-desconto clicado');
      exibirPainelLateral();
    }
  });

  // -------------------------------------------------------------------------
  // 7) Aplicar Cupom (via prompt)
  // -------------------------------------------------------------------------
  function aplicarCupomViaPainel() {
    if (getTotalCupons() >= 4) {
      mostrarAvisoLimiteCupons();
      return;
    }

    const descStr = prompt('Qual porcentagem de desconto? (máx 40%)', '10');
    if (!descStr) return;
    const desconto = parseFloat(descStr.replace(',', '.'));
    if (isNaN(desconto) || desconto <= 0 || desconto > 40) {
      alert('Desconto inválido!');
      return;
    }

    const horasStr = prompt('Por quantas horas? (máx 48)', '12');
    if (!horasStr) return;
    const horas = parseInt(horasStr, 10);
    if (isNaN(horas) || horas <= 0 || horas > 48) {
      alert('Horas inválidas!');
      return;
    }

    const selecionados = document.querySelectorAll(
      '.plan-container:not(.row .applications .plan-container) .check-plan:checked'
    );
    if (!selecionados.length) {
      alert('Nenhum plano selecionado!');
      return;
    }

    const agora = Date.now();
    const expiraEm = agora + (horas * 60 * 60 * 1000);

    selecionados.forEach(chk => {
      if (getTotalCupons() >= 4) return;

      const container = chk.closest('.plan-container');
      if (!container) return;
      const planName = container.dataset.planName || 'Desconhecido';

      const codigo = gerarCodigoCupom();
      const cupomObj = {
        id: 'cupom_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        desconto,
        codigo,
        expiraEm
      };

      const inputDesc = container.querySelector('.input-desconto');
      if (inputDesc) {
        inputDesc.value = desconto;
      }
      const inputCupom = container.querySelector('.input-cupom');
      if (inputCupom) {
        inputCupom.value = codigo;
      }

      if (!cuponsData[planName]) {
        cuponsData[planName] = [];
      }
      cuponsData[planName].push(cupomObj);
      salvarCuponsLocalStorage();

      exibirTimerCupom(planName, cupomObj);
      console.log(`Cupom criado no plano "${planName}": ${codigo}, desconto=${desconto}%, horas=${horas}`);
    });
  }

  // Função para mostrar o aviso de limite de cupons
  function mostrarAvisoLimiteCupons() {
    let blurBackground = document.querySelector('.blur-background');
    if (!blurBackground) {
      blurBackground = document.createElement('div');
      blurBackground.className = 'blur-background';
      document.body.appendChild(blurBackground);
    }
    blurBackground.classList.add('show');

    let divAviso = document.querySelector('.div-aviso');
    if (!divAviso) {
      divAviso = document.createElement('div');
      divAviso.className = 'div-aviso';
      divAviso.innerHTML = `
        <button class="btn-close-aviso">X</button>
        <p><span class="span-sublinhada">Limite de cupons atingido!</span><br><br>Remova um dos cupons atuais ou abra um chamado para Liderança para análise de caso<br><br><span class="span-aviso-bold">(PRAZO DE 2 DIAS ÚTEIS)</span>.</p>
      `;
      document.body.appendChild(divAviso);

      divAviso.querySelector('.btn-close-aviso').addEventListener('click', () => {
        divAviso.classList.remove('show');
        blurBackground.classList.remove('show');
      });
    }
    divAviso.classList.add('show');
  }

  // -------------------------------------------------------------------------
  // 8) Exibir cada cupom ativo no painel (timer)
  // -------------------------------------------------------------------------
  function exibirTimerCupom(planName, cupomObj) {
    const painel = criarPainelLateral();
    const timersContainer = painel.querySelector('.timers-container');
    if (!timersContainer) return;

    const divTimer = document.createElement('div');
    divTimer.className = 'div-timer-cupom';
    divTimer.setAttribute('data-plan-name', planName);
    divTimer.setAttribute('data-cupom-id', cupomObj.id);

    const btnClose = document.createElement('button');
    btnClose.className = 'btn-close-cupom';
    btnClose.textContent = 'x';
    btnClose.addEventListener('click', () => {
      excluirCupomManual(divTimer, planName, cupomObj);
    });
    divTimer.appendChild(btnClose);

    const btnDownload = document.createElement('button');
    btnDownload.className = 'btn-download-cupom';
    btnDownload.textContent = '📥';
    btnDownload.addEventListener('click', () => {
      downloadCupomPDF(planName, cupomObj);
    });
    divTimer.appendChild(btnDownload);

    const wrapper = document.createElement('div');
    wrapper.style.marginTop = '15px';
    wrapper.innerHTML = `
      <strong>Plano:</strong> ${planName}<br>
      <strong>Código:</strong> ${cupomObj.codigo}<br>
      Tempo Restante: <span class="timer-valor"></span>
    `;
    divTimer.appendChild(wrapper);

    timersContainer.prepend(divTimer);

    function atualizar() {
      const diff = cupomObj.expiraEm - Date.now();
      const spanTimer = divTimer.querySelector('.timer-valor');
      if (diff <= 0) {
        spanTimer.textContent = '00:00:00';
        clearInterval(divTimer._intervalId);
        removerCupomDeFato(divTimer, planName, cupomObj);
        return;
      }
      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      const hh = String(horas).padStart(2, '0');
      const mm = String(minutos).padStart(2, '0');
      const ss = String(segundos).padStart(2, '0');
      spanTimer.textContent = `${hh}:${mm}:${ss}`;
    }

    divTimer._intervalId = setInterval(atualizar, 1000);
    atualizar();
  }

  // -------------------------------------------------------------------------
  // 9) Excluir Cupom manual
  // -------------------------------------------------------------------------
  function excluirCupomManual(divTimer, planName, cupomObj) {
    clearInterval(divTimer._intervalId);
    let arr = cuponsData[planName];
    if (Array.isArray(arr)) {
      arr = arr.filter(c => c.id !== cupomObj.id);
      cuponsData[planName] = arr;
      salvarCuponsLocalStorage();
    }
    divTimer.innerHTML = `<div style="color:red; text-align:center; margin:10px;">Cupom Excluído</div>`;
    divTimer.style.transition = 'opacity 0.7s';
    setTimeout(() => {
      divTimer.style.opacity = '0';
    }, 100);
    setTimeout(() => {
      divTimer.remove();
    }, 1000);
  }

  // -------------------------------------------------------------------------
  // 10) Remover Cupom ao expirar
  // -------------------------------------------------------------------------
  function removerCupomDeFato(divTimer, planName, cupomObj) {
    let arr = cuponsData[planName];
    if (Array.isArray(arr)) {
      arr = arr.filter(c => c.id !== cupomObj.id);
      cuponsData[planName] = arr;
      salvarCuponsLocalStorage();
    }
    divTimer.innerHTML = `<div style="color:red; text-align:center; margin:10px;">Cupom Expirou</div>`;
    divTimer.style.transition = 'opacity 0.7s';
    setTimeout(() => {
      divTimer.style.opacity = '0';
    }, 100);
    setTimeout(() => {
      divTimer.remove();
    }, 1000);
  }

  // -------------------------------------------------------------------------
  // 11) Download PDF (jsPDF)
  // -------------------------------------------------------------------------
  function downloadCupomPDF(planName, cupomObj) {
    ensureJsPDFLoaded(() => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(12);

      const d = new Date(cupomObj.expiraEm);
      const dataExpira = d.toLocaleString();

      let y = 10;
      doc.text(`Plano: ${planName}`, 10, y);
      y += 8;
      doc.text(`Código: ${cupomObj.codigo}`, 10, y);
      y += 8;
      doc.text(`Desconto: ${cupomObj.desconto}%`, 10, y);
      y += 8;
      doc.text(`Cupom expira em: ${dataExpira}`, 10, y);

      doc.save(`Cupom_${cupomObj.codigo}.pdf`);
    });
  }

  function ensureJsPDFLoaded(callback) {
    if (window.jspdf && window.jspdf.jsPDF) {
      callback();
      return;
    }
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    scriptEl.onload = () => callback();
    scriptEl.onerror = () => alert('Falha ao carregar jsPDF!');
    document.head.appendChild(scriptEl);
  }

  // -------------------------------------------------------------------------
  // 12) Inicialização
  // -------------------------------------------------------------------------
  criarPainelLateral();
  carregarCuponsLocalStorage();

  console.log('Script de cupons carregado com sucesso.');
})();
