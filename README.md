# Projeto Informação salário servidores federais
Trabalho da disciplina de Técnica de Programação

Integrantes do grupo:
* Cleber Schroeder Fonseca
* Pablo Werlang

Para o desenvolvimento do prototipo foi utilizado o python na versão 3.6.5.

Para rodar a aplicação deve-se executar a sequencia de comandos que será listada aseguir.

- Para instalar os pacotes que serão utilizados pela aplicação.
```python
pip install -r requirements.txt
```

- Para a aplicação realizar a coleta dos arquivos estáticos do django.

```python
python manage.py collectstatic
```

- Depois é só rodar a aplicação que estará funcionando.

```python
python manage.py runserver ip:porta
```
As informações de ip e porta são opcionais por padrão vira com o ip 127.0.0.1 e a porta 8000.

Os dados que estão contidos na aplicação são só uma amostra devido aos documentos serem muito grandes.
Os dados foram retirados do seguinte endereço: http://www.portaltransparencia.gov.br/downloads/servidores.asp

Dos dados que estão diponibilizados foram utilizados os arquivos "Cadastro.CSV" e "Remuneracao.csv", quando os arquivos são 
baixados do site eles vem com a data de referência no início do nome dos arquivos, para facilitar a atualização dos 
dados basta remover essa data e deixar os arquivo como foram citados acima.

