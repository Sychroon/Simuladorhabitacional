RELATÓRIO TÉCNICO DE IMPLEMENTAÇÃO: SISTEMA FRONT-END WEB
Disciplina: Front-End Web
 Docente: H. Burratto
 Discente: J. Victor Lima de Araujo

1. INTRODUÇÃO E ESCOPO
Este relatório documenta o desenvolvimento do Projeto Final da disciplina de Front-End Web.
O artefato produzido visa demonstrar domínio técnico em:
Estruturação semântica


Estilização responsiva


Programação funcional de interfaces


O projeto cumpre integralmente as normas de entrega e os critérios de avaliação estabelecidos.

2. PROTOCOLO METODOLÓGICO DE ENTREGA
A submissão do projeto fundamenta-se na transparência e acessibilidade do código:
Versionamento Distribuído: Hospedagem integral do código-fonte em repositório GitHub.


Ambiente de Produção: Publicação do sistema via GitHub Pages, garantindo funcionalidade imediata via navegador.


Repositório de Backup: Disponibilização de arquivo comprimido (.zip) via Google Drive.



3. ARQUITETURA TÉCNICA E REQUISITOS
A construção do software seguiu padrões estruturados de desenvolvimento:
Estrutura Semântica (HTML5): Utilização de tags estruturais adequadas e indentação organizada, visando otimização e acessibilidade.


Estilização e Responsividade (CSS3): Implementação de design adaptável para múltiplos dispositivos, com foco em hierarquia visual e tipografia.


Interatividade (JavaScript): Manipulação dinâmica do DOM e tratamento de eventos para garantir experiência de usuário funcional.


Organização de Diretórios: Separação de arquivos em pastas específicas para CSS, JavaScript e recursos estáticos.



4. DOCUMENTAÇÃO TÉCNICA (README.md)
4.1 Descrição do Sistema (Mini-Mundo)
O projeto consiste em um Simulador Financeiro de Financiamento Imobiliário, com foco nas linhas de crédito da Caixa Econômica Federal, incluindo o programa Minha Casa Minha Vida.
A aplicação permite que o usuário insira seus dados financeiros e obtenha uma simulação detalhada do financiamento, apresentando:
Taxa de juros aplicada


Valor estimado da parcela mensal


Valor correspondente aos seguros obrigatórios


Condições aproximadas de prazo


O sistema tem como objetivo reduzir a incerteza do processo de financiamento, oferecendo uma estimativa clara e imediata, poupando tempo e auxiliando pessoas que desejam planejar a aquisição da própria casa.
A proposta do projeto é transformar regras financeiras complexas em uma interface simples, acessível e responsiva, permitindo ao usuário compreender de forma prática quanto pagará e em quais condições poderá financiar seu imóvel.


4.2 Tecnologias e Funcionalidades
Tecnologias utilizadas:
HTML5


CSS3


JavaScript


Funcionalidades implementadas:
Validação de Formulários – Verifica campos obrigatórios, impede valores inválidos e fornece feedback visual imediato para correção de erros.
Feedback de Erros – Informa automaticamente que a campos com informações incorretas ou fora dos padrões permitidos.
Cálculo de Taxas – Calcula automaticamente a taxa de juros com base na renda informada pelo usuário.
Cálculo de Seguro – Estima o valor do seguro habitacional considerando idade e condições do financiamento.
Delimitação de Valores – Restringe automaticamente valores mínimos e máximos permitidos conforme as regras do financiamento.
Cálculo de Prazo – Define o prazo máximo de financiamento com base na idade e nos limites estabelecidos.


4.3 Procedimentos de Execução Local
Clonar o repositório ou descompactar o arquivo .zip.


Acessar a raiz do projeto.


Executar o arquivo index.html.


O sistema não requer dependências externas para funcionamento básico


Preencher os campos à esquerda após a execução


.Clicar em “calcular Financiamento” para exibir os valores 



4.4 Autoria e Licença
Projeto desenvolvido por João Victor Lima de Araújo , sob licença acadêmica para a disciplina de Front-End Web.
