let minhaVariavel: number | string = 32

minhaVariavel = "texto"

// minhaVariavel = undefined

let outraVariavel = "texto"
// outraVariavel = undefined

function contarCaracteres(texto: string): number {
  return texto.length
}

// const pessoa: {
//   nome: string
//   cpf?: string
// } = {
//   nome: "Not",
// }

type Pessoa = {
  nome: string
  cpf?: string
  cargo: "gerente" | "administrador",
}

const pessoa: Pessoa = {
  nome: "Not",
  cargo: 'administrador'
}

const pessoa2: Pessoa = {
  nome: "Davi",
  cpf: "002",
  cargo: 'gerente'
}

pessoa.cpf = "001"
// pessoa.extra = "erro"


type VariavelEspecial = string | number

const variavelEspecial: VariavelEspecial = "jofidj"

type FuncaoAritmetica = (num1: number, num2: number) => number

const somar: FuncaoAritmetica = (num1, num2) => {
  return num1 + num2
}

type Funcionario = {
  identificacao: string
  salario: number 
}

type Gerente = Pessoa & Funcionario & { cargo: 'gerente' }

const meuGerente: Gerente = {
  nome: 'Davi',
  identificacao: "01",
  salario: 5000,
  cargo: 'gerente',
}

type Martelo = {
  martelar: () => void
  retirarPrego: () => void
}

type Parafusadeira = {
  furar: () => void
  parafusar: () => void
}

type Usuario<T = string> = {
  nome: string
  email: string
  ferramenta: T
}

const usuario: Usuario<Parafusadeira> = {
  email: 'dfjodfi',
  ferramenta: {
    furar: () => {},
    parafusar: () => {}
  },
  nome: 'fidjs'
}

const usuario2: Usuario = {
  nome: 'jfdiosf',
  email: 'idfjsaofdj',
  ferramenta: "43"
}