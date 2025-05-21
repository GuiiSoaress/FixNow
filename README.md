# FixNow: Sistema de Gerenciamento de Solicitações de Manutenção

## 📘 Projeto Integrador – 1º Termo | Graduação em Análise e Desenvolvimento de Sistemas

Este projeto foi desenvolvido como parte do Projeto Integrador do 1º termo do curso de Análise e Desenvolvimento de Sistemas. A proposta surgiu a partir de uma demanda real da indústria publicada no **SAGA SENAI de Inovação**, disponível neste link:

🔗 [Falhas no Processo de Solicitações: Como otimizar a Gestão de Manutenção e reparos na Empresa](https://plataforma.gpinovacao.senai.br/plataforma/demandas-da-industria/interna/11211)

---

## 🧩 Problemática

Atualmente, a empresa enfrenta falhas críticas no processo de solicitações de manutenção e reparos. Sem um sistema centralizado, as solicitações são feitas de forma informal — por e-mails, mensagens verbais ou WhatsApp — o que causa inúmeros problemas operacionais.

### Principais desafios:

- **Falta de rastreabilidade**: solicitações se perdem facilmente.
- **Comunicação ineficiente**: ausência de priorização e acompanhamento eficaz.
- **Tempo de resposta prolongado**: impacta negativamente a produtividade.
- **Falta de métricas e controle**: impossível medir desempenho ou identificar gargalos.
- **Risco de falhas de comunicação**: informações importantes podem ser ignoradas.

---

## ✅ Solução Esperada

Implementar uma **solução digital centralizada** que:

- Garanta **rastreabilidade** e acompanhamento das solicitações.
- Seja **ágil**, de **fácil adoção** e **disponível 24/7**.
- Elimine o uso de e-mails como canal principal.
- Respeite a **LGPD** e ofereça segurança dos dados.
- Possua **baixo custo de implementação e manutenção**.

---

## 💡 Solução Proposta: FixNow

O **FixNow** é um sistema web simples e funcional, que organiza e digitaliza o processo de solicitação de manutenção, visando melhorar a comunicação, rastreabilidade e eficiência.

### Funcionalidades:

- **Formulário de solicitação de reparo**
  - Tipo de solicitação (infraestrutura predial, mobiliário, T.I, etc.)
  - Localização do problema
  - Descrição detalhada
  - Prioridade (baixa, média, alta)

    ![Tela de solicitações](./assets/print-solicitacao.png)

    ![Sessão de Criar Solicitacão](./assets/print-criar.png)

- **Rastreamento de solicitações**
  - Número de protocolo único
  - Status em tempo real: "Em avaliação", "Em andamento", "Concluído"
 
  ![Sessão de detalhes da Solicitacão](./assets/print-detalhes.png)

- **Pagina de manutenção**
  - Pagina onde os funcionarios do departamento de manutenção podem selecionar as solicitações
  - Alteração do Status e profissional Responsavel

   ![Tela de Manutenção](./assets/print-manutencao.png)

  ![Tela de detalhes da Manutenção](./assets/print-detalhes-manutencao.png)
  
- **Exportação de dados**
  - Possibilidade de exportar as solicitações em formato **CSV** para análise externa
  
---

## 🤖 Integração com Tecnologia da Automação

O projeto prevê uma integração com sensores de **monitoramento de máquinas industriais**, coletando dados como **vibração** e **temperatura**, permitindo alertas de **manutenção preditiva**, antes que ocorram falhas graves.

---

## 🛠️ Tecnologias Utilizadas

- HTML, CSS, JavaScript e MySQL
- Python para Análise de Dados
- jQuery
- JSON para armazenamento simulado
- Integração com sensores de temperatura (DHT11) atráves da plataforma Arduino
- Integração com o banco de dados Utilizando o NODE-RED

---

## 🧪 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   https://github.com/GuiiSoaress/FixNow
2. Importe para o seu NODE-RED a versão mais recente do Back-End Na Pasta Back-End

3. Importe o banco de dados nas Pasta BancoDeDados/Atual(comDados)

4. Utilize os Logins ou crie uma conta: 
        admin@gmail.com
        Senha: admin

## ⚠️ Aviso

🚧 Este site ainda está em desenvolvimento. Algumas funcionalidades podem estar incompletas ou passar por alterações.


