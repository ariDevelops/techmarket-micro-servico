#!/bin/bash
# Script para adicionar o usuário atual ao grupo docker automaticamente

# Nome do usuário que vai ser adicionado (padrão: usuário logado)
USER_NAME=${1:-$USER}
GROUP_NAME="docker"

echo "🔍 Verificando o grupo '$GROUP_NAME'..."

# Cria o grupo docker se não existir
if ! getent group "$GROUP_NAME" > /dev/null 2>&1; then
    echo "⚙️  Grupo '$GROUP_NAME' não existe. Criando..."
    sudo groupadd "$GROUP_NAME"
else
    echo "✅ Grupo '$GROUP_NAME' já existe."
fi

# Verifica se o usuário já faz parte do grupo
if id -nG "$USER_NAME" | grep -qw "$GROUP_NAME"; then
    echo "✅ Usuário '$USER_NAME' já faz parte do grupo '$GROUP_NAME'."
else
    echo "➕ Adicionando '$USER_NAME' ao grupo '$GROUP_NAME'..."
    sudo usermod -aG "$GROUP_NAME" "$USER_NAME"
    echo "✅ Usuário adicionado com sucesso!"
    echo "⚠️  É necessário atualizar a sessão para aplicar a mudança."
    
    # Atualiza grupo na sessão atual se possível
    if [ "$USER_NAME" = "$USER" ]; then
        echo "🔄 Atualizando grupo na sessão atual..."
        newgrp "$GROUP_NAME" <<EOF
echo "✅ Grupo atualizado para o usuário atual."
EOF
    else
        echo "👉 Faça logout e login novamente para aplicar a mudança ao usuário '$USER_NAME'."
    fi
fi

# Teste opcional: verifica se docker pode ser executado
if command -v docker >/dev/null 2>&1; then
    echo "🚀 Testando acesso ao Docker..."
    if docker ps > /dev/null 2>&1; then
        echo "✅ Docker acessível sem sudo!"
    else
        echo "⚠️  Docker ainda requer sudo. Pode ser necessário reiniciar a sessão."
    fi
else
    echo "❌ Docker não encontrado. Instale-o primeiro."
fi

