#!/bin/bash

# Etapa 1: Git clone do repositório
git clone https://github.com/TragodieDesign/NAD.git

# Etapa 2: Entra no diretório /NAD/backend-nad
cd NAD/backend-nad

# Etapa 3: Executa npm install no backend
npm install

# Etapa 4: Instalação global do pm2
npm install -g pm2

# Etapa 5: Retorna ao diretório /NAD
cd ..

# Etapa 6: Entra no diretório /NAD/frontend-nad
cd frontend-nad

# Etapa 7: Executa npm install no frontend
npm install
