#!/bin/bash
# ------------------------------------------------------------
# Script: disable-kvm.sh
# Descrição: Desativa o KVM temporariamente para permitir
#            o uso do VirtualBox e Vagrant.
# ------------------------------------------------------------

echo "==> Desativando o serviço libvirtd (KVM/virt-manager)..."
sudo systemctl stop libvirtd 2>/dev/null

echo "==> Removendo módulos KVM do kernel..."
for module in kvm_intel kvm_amd kvm; do
    if lsmod | grep -q "^$module"; then
        echo "   -> Removendo módulo: $module"
        sudo modprobe -r $module
    else
        echo "   -> Módulo $module não está carregado."
    fi
done

echo "==> Verificando se ainda há módulos KVM carregados..."
if lsmod | grep -q kvm; then
    echo "⚠️  Aviso: Alguns módulos KVM ainda estão ativos!"
    echo "   Talvez outro processo (como virt-manager) esteja usando KVM."
else
    echo "✅ KVM desativado com sucesso. O VirtualBox pode ser usado agora."
fi

echo
echo "Dica: Execute 'vagrant up' agora para iniciar sua VM."

