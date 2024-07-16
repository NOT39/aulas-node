const pessoaArray = ["Davi", 32, "00000000000"]
pessoaArray[2]

const pessoaObjeto = {
    nome: "Davi",
    idade: 32,
    cpf: "00000000000",
    "endereco-fisico": "jodfsj"
}

pessoaObjeto.nome = "David"
pessoaObjeto.altura = 1.74

console.log(pessoaObjeto.nome)
console.log(pessoaObjeto["endereco-fisico"])
console.log(pessoaObjeto)