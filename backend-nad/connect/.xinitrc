#!/usr/bin/env bash
#conexao RDP com gateway
xset -dpms && xset s off && xset s noblank && xfreerdp /v:http://localhost:3003 /g:http://localhost:3003 /gu:user /gp:senha /u:usuario remoto /p:senha remota