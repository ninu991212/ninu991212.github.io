function extrairWO() {
  let texto = document.getElementById("entrada").innerText.trim();
  let encontrados = texto.match(/WO-\d{1,8}/gi);

  if (encontrados) {
    // Remove duplicados usando Set e converte de volta para array
    let unicos = [...new Set(encontrados.map(wo => wo.toUpperCase()))];
    document.getElementById("saida").innerText =
      "'" + unicos.join("','") + "'";
  } else {
    document.getElementById("saida").innerText = "Nenhuma WO encontrada.";
  }
}

function showToast(message, isSuccess = true) {
  const toast = document.getElementById("toast");
  const toastIcon = document.getElementById("toast-icon");
  const toastMessage = document.getElementById("toast-message");
  
  toastMessage.textContent = message;
  toastIcon.textContent = isSuccess ? "✓" : "✗";
  toast.className = isSuccess ? "toast success show" : "toast error show";
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function copiarSaida() {
  let conteudo = document.getElementById("saida").innerText;
  if (!conteudo.trim()) {
    showToast("Nada para copiar!", false);
    return;
  }

  navigator.clipboard.writeText(conteudo)
    .then(() => showToast("Copiado com sucesso!"))
    .catch(() => showToast("Erro ao copiar!", false));
}

function limparSaida() {
  document.getElementById("saida").innerText = "";
}

function limparEntrada() {
  document.getElementById("entrada").innerText = "";
}
