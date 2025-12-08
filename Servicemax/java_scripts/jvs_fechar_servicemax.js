function processar() {
  let texto = document.getElementById("entrada").innerText.trim();

  // Extrai IDs do texto
  let ids = texto.match(/a0o[a-zA-Z0-9]{15,}/g);

  if (!ids) {
    document.getElementById("saida").innerHTML = "<div>Nenhum ID encontrado.</div>";
    return;
  }

  // Obtém valores dos dropdowns 
  let orderStatus = document.getElementById("orderStatus").value;
  let closingMotive = document.getElementById("closingMotive").value;

  // dia e hora atual formatada
  let agora = new Date();
  let timestamp =
    agora.getFullYear() +
    "-" +
    String(agora.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(agora.getDate()).padStart(2, "0") +
    "T" +
    String(agora.getHours()).padStart(2, "0") +
    ":" +
    String(agora.getMinutes()).padStart(2, "0") +
    ":" +
    String(agora.getSeconds()).padStart(2, "0") +
    ".000";

  // Construir tabela HTML
  const table = document.createElement("table");
  table.className = "result-table";
  table.style.cssText = "width:100%;border-collapse:collapse;border:1px solid #ddd;";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["_", "Id", "SVMXC__Order_Status__c", "CS_ClosingMotive__c", "SVMXC__Closed_On__c"].forEach((h) => {
    const th = document.createElement("th");
    th.innerText = h;
    th.style.cssText = "text-align:left;padding:8px;border:1px solid #ddd;background:#f4f4f4;";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  ids.forEach((id) => {
    const tr = document.createElement("tr");

    const objTd = document.createElement("td");
    objTd.innerText = "[SVMXC__Service_Order__c]";
    objTd.style.cssText = "padding:8px;border:1px solid #ddd;";
    tr.appendChild(objTd);

    const idTd = document.createElement("td");
    idTd.innerText = id;
    idTd.style.cssText = "padding:8px;border:1px solid #ddd;";
    tr.appendChild(idTd);

    const statusTd = document.createElement("td");
    statusTd.innerText = orderStatus || "";
    statusTd.style.cssText = "padding:8px;border:1px solid #ddd;";
    tr.appendChild(statusTd);

    const motiveTd = document.createElement("td");
    motiveTd.innerText = closingMotive || "";
    motiveTd.style.cssText = "padding:8px;border:1px solid #ddd;";
    tr.appendChild(motiveTd);

    const closedTd = document.createElement("td");
    closedTd.innerText = timestamp;
    closedTd.style.cssText = "padding:8px;border:1px solid #ddd;";
    tr.appendChild(closedTd);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  const saida = document.getElementById("saida");
  saida.innerHTML = "";
  saida.appendChild(table);
}

function copiar() {
  const saida = document.getElementById("saida");
  const table = saida.querySelector("table");

  if (!table) {
    navigator.clipboard.writeText(saida.innerText || "").then(() => alert("Copiado!"));
    return;
  }

  // Converte a tabela em TSV para colar no Excel/Sheets
  const lines = [];
  table.querySelectorAll("tr").forEach((tr) => {
    const cols = Array.from(tr.children).map((td) => td.innerText.replace(/\t/g, " "));
    lines.push(cols.join("\t"));
  });

  const tsv = lines.join("\n");
  navigator.clipboard.writeText(tsv).then(() => alert("Copiado!"));
}
