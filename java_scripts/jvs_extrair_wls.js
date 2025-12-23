function extrairWL() {
  let texto = document.getElementById("entrada").innerText.trim();
  let encontrados = texto.match(/WL-\d{1,8}/gi);

  if (encontrados) {
    document.getElementById("saida").innerText =
      "'" + encontrados.join("','") + "'";
  } else {
    document.getElementById("saida").innerText = "Nenhuma WL encontrada.";
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