cd ..
# Obtém o endereço IP da máquina
ip_local=$(hostname -I| awk '{print $1}')




# Escreve o endereço IP no arquivo .env no diretório do backend
echo "IP_FRONT=http://$ip_local:3000\nIP_BACK=http://$ip_local:3003" > backend-nad/.env

# Escreve o endereço IP no arquivo .env no diretório do frontend
echo "REACT_APP_IP_FRONT=http://$ip_local:3000\nREACT_APP_IP_BACK=http://$ip_local:3003" > frontend-nad/.env


# Adiciona uma mensagem de sucesso que o Node.js pode detectar
echo "IP configurado com sucesso!"