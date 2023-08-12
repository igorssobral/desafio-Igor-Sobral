class CaixaDaLanchonete {
  constructor() {
    this.codigo = [
      "cafe",
      "chantily",
      "suco",
      "sanduiche",
      "queijo",
      "salgado",
      "combo1",
      "combo2",
    ];

    this.valor = [
      ["cafe", 3.0],
      ["chantily", 1.5],
      ["suco", 6.2],
      ["sanduiche", 6.5],
      ["queijo", 2.0],
      ["salgado", 7.25],
      ["combo1", 9.5],
      ["combo2", 7.5],
    ];
    this.formaDePagamento = ["dinheiro", "debito", "credito"];
  }

  validarFormaDePagamento(metodoDePagamento) {
    return this.formaDePagamento.includes(metodoDePagamento)
      ? null
      : "Forma de pagamento inválida!";
  }

  validarItensNoCarrinho(itens) {
    return itens.length === 0 ? "Não há itens no carrinho de compra!" : null;
  }

  validarItensPedido(itens) {
    let pedido = [];
    for (const item of itens) {
      const items = item.split(",");
      if (!this.codigo.includes(items[0])) {
        return "Item inválido!";
      }
      if (Number(items[1]) <= 0 || items[1] === "") {
        return "Quantidade inválida!";
      }
      pedido.push(items);
    }

    return pedido;
  }

  validarItensExtras(pedido) {
    const cod = pedido.map((item) => item[0]);
    if (cod.includes("queijo") && !cod.includes("sanduiche")) {
      return "Item extra não pode ser pedido sem o principal";
    }
    if (cod.includes("chantily") && !cod.includes("cafe")) {
      return "Item extra não pode ser pedido sem o principal";
    }
    return null;
  }

  obterPrecoDoProduto(nomeDoProduto) {
    const item = this.valor.find((item) => item[0] === nomeDoProduto);
    return item ? item[1] : null;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const erroFormaDePagamento =
      this.validarFormaDePagamento(metodoDePagamento);
    const erroItensNoCarrinho = this.validarItensNoCarrinho(itens);

    if (erroFormaDePagamento || erroItensNoCarrinho) {
      return erroFormaDePagamento || erroItensNoCarrinho;
    }

    const pedidoValido = this.validarItensPedido(itens);

    if (!Array.isArray(pedidoValido)) {
      return pedidoValido;
    }

    const erroItensExtras = this.validarItensExtras(pedidoValido);
    if (erroItensExtras) {
      return erroItensExtras;
    }

    let valorTotal = 0;
    for (const item of pedidoValido) {
      const precoDoProduto = this.obterPrecoDoProduto(item[0]);
      const qtdProduto = Number(item[1]);
      if (precoDoProduto !== null) {
        valorTotal += qtdProduto * precoDoProduto;
      }
    }

    switch (metodoDePagamento) {
      case "debito":
        break;
      case "credito":
        valorTotal += valorTotal * 0.03;
        break;
      case "dinheiro":
        valorTotal -= valorTotal * 0.05;
    }
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}
export { CaixaDaLanchonete };
