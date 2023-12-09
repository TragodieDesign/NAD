#!/bin/bash

# Verifica se o script está sendo executado com permissões de root
if [ "$EUID" -ne 0 ]; then
  echo "Este script precisa ser executado com permissões de root."
  exit 1
fi

# Adiciona a entrada ao arquivo hosts
echo "127.0.0.1 nsd.local" >> /etc/hosts

echo "A entrada para nsd.local foi adicionada ao arquivo hosts."
