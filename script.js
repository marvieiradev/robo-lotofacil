const arrayDe25Strings = Array.from({ length: 25 }, (_, i) => {
  const numero = i + 1;
  return numero < 10 ? `0${numero}` : `${numero}`;
});
const containerJogos = document.getElementById("arrays-container");
const btnGerarJogos = document.getElementById("gerar");

function gerarSorteios(arrayOriginal) {
  if (arrayOriginal.length !== 25) {
    return "O array original deve conter exatamente 25 strings.";
  }

  const sorteios = [];
  const sorteiosGerados = new Set();

  while (sorteios.length < 10) {
    const novoSorteio = [];
    const indicesUsados = new Set();

    while (novoSorteio.length < 15) {
      const indiceAleatorio = Math.floor(Math.random() * arrayOriginal.length);
      if (!indicesUsados.has(indiceAleatorio)) {
        novoSorteio.push(arrayOriginal[indiceAleatorio]);
        indicesUsados.add(indiceAleatorio);
      }
    }

    novoSorteio.sort();
    const sorteioString = JSON.stringify(novoSorteio);

    if (!sorteiosGerados.has(sorteioString)) {
      sorteios.push(novoSorteio);
      sorteiosGerados.add(sorteioString);
    }

    if (sorteios.length > 100) {
      console.warn(
        "Atingido um limite de tentativas para gerar arrays únicos."
      );
      break;
    }
  }
  return sorteios;
}

function exibirSorteios(arrays) {
  containerJogos.innerHTML = ""; // Limpa os arrays anteriores
  if (typeof arrays === "string") {
    containerJogos.innerHTML = `<p>${arrays}</p>`;
  } else {
    arrays.forEach((array, index) => {
      const arrayDiv = document.createElement("div");
      arrayDiv.classList.add("array-item");
      arrayDiv.innerHTML = `<h3 class="array-title">Jogo ${index + 1}</h3>`;

      const numbersDiv = document.createElement("div");
      numbersDiv.classList.add("array-numbers");
      array.forEach((number) => {
        const numberSpan = document.createElement("span");
        numberSpan.classList.add("lotofacil-number");
        numberSpan.textContent = number;
        numbersDiv.appendChild(numberSpan);
      });

      arrayDiv.appendChild(numbersDiv);
      containerJogos.appendChild(arrayDiv);
    });
    // Adiciona a classe 'visible' para exibir os arrays com uma transição
    containerJogos.classList.add("visible");
  }
}

// Função para gerar e exibir os arrays
function gerarJogos() {
  // Remove a classe 'visible' para ocultar os arrays antes de gerar novos
  containerJogos.classList.remove("visible");
  // Adiciona um pequeno atraso para que a transição de ocultar seja visível
  setTimeout(() => {
    const novosArrays = gerarSorteios(arrayDe25Strings);
    exibirSorteios(novosArrays);
  }, 300); // 300ms de atraso (ajuste conforme necessário)
}

// Adiciona um ouvinte de eventos ao botão
btnGerarJogos.addEventListener("click", gerarJogos);
