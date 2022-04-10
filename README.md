## **Escopo**

    - Criar matriz 100 x 100;

    - Adicionar 5 veículos aleatoriamente na matriz;

    - Iniciar pedido de transporte (seleciona ponto de origem e ponto de destino);

    - Notificar pedido de transporte para veículos disponíveis em um "raio" de 10 blocos;
### Fracasso 
    - Caso não encontre veículos disponíveis no raio inícial a busca é ampliada em 5 blocos até atingir os limites da matriz;

    - Caso a matriz tenha sido percorrida e nenhum veículo estiver disponível retornar mensagem de "tente novamente" e cancelar a solicitação;
### Sucesso
    - Para cada veículo disponível abrir notificação para aceitar ou recusar solicitação;

    - Após aceitar a solicitação o status do veículo muda para indisponível (somente um veículo pode aceitar uma solicitação);

    - O veículo deve se deslocar até o ponto de origem da solicitação e se deslocar até o ponto de destino;

    - Após chegar no destino o status do veículo deve voltar para disponível;