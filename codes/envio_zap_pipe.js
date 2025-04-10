(() => {
    // 1. Pega todas as linhas do “grid” (cada linha tem role="row" e type="body")
    const rows = document.querySelectorAll('div[role="row"][type="body"]');
  
    rows.forEach(row => {
      // 2. Localiza o link do contato (href começa com /person/)
      const contactLink = row.querySelector('a[href^="/person/"]');
      // 3. Localiza o link do telefone (href começa com callto:)
      const phoneLink = row.querySelector('a[href^="callto:"]');
  
      // Se não achou, pula
      if (!contactLink || !phoneLink) return;
  
      // 4. Extrai nome e telefone
      const fullName = contactLink.textContent.trim();
      const onlyDigitsPhone = phoneLink.textContent.replace(/\D+/g, ''); 
      const firstName = fullName.split(' ')[0];
  
      // 5. Monta a URL do WhatsApp
      const waURL = `https://api.whatsapp.com/send?phone=${onlyDigitsPhone}&text=Boa%20tarde,%20${firstName}`;
  
      // 6. Cria uma nova “coluna” (ou bloco) para inserir ao final da linha
      const newCell = document.createElement('div');
      // Se quiser manter alguma padronização visual, você pode inserir classes ou estilos:
      // newCell.classList.add('suaClasseFixa');
      // ou dar algum estilo inline:
      // newCell.style.padding = '8px';
  
      // 7. Cria o link dentro dessa coluna
      const link = document.createElement('a');
      link.href = waURL;
      link.target = '_blank';  // abre em nova aba
      link.textContent = 'Enviar WhatsApp';
  
      newCell.appendChild(link);
  
      // 8. Insere ao final da linha (à direita da última coluna existente)
      row.appendChild(newCell);
    });
  })();
  