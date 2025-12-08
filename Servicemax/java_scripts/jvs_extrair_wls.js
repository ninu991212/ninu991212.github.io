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

function copiarSaida() {
  let conteudo = document.getElementById("saida").innerText;
  if (!conteudo.trim()) return;

  navigator.clipboard.writeText(conteudo).then(() => {
    alert("Copiado!");
  });
}

function limparSaida() {
  document.getElementById("saida").innerText = "";
}

function limparEntrada() {
  document.getElementById("entrada").innerText = "";
}