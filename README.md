# User api
Projeto contendo uma API que disponibiliza usuários e seus salários juntamente com uma aplicação frontend que consome os dados. 

# Instalação

### Docker
Para rodar as duas aplicações basta ter o Docker e docker-compose instalado, ir na pasta raiz do projeto e rodar o comando:
<br>
`` docker-compose up``
<br>
O arquivo docker-compose.yml é o responsável por configurar os containeres da aplicação (frontend e backend), bem como rodar alguns comandos após a instalação destes, como rodar as migrations no django e o script `` populate_db`` que insere dados na base.
<br>

Ao término da instalação, é possível acessar o front através do link `` http://localhost:4200/`` e a api pelo link `` http://localhost:8000/.``

As vezes o docker-compose pode não encontrar o daemon do docker, então,  é necessário criar um grupo para ele. Siga os próximos passos:
<br>
`` sudo grupoadd docker``
<br>
`` sudo usermod -aG docker $USER``
<br>
`` newgrp docker``
<br>

Caso o erro continue, rode os seguintes comandos:
<br>
`` sudo chown "$USER":"$USER" /home/"$USER"/.docker -R``
<br>
``sudo chmod g+rwx "$HOME/.docker" -R``
<br>

### Manual

Para instalação manual do frontend é necessário instalar o nodejs, npm e angular cli. 
<br>
`` sudo apt-get install nodejs`` 
<br>
`` sudo apt-get install npm`` 
<br>
`` npm install -g @angular/cli`` 
<br>

Após o término da instalação, entre na pasta frontend e rode o seguinte comando para ligar o servidor:
<br>
`` ng serve`` 
<br>

Agora na pasta backend e com o pip instalado, siga os seguintes passos:
<br>
Crie um ambiente virtual python
<br>
`` python3 -m venv ./venv``
<br>
`` source venv/bin/activate``
<br>
`` pip install -r requirements.txt``
<br>

Os dois serviços estarão disponíveis nas mesmas portas descritas anteriormente.
<br>
<br>

Para acessar a documentação (swagger) da api acesse
<br>
``http://127.0.0.1:8000/docs/``

# Objetivos

O projeto de backend foi realizado utilizando DJango e Django REST framework. Ele consiste em uma api que disponibiliza usuários e salários, (CRUD) além de outras informações como média dos salários e descontos, maior e menor salário. O banco de dados utilizado foi o SQLite.

A aplicação de frontend foi escrita em Angular 12 e faz o acesso aos dados disponibilizados pela API. É composta por dois componentes que fazem o CRUD e acessam os outros endpoints da API. Os componentes da aplicação utilizam o componente ``p-table`` do PrimeNg.

<br>
<br>

# Próximas melhorias
A seguir uma lista de melhorias no projeto
- Utilizar outro banco de dados
- Criar uma tabela para descontos
- Melhorar os testes, principalmente em frontend
- Criar internacionalização no frontend (relativo também ao formato das datas)
- Melhorar a paginação entre front e back

