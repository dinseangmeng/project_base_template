#! /bin/bash
CHAT_ID=${CHAT_ID}
BOT_TOKEN=${BOT_TOKEN}

L="---------------------------------------------"
Log=$(git log -n 1 --pretty=format:"<b>COMMITER</b>: %cN %n<b>DATE</b>: %ci %n<b>MESSAGE</b>: %s")
Server="<b>Server</b>: Portfolio_ve%0A<b>Local IP</b>:139.162.45.153%0A<b>Link IP URL</b>: 139.162.45.153:1020%0A<b>Link DOMAIN URL</b>: api.dinseangmeng.xyz"
MSG="${L}%0A<b>PROJECT</b>: api%0A<b>APPLICATION</b>: HTML%0A<b>STATUS</b>:  SUCCESS %0A<b>VERSION</b>: ${BUILD_NUMBER}%0A${L}%0A${Log}%0A${L}%0A${Server}%0A${L}"


if [ -z "${Log}" ]; then
    echo "String is empty"
    else
    curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text="${MSG}" -d parse_mode="HTML"
fi