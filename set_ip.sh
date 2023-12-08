cd ..
# descomente abaixo para o ip remoto ou na linha seguinte para localhost
# Obtém o endereço IP usando o comando hostname -I
ip_local=$(hostname -I | awk '{print $1}')

# Verifica se $ip_local não está vazio
if [ "${#ip_local}" -gt 0 ]; then
    # Se não estiver vazio, usa o valor obtido pelo comando
    :
else
    # Se estiver vazio, define como "localhost"
    ip_local="localhost"
fi
# Escreve o endereço IP no arquivo .env no diretório do backend
echo "IP_FRONT=http://$ip_local:3000
IP_BACK=http://$ip_local:3003

BROWSER=/usr/bin/firefox -kiosk -width \${WIDTH} -height \${HEIGTH}
WIDTH=\${WIDTH}
HEIGTH=\${HEIGTH}
TARGET_USER=nsd
HOME=/home/${TARGET_USER}
" > backend-nad/.env


# Escreve o endereço IP no arquivo .env no diretório do frontend
echo "REACT_APP_IP_FRONT=http://$ip_local:3000
REACT_APP_IP_BACK=http://$ip_local:3003"> frontend-nad/.env


# Adiciona uma mensagem de sucesso que o Node.js pode detectar
echo "IP configurado com sucesso!"
