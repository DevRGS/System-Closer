(function(){
    // 1) Validador de CNPJ
    function isValidCNPJ(cnpj) {
      cnpj = cnpj.replace(/\D/g, '');
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
      let t = cnpj.slice(0, 12), d = cnpj.slice(12);
      for (let i = 0; i < 2; i++) {
        let sum = 0, pos = (i === 0 ? 5 : 6);
        for (let j = 0; j < t.length; j++) {
          sum += +t[j] * pos--;
          if (pos < 2) pos = 9;
        }
        let calc = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
        if (calc !== +d[i]) return false;
        t += d[i];
      }
      return true;
    }
  
    // 2) Cria o input-group + botão se ainda não existir
    var $cnpj = $('#cnpj');
    if (!$cnpj.parent().hasClass('input-group')) {
      $cnpj.wrap('<div class="input-group"></div>');
      $('<span class="input-group-btn">'+
          '<button class="btn btn-default" type="button" id="btn-consultar-cnpj">'+
            '<i class="glyphicon glyphicon-search"></i> Buscar'+
          '</button>'+
        '</span>').insertAfter($cnpj);
    }
  
    // 3) Amarra o clique para executar a consulta
    $('#btn-consultar-cnpj').off('click').on('click', function() {
      let raw = $cnpj.val() || '';
      let cnpj = raw.replace(/\D/g, '');
      if (!isValidCNPJ(cnpj)) {
        alert('CNPJ Inválido');
        return;
      }
      $.getJSON('https://www.receitaws.com.br/v1/cnpj/'+cnpj+'?callback=?')
        .done(function(data) {
          if (data.status !== 'OK') {
            alert('CNPJ Inválido');
            return;
          }
          // preenche seus campos
          $('#razao_social').val(data.nome);
          $('#nome_fantasia').val(data.fantasia);
          $('#zip_code').val(data.cep.replace(/\D/g, ''));
          $('#city').val(data.municipio + '/' + data.uf);
          $('#street').val(data.logradouro);
          $('#number').val(data.numero);
          $('#complement').val(data.complemento);
          $('#district').val(data.bairro);
        })
        .fail(function() {
          alert('Erro ao consultar a Receita. Tente mais tarde.');
        });
    });
  
    console.log('Botão "Buscar" criado e pronto para uso ao lado do campo #cnpj.');
  })();
  