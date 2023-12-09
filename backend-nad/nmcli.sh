#!/bin/bash
SSID="$1"
PASSWORD="$2"

nmcli dev wifi connect "$SSID" password "$PASSWORD"
