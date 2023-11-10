#!/bin/bash

# Recebe o nome de usuário do Node.js
username=$1

# Use o comando "sudo" com a opção -S para receber a senha do Node.js
if sudo -S -u "$username" id &>/dev/null; then
    # Autenticação bem-sucedida
    echo "Autenticado com sucesso como $username"
    exit 0
else
    # Falha na autenticação
    echo "Falha na autenticação"
    exit 1
fi
