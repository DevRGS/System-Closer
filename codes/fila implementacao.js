function generateMockData() {
    const mockNames = ['Ana Silva', 'Carlos Oliveira', 'Mariana Costa', 'Pedro Santos', 'Juliana Pereira', 'Fernando Almeida', 'Camila Ribeiro', 'Lucas Carvalho', 'Patrícia Gomes', 'Ricardo Souza'];
    const mockSegments = ['Food', 'Varejo'];
    const implementers = ['Equipe A', 'Equipe B', 'Equipe C', 'Equipe D'];
    
    return Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      name: mockNames[Math.floor(Math.random() * mockNames.length)],
      segment: mockSegments[Math.floor(Math.random() * mockSegments.length)],
      implementer: implementers[Math.floor(Math.random() * implementers.length)],
      priority: 'Média'
    }));
  }
  
  class ClientList {
    constructor() {
      this.clients = generateMockData();
      this.currentPage = 1;
      this.itemsPerPage = 7;
      this.container = null;
      this.createToggleButton();
      this.init();
    }
  
    createToggleButton() {
      const targetButton = document.querySelector('a#footer-request-callme');
      if (!targetButton) return;
  
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = 'Fila de Implementação';
      toggleBtn.style.cssText = `
        display: block;
        width: 100%;
        margin-bottom: 10px;
        font-style: bold;
        padding: 12px;
        background: #2196F3;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: opacity 0.3s;
        font-size: 14px;
      `;
  
      toggleBtn.addEventListener('click', () => {
        this.container.style.display = 'block';
      });
  
      // Insere o botão antes do botão de suporte
      targetButton.parentNode.insertBefore(toggleBtn, targetButton);
    }
  
    init() {
      this.createUI();
      this.renderTable();
    }
  
    createUI() {
      this.container = document.createElement('div');
      this.container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
        max-width: 90%;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 9999;
        display: none;
      `;
  
      this.container.innerHTML = `
        <style>
          .client-list { font-family: 'Arial', sans-serif; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
          .close-btn { cursor: pointer; font-size: 24px; color: #666; line-height: 1; }
          .close-btn:hover { color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; color: #333; }
          input, select { padding: 6px; border: 1px solid #ddd; border-radius: 4px; width: 100%; box-sizing: border-box; }
          button { padding: 6px 12px; font-size: 14px; }
          .add-client { margin-bottom: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .pagination { margin-top: 15px; }
        </style>
  
        <div class="client-list">
          <div class="header">
            <h2 style="margin: 0; font-size: 1.3rem;">Gerenciamento de Clientes</h2>
            <div class="close-btn">×</div>
          </div>
          
          <div class="add-client">
            <input type="text" id="clientName" placeholder="Nome do Cliente">
            <select id="clientSegment">
              <option value="Food">Food</option>
              <option value="Varejo">Varejo</option>
            </select>
            <button id="addClient" style="grid-column: span 2;">Adicionar Cliente</button>
          </div>
  
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Segmento</th>
                  <th>Implementador</th>
                  <th>Prioridade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="clientTableBody"></tbody>
            </table>
          </div>
  
          <div class="pagination">
            <button id="prevPage">Anterior</button>
            <span id="currentPage">Página 1</span>
            <button id="nextPage">Próxima</button>
          </div>
        </div>
      `;
  
      document.body.appendChild(this.container);
      
      // Event listeners
      this.container.querySelector('.close-btn').addEventListener('click', () => {
        this.container.style.display = 'none';
      });
      
      document.getElementById('addClient').addEventListener('click', () => this.addClient());
      document.getElementById('prevPage').addEventListener('click', () => this.changePage(-1));
      document.getElementById('nextPage').addEventListener('click', () => this.changePage(1));
    }
  
    // Restante dos métodos permanecem inalterados
    getSortedClients() {
      return [...this.clients].sort((a, b) => {
        const priorityOrder = { 'Urgente': 1, 'Média': 2, 'Pequena': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  
    renderTable() {
      const sortedClients = this.getSortedClients();
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const currentClients = sortedClients.slice(start, end);
  
      const tbody = document.getElementById('clientTableBody');
      tbody.innerHTML = '';
  
      currentClients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.segment}</td>
          <td>${client.implementer}</td>
          <td>
            <select class="prioritySelect">
              <option value="Pequena" ${client.priority === 'Pequena' ? 'selected' : ''}>Pequena</option>
              <option value="Média" ${client.priority === 'Média' ? 'selected' : ''}>Média</option>
              <option value="Urgente" ${client.priority === 'Urgente' ? 'selected' : ''}>Urgente</option>
            </select>
          </td>
          <td><button class="deleteBtn" style="background: #f44336; color: white;">Excluir</button></td>
        `;
  
        row.querySelector('.prioritySelect').addEventListener('change', (e) => {
          this.updatePriority(client.id, e.target.value);
        });
  
        row.querySelector('.deleteBtn').addEventListener('click', () => {
          this.deleteClient(client.id);
        });
  
        tbody.appendChild(row);
      });
  
      document.getElementById('currentPage').textContent = `Página ${this.currentPage}`;
      document.getElementById('prevPage').disabled = this.currentPage === 1;
      document.getElementById('nextPage').disabled = end >= this.clients.length;
    }
  
    addClient() {
      const nameInput = document.getElementById('clientName');
      const segmentSelect = document.getElementById('clientSegment');
      
      if (nameInput.value.trim()) {
        this.clients.push({
          id: Date.now(),
          name: nameInput.value.trim(),
          segment: segmentSelect.value,
          implementer: ['Equipe A', 'Equipe B', 'Equipe C', 'Equipe D'][Math.floor(Math.random() * 4)],
          priority: 'Média'
        });
        
        nameInput.value = '';
        this.renderTable();
      }
    }
  
    updatePriority(id, newPriority) {
      this.clients = this.clients.map(client => 
        client.id === id ? {...client, priority: newPriority} : client
      );
      this.renderTable();
    }
  
    deleteClient(id) {
      this.clients = this.clients.filter(client => client.id !== id);
      this.renderTable();
    }
  
    changePage(direction) {
      this.currentPage += direction;
      this.renderTable();
    }
  }
  
  // Inicializar
  new ClientList();