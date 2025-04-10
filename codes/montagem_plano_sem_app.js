
/**
 * Função principal: desenha/atualiza cada bloco de plano, cria/oculta
 * as áreas de desconto, o botão "Mostrar Desconto" e configura
 * o recálculo (desconto % e manual) com a mensagem final:
 * "Você ganhou XX% de desconto!".
 */
function atualizarValoresPlanos() {
    // Seleciona todos os blocos de plano
    const blocosPlanos = document.querySelectorAll(
      '.col-4.col-md-4.plan-container, .col-4.col-md-4.plan-container.highlight'
    );
  
    blocosPlanos.forEach((bloco) => {
      // 1) Captura o valor base (mensal) original e atual
      const elementoPrecoAtual = bloco.querySelector('span.plan-price');
      const elementoPrecoOriginal = bloco.querySelector('del[data-v-0fe40a14]');
      if (!elementoPrecoAtual || !elementoPrecoOriginal) return;
  
      const valorBaseMensalAtual = parseFloat(
        elementoPrecoAtual.textContent.replace(',', '.').trim()
      );
      const valorBaseMensalOriginal = parseFloat(
        elementoPrecoOriginal.textContent.replace('R$', '').replace(',', '.').trim()
      );
      if (isNaN(valorBaseMensalAtual) || isNaN(valorBaseMensalOriginal)) return;
  
      // 2) Cálculo do valor anual e economia (plano-base)
      const valorAnualOriginal = valorBaseMensalOriginal * 12;
      const valorAnualAtual = valorBaseMensalAtual * 12;
      const economiaBase = valorAnualOriginal - valorAnualAtual;
  
      // 3) Cria/Localiza o bloco .valores-anuais
      let divAnual = bloco.querySelector('.valores-anuais');
      if (!divAnual) {
        divAnual = document.createElement('div');
        divAnual.className = 'valores-anuais';
        divAnual.style.textAlign = 'center';
        divAnual.style.marginTop = '10px';
  
        const spanOrig = document.createElement('span');
        spanOrig.className = 'valor-anual-original';
        spanOrig.style.display = 'block';
        spanOrig.style.color = 'red';
        spanOrig.style.fontSize = '12px';
  
        const spanAtu = document.createElement('span');
        spanAtu.className = 'valor-anual-atual';
        spanAtu.style.display = 'block';
        spanAtu.style.color = 'green';
        spanAtu.style.fontSize = '12px';
  
        const spanEcon = document.createElement('span');
        spanEcon.className = 'valor-economia';
        spanEcon.style.display = 'block';
        spanEcon.style.color = 'green';
        spanEcon.style.fontSize = '12px';
  
        divAnual.appendChild(spanOrig);
        divAnual.appendChild(spanAtu);
        divAnual.appendChild(spanEcon);
  
        // Insere abaixo do título do plano (por ex. h3)
        const h3 = bloco.querySelector('h3');
        if (h3) {
          h3.insertAdjacentElement('afterend', divAnual);
        }
      }
  
      // Preenche esses spans
      const spanAnualOrig = divAnual.querySelector('.valor-anual-original');
      const spanAnualAtu = divAnual.querySelector('.valor-anual-atual');
      const spanEconomia = divAnual.querySelector('.valor-economia');
  
      spanAnualOrig.textContent = `Valor Original: R$ ${valorAnualOriginal
        .toFixed(2)
        .replace('.', ',')} ao Ano`;
      spanAnualAtu.textContent = `R$ ${valorAnualAtual.toFixed(2).replace('.', ',')} ao Ano`;
      spanEconomia.textContent = `Economia de R$ ${economiaBase.toFixed(2).replace('.', ',')}`;
  
      // 4) Criar/Localizar Botão "Mostrar Desconto"
      let btnToggle = bloco.querySelector('.btn-toggle-desconto');
      if (!btnToggle) {
        btnToggle = document.createElement('button');
        btnToggle.className = 'btn-toggle-desconto';
        btnToggle.textContent = 'Mostrar Desconto';
        btnToggle.style.display = 'none'; // ficará oculto até que o user pressione "["
        btnToggle.style.margin = '5px auto';
        btnToggle.style.fontSize = '12px';
  
        // Insere acima do .valores-anuais
        divAnual.insertAdjacentElement('beforebegin', btnToggle);
  
        // Evento de clique do Botão
        btnToggle.addEventListener('click', () => {
          const blocoDescontoCanto = bloco.querySelector('.bloco-desconto-canto');
          const blocoDescontoInfo = bloco.querySelector('.bloco-desconto-info');
          if (!blocoDescontoCanto || !blocoDescontoInfo) return;
  
          // Se estiver oculto, mostra o bloco de desconto principal.
          // O bloco de desconto CANTO permanece sempre oculto.
          const isHidden = blocoDescontoInfo.style.display === 'none';
          if (isHidden) {
            // blocoDescontoCanto.style.display = ''; // REMOVIDO => SEMPRE HIDDEN
            blocoDescontoInfo.style.display = '';
            btnToggle.textContent = 'Ocultar Desconto';
          } else {
            blocoDescontoCanto.style.display = 'none';
            blocoDescontoInfo.style.display = 'none';
            btnToggle.textContent = 'Mostrar Desconto';
          }
        });
      }
  
      // 5) Criar/Localizar bloco de desconto no canto superior direito (sempre hidden)
      let divDescontoCanto = bloco.querySelector('.bloco-desconto-canto');
      if (!divDescontoCanto) {
        divDescontoCanto = document.createElement('div');
        divDescontoCanto.className = 'bloco-desconto-canto';
        divDescontoCanto.style.position = 'absolute';
        divDescontoCanto.style.top = '10px';
        divDescontoCanto.style.right = '10px';
        divDescontoCanto.style.backgroundColor = '#f5f5f5';
        divDescontoCanto.style.padding = '5px';
        divDescontoCanto.style.border = '1px solid #ccc';
        divDescontoCanto.style.borderRadius = '4px';
        divDescontoCanto.style.display = 'none'; // forçado, sempre oculto
  
        // Rótulo + input p/ desconto %
        const labelDesc = document.createElement('label');
        labelDesc.textContent = '(%) ';
        labelDesc.style.fontSize = '9px';
  
        const inputDesc = document.createElement('input');
        inputDesc.type = 'number';
        inputDesc.className = 'input-desconto';
        inputDesc.style.width = '40px';
        inputDesc.style.marginLeft = '10px';
        inputDesc.style.fontSize = '9px';
  
        divDescontoCanto.appendChild(labelDesc);
        divDescontoCanto.appendChild(inputDesc);
  
        // Garante que o container do bloco seja position: relative
        bloco.style.position = 'relative';
        bloco.appendChild(divDescontoCanto);
      }
  
      // 6) Criar/Localizar bloco de desconto info (abaixo de .valores-anuais)
      let divDescontoBloco = divAnual.querySelector('.bloco-desconto-info');
      if (!divDescontoBloco) {
        divDescontoBloco = document.createElement('div');
        divDescontoBloco.className = 'bloco-desconto-info';
        divDescontoBloco.style.textAlign = 'center';
        divDescontoBloco.style.marginTop = '10px';
        divDescontoBloco.style.borderTop = '1px dashed #ccc';
        divDescontoBloco.style.paddingTop = '10px';
        divDescontoBloco.style.display = 'none'; // inicia oculto
  
        // Spans e botões
        const spanValorDesc = document.createElement('span');
        spanValorDesc.className = 'valor-plano-com-desconto';
        spanValorDesc.style.display = 'block';
        spanValorDesc.style.color = 'blue';
        spanValorDesc.style.fontSize = '12px';
        spanValorDesc.style.marginTop = '5px';
  
        const spanPercentDesc = document.createElement('span');
        spanPercentDesc.className = 'percentual-de-desconto';
        spanPercentDesc.style.display = 'block';
        spanPercentDesc.style.color = 'blue';
        spanPercentDesc.style.fontSize = '12px';
  
        const spanAnualDesc = document.createElement('span');
        spanAnualDesc.className = 'valor-anual-descontado';
        spanAnualDesc.style.display = 'block';
        spanAnualDesc.style.color = 'blue';
        spanAnualDesc.style.fontSize = '12px';
  
        const spanEconDesc = document.createElement('span');
        spanEconDesc.className = 'economia-desconto';
        spanEconDesc.style.display = 'block';
        spanEconDesc.style.color = 'blue';
        spanEconDesc.style.fontSize = '12px';
  
        // Linha final: "Você ganhou XX% de desconto!"
        const spanVoceGanhouDesc = document.createElement('span');
        spanVoceGanhouDesc.className = 'voce-ganhou-desconto';
        spanVoceGanhouDesc.style.display = 'block';
        spanVoceGanhouDesc.style.color = 'blue';
        spanVoceGanhouDesc.style.fontSize = '12px';
        spanVoceGanhouDesc.style.marginTop = '5px';
  
        const btnEditarDesc = document.createElement('button');
        btnEditarDesc.className = 'btn-editar-desconto';
        btnEditarDesc.textContent = 'Editar valor c/ desconto';
        btnEditarDesc.style.display = 'block';
        btnEditarDesc.style.margin = '10px auto';
        btnEditarDesc.style.fontSize = '12px';
  
        // Div do Cupom
        const divCupom = document.createElement('div');
        divCupom.className = 'div-cupom';
        divCupom.style.display = 'none';
        divCupom.style.marginTop = '5px';
  
        const labelCupom = document.createElement('label');
        labelCupom.textContent = 'Código do Cupom: ';
        labelCupom.style.fontSize = '12px';
  
        const inputCupom = document.createElement('input');
        inputCupom.type = 'text';
        inputCupom.className = 'input-cupom';
        inputCupom.style.marginLeft = '5px';
        inputCupom.style.fontSize = '12px';
  
        // Botão "Aplicar" - oculto por padrão
        const btnAplicarCupom = document.createElement('button');
        btnAplicarCupom.textContent = 'Aplicar';
        btnAplicarCupom.style.marginLeft = '5px';
        btnAplicarCupom.style.fontSize = '12px';
        btnAplicarCupom.style.display = 'none'; // oculto
  
        const spanErroCupom = document.createElement('span');
        spanErroCupom.className = 'erro-cupom';
        spanErroCupom.style.color = 'red';
        spanErroCupom.style.fontSize = '12px';
        spanErroCupom.style.marginLeft = '10px';
  
        divCupom.appendChild(labelCupom);
        divCupom.appendChild(inputCupom);
        divCupom.appendChild(btnAplicarCupom);
        divCupom.appendChild(spanErroCupom);
  
        // Div de edição manual - oculta por padrão
        const divEdicaoDesconto = document.createElement('div');
        divEdicaoDesconto.className = 'div-edicao-desconto';
        divEdicaoDesconto.style.display = 'none';
        divEdicaoDesconto.style.marginTop = '5px';
  
        const labelValDesc = document.createElement('label');
        labelValDesc.textContent = 'Valor c/ desconto (editável): ';
        labelValDesc.style.fontSize = '12px';
  
        // Input para valor editável – também oculto
        const inputValDesc = document.createElement('input');
        inputValDesc.type = 'number';
        inputValDesc.className = 'input-valor-desconto-editavel';
        inputValDesc.style.marginLeft = '5px';
        inputValDesc.style.fontSize = '12px';
        inputValDesc.style.display = 'none'; // oculto por padrão
  
        divEdicaoDesconto.appendChild(labelValDesc);
        divEdicaoDesconto.appendChild(inputValDesc);
  
        // Monta a hierarquia
        divDescontoBloco.appendChild(spanValorDesc);
        divDescontoBloco.appendChild(spanPercentDesc);
        divDescontoBloco.appendChild(spanAnualDesc);
        divDescontoBloco.appendChild(spanEconDesc);
        divDescontoBloco.appendChild(spanVoceGanhouDesc);
        divDescontoBloco.appendChild(btnEditarDesc);
        divDescontoBloco.appendChild(divCupom);
        divDescontoBloco.appendChild(divEdicaoDesconto);
  
        divAnual.appendChild(divDescontoBloco);
      }
  
      // -------------------------------------------------------
      //  Configurar eventos e recalcular, se necessário
      // -------------------------------------------------------
      const inputDesconto = bloco.querySelector('.bloco-desconto-canto .input-desconto');
      const btnEditarDesc = divDescontoBloco.querySelector('.btn-editar-desconto');
      const divCupom = divDescontoBloco.querySelector('.div-cupom');
      const inputCupom = divCupom.querySelector('.input-cupom');
      const btnAplicarCupom = divCupom.querySelector('button');
      const spanErroCupom = divCupom.querySelector('.erro-cupom');
      const divEdicaoDesc = divDescontoBloco.querySelector('.div-edicao-desconto');
      const inputValorDescEditavel = divEdicaoDesc.querySelector('.input-valor-desconto-editavel');
  
      // Ao digitar no input de desconto %, recalcula
      inputDesconto.oninput = function () {
        recalcularDescontoPorcentagem(bloco);
      };
  
      // Botão "Editar valor c/ desconto" -> exibe a div do Cupom
      btnEditarDesc.onclick = function () {
        divCupom.style.display = 'block';
        spanErroCupom.textContent = '';
        inputCupom.value = '';
      };
  
      // Aplicar Cupom
      btnAplicarCupom.onclick = function () {
        const cupom = inputCupom.value.trim().toLowerCase();
        if (!cupom.includes('c')) {
          spanErroCupom.textContent = 'cupom inválido';
          divEdicaoDesc.style.display = 'none';
          return;
        }
        spanErroCupom.textContent = '';
        divEdicaoDesc.style.display = 'block';
      };
  
      // Valor manual => recalcula ao alterar
      inputValorDescEditavel.oninput = function () {
        recalcularDescontoManual(bloco);
      };
  
      // Se já tiver alguma % ou valor manual, recalcula
      const valDesc = parseFloat(inputDesconto.value);
      if (!isNaN(valDesc) && valDesc > 0) {
        recalcularDescontoPorcentagem(bloco);
      }
      const valDescManual = parseFloat(inputValorDescEditavel.value);
      if (!isNaN(valDescManual) && valDescManual > 0) {
        recalcularDescontoManual(bloco);
      }
    });
  }
  
  // (1) Desconto em %, ignorando TEF/Fidel/Auto/Smart TEF/API/TAP
  function recalcularDescontoPorcentagem(bloco) {
    const elementoPrecoOriginal = bloco.querySelector('del[data-v-0fe40a14]');
    if (!elementoPrecoOriginal) return;
  
    const valorBaseMensalOriginal = parseFloat(
      elementoPrecoOriginal.textContent.replace('R$', '').replace(',', '.').trim()
    );
    if (isNaN(valorBaseMensalOriginal)) return;
  
    const inputDesconto = bloco.querySelector('.bloco-desconto-canto .input-desconto');
    if (!inputDesconto) return;
    const descontoPercent = parseFloat(inputDesconto.value);
  
    const divDescontoBloco = bloco.querySelector('.bloco-desconto-info');
    if (!divDescontoBloco) return;
  
    if (isNaN(descontoPercent) || descontoPercent < 0) {
      divDescontoBloco.querySelector('.valor-plano-com-desconto').textContent = '';
      divDescontoBloco.querySelector('.percentual-de-desconto').textContent = '';
      divDescontoBloco.querySelector('.valor-anual-descontado').textContent = '';
      divDescontoBloco.querySelector('.economia-desconto').textContent = '';
      divDescontoBloco.querySelector('.voce-ganhou-desconto').textContent = '';
      return;
    }
  
    const spanValorDesc = divDescontoBloco.querySelector('.valor-plano-com-desconto');
    const spanPercentDesc = divDescontoBloco.querySelector('.percentual-de-desconto');
    const spanAnualDesc = divDescontoBloco.querySelector('.valor-anual-descontado');
    const spanEconDesc = divDescontoBloco.querySelector('.economia-desconto');
    const spanVoceGanhouDesc = divDescontoBloco.querySelector('.voce-ganhou-desconto');
  
    // Soma módulos sem desconto
    const somaMensalSemDesc = somaModulosSemDesconto(bloco);
  
    // Exemplo: baseDescontavel = valorBaseMensalOriginal - somaMensalSemDesc
    const planoDescontavel = valorBaseMensalOriginal - somaMensalSemDesc;
    const planoComDesconto = planoDescontavel * (1 - descontoPercent / 100);
    const valorMensalFinal = planoComDesconto + somaMensalSemDesc;
  
    const valorAnualFinal = valorMensalFinal * 12;
    const valorAnualSemCupom = valorBaseMensalOriginal * 12;
    const economiaDesconto = valorAnualSemCupom - valorAnualFinal;
  
    spanValorDesc.textContent = `Valor plano com Desconto: R$ ${valorMensalFinal
      .toFixed(2)
      .replace('.', ',')}`;
    spanAnualDesc.textContent = `R$ ${valorAnualFinal.toFixed(2).replace('.', ',')} ao Ano`;
    spanEconDesc.textContent = `Economia de R$ ${economiaDesconto.toFixed(2).replace('.', ',')}`;
    spanVoceGanhouDesc.textContent = `Você ganhou ${descontoPercent}% de desconto!`;
  }
  
  // (2) Desconto Manual (campo "Valor c/ desconto (editável)")
  function recalcularDescontoManual(bloco) {
    const elementoPrecoOriginal = bloco.querySelector('del[data-v-0fe40a14]');
    if (!elementoPrecoOriginal) return;
  
    const valorBaseMensalOriginal = parseFloat(
      elementoPrecoOriginal.textContent.replace('R$', '').replace(',', '.').trim()
    );
    if (isNaN(valorBaseMensalOriginal)) return;
  
    const divDescontoBloco = bloco.querySelector('.bloco-desconto-info');
    if (!divDescontoBloco) return;
  
    const inputValorDesc = divDescontoBloco.querySelector('.input-valor-desconto-editavel');
    const valDescMensal = parseFloat(inputValorDesc.value);
    if (isNaN(valDescMensal) || valDescMensal < 0) return;
  
    const spanValorDesc = divDescontoBloco.querySelector('.valor-plano-com-desconto');
    const spanPercentDesc = divDescontoBloco.querySelector('.percentual-de-desconto');
    const spanAnualDesc = divDescontoBloco.querySelector('.valor-anual-descontado');
    const spanEconDesc = divDescontoBloco.querySelector('.economia-desconto');
    const spanVoceGanhouDesc = divDescontoBloco.querySelector('.voce-ganhou-desconto');
  
    // Soma módulos sem desconto
    const somaMensalSemDesc = somaModulosSemDesconto(bloco);
  
    const baseDescontavel = valorBaseMensalOriginal - somaMensalSemDesc;
    const portionPlano = valDescMensal - somaMensalSemDesc;
    const descontoReais = baseDescontavel - portionPlano;
  
    let porcDescontoManual = 0;
    if (baseDescontavel !== 0) {
      porcDescontoManual = (descontoReais / baseDescontavel) * 100;
    }
  
    const valDescAnual = valDescMensal * 12;
    const valAnualSemCupom = valorBaseMensalOriginal * 12;
    const economiaDesc = valAnualSemCupom - valDescAnual;
  
    spanValorDesc.textContent = `Valor plano com Desconto: R$ ${valDescMensal
      .toFixed(2)
      .replace('.', ',')}`;
    spanPercentDesc.textContent = `Valor editado via cupom`;
    spanAnualDesc.textContent = `R$ ${valDescAnual.toFixed(2).replace('.', ',')} ao Ano`;
    spanEconDesc.textContent = `Economia de R$ ${economiaDesc.toFixed(2).replace('.', ',')}`;
  
    const porcFormat = porcDescontoManual.toFixed(2).replace('.', ',');
    spanVoceGanhouDesc.textContent = `Você ganhou ${porcFormat}% de desconto!`;
  }
  
  /**
   * Função para somar os módulos que NÃO têm desconto. Retorna o valor
   * MENSAL desses módulos.
   */
  function somaModulosSemDesconto(bloco) {
    let somaMensal = 0;
  
    // 1) Somar módulos dentro do bloco
    const lis = bloco.querySelectorAll('li');
    lis.forEach((li) => {
      const p = li.querySelector('p');
      const inputQtd = li.querySelector('input.module_amount');
      if (!p || !inputQtd) return;
  
      const qtd = parseInt(inputQtd.value, 10) || 0;
      const texto = p.innerText.toLowerCase();
  
      // TEF (o antigo TEF de 99,90)
      if (texto.includes('tef') && !texto.includes('smart tef')) {
        somaMensal += qtd * 99.9;
      }
      // Smart TEF (49,90)
      if (texto.includes('smart tef')) {
        somaMensal += qtd * 49.9;
      }
      // Autoatendimento (299,90)
      if (texto.includes('terminais autoatendimento')) {
        somaMensal += qtd * 299.9;
      }
    });
  
    // Fidelidade dentro do bloco
    const checkFidelDentroDoCard = bloco.querySelector('[id*="Fidelidade"]:checked');
    if (checkFidelDentroDoCard) {
      somaMensal += 299.9;
    }
  
    // 2) Módulos fora do bloco (row apps)
    const rowApps = document.querySelector('.row.applications');
    if (rowApps) {
      // Integração API (#chk_app80) => 199,90
      const chkApp80 = rowApps.querySelector('#chk_app80:checked');
      if (chkApp80) {
        somaMensal += 199.9;
      }
      // Integração TAP (#chk_app79) => 249,90
      const chkApp79 = rowApps.querySelector('#chk_app79:checked');
      if (chkApp79) {
        somaMensal += 249.9;
      }
  
      // Smart TEF nessa seção
      const smartTefApp = rowApps.querySelectorAll('.application-item');
      smartTefApp.forEach((app) => {
        const titulo = app.querySelector('h4');
        if (!titulo) return;
        if (titulo.innerText.toLowerCase().includes('smart tef')) {
          const inputQtd = app.querySelector('input.module_amount');
          if (inputQtd) {
            const qtd = parseInt(inputQtd.value, 10) || 0;
            somaMensal += qtd * 49.9;
          }
        }
      });
  
      // Programa Fidelidade (chk_app82) => 299.9
      const chkFidel = rowApps.querySelector('#chk_app82:checked');
      if (chkFidel) {
        somaMensal += 299.9;
      }
    }
  
    return somaMensal;
  }
  
  // --------------------------------------------
  // 1) Executa ao carregar a página
  // --------------------------------------------
  atualizarValoresPlanos();
  
  // --------------------------------------------
  // 2) A cada 5 segundos, atualiza novamente
  // --------------------------------------------
  setInterval(() => {
    atualizarValoresPlanos();
  }, 5000);
  
  // --------------------------------------------
  // 3) Evento de Teclado: se o user digitar "[",
  //    revelamos o botão "Mostrar Desconto"
  // --------------------------------------------
  document.addEventListener('keydown', (event) => {
    if (event.key === '[') {
      // Exibir todos os .btn-toggle-desconto em todos os blocos
      const allButtons = document.querySelectorAll('.btn-toggle-desconto');
      allButtons.forEach((btn) => {
        btn.style.display = 'block'; // mostra o botão
      });
    }
  });
  
  // --------------------------------------------
  // 4) Evento de Teclado: se o user digitar "]",
  //    afeta somente blocos cujo <input class="check-plan"> estiver marcado
  //    - Se já existe valor manual -> limpa
  //    - Se não, pede valor via prompt
  // --------------------------------------------
  document.addEventListener('keydown', (event) => {
    if (event.key === ']') {
      // 1) Localizar os blocos que tenham .check-plan:checked
      const allBlocks = document.querySelectorAll('.col-4.col-md-4.plan-container, .col-4.col-md-4.plan-container.highlight');
      const blocosSelecionados = [];
      allBlocks.forEach((bloco) => {
        const marcado = bloco.querySelector('.check-plan:checked');
        if (marcado) {
          blocosSelecionados.push(bloco);
        }
      });
  
      // Se nenhum bloco estiver marcado, alert e sai
      if (blocosSelecionados.length === 0) {
        alert('Nenhum plano personalizado está selecionado!');
        return;
      }
  
      // 2) Verifica se algum bloco marcado já tem valor manual
      let algumPreenchido = false;
      blocosSelecionados.forEach((bloco) => {
        const inpValEdit = bloco.querySelector('.input-valor-desconto-editavel');
        if (inpValEdit && inpValEdit.value.trim() !== '') {
          algumPreenchido = true;
        }
      });
  
      // 3) Se algum já estiver preenchido, limpamos todos
      if (algumPreenchido) {
        blocosSelecionados.forEach((bloco) => {
          const inpValEdit = bloco.querySelector('.input-valor-desconto-editavel');
          if (!inpValEdit) return;
          if (inpValEdit.value.trim() !== '') {
            // Limpa
            inpValEdit.value = '';
            // Limpa spans
            const divDesc = bloco.querySelector('.bloco-desconto-info');
            if (divDesc) {
              divDesc.querySelector('.valor-plano-com-desconto').textContent = '';
              divDesc.querySelector('.percentual-de-desconto').textContent = '';
              divDesc.querySelector('.valor-anual-descontado').textContent = '';
              divDesc.querySelector('.economia-desconto').textContent = '';
              divDesc.querySelector('.voce-ganhou-desconto').textContent = '';
            }
          }
        });
        return; // fim
      }
  
      // 4) Se nenhum tinha valor, pedimos via prompt
      const valorManual = prompt('Digite o valor manual (mensal) do plano com desconto:');
      if (valorManual !== null && valorManual.trim() !== '') {
        blocosSelecionados.forEach((bloco) => {
          const inpValEdit = bloco.querySelector('.input-valor-desconto-editavel');
          if (!inpValEdit) return;
          inpValEdit.value = valorManual.trim();
  
          // Exibe a div do desconto
          const divDesc = bloco.querySelector('.bloco-desconto-info');
          if (divDesc) {
            divDesc.style.display = '';
          }
  
          // Recalcula
          recalcularDescontoManual(bloco);
        });
      }
    }
  });
  
  // --------------------------------------------
  // CSS extra: Fundo moderno e efeito de hover
  // --------------------------------------------
  (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    const css = `
      .bloco-desconto-info {
        background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
      }
      .bloco-desconto-info:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
      }
    `;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  })();
  
  // --------------------------------------------
  // 5) Após 3s, oculta tudo que tenha R$ e
  //    as obs de application-item-obs
  //    exceto dentro de .valores-anuais e .bloco-desconto-info
  // --------------------------------------------
  setTimeout(() => {
    // Oculta apenas se estiver fora dos blocos de desconto
    document.querySelectorAll('p, span').forEach((el) => {
      if (el.closest('.valores-anuais') || el.closest('.bloco-desconto-info')) {
        return; // não oculta se estiver dentro de .valores-anuais ou .bloco-desconto-info
      }
      if (el.textContent.match(/R\$\s*\d/)) {
        el.style.display = 'none';
      }
    });
  
    // Oculta elementos com a classe "application-item-obs"
    document.querySelectorAll('.application-item-obs').forEach((el) => {
      el.style.display = 'none';
    });
  }, 3000);
  
  