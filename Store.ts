// Exercicio 1 - Modelagem Sistema de ALuguel de Bikes - classes
class Store {
    nome: string
    numBicicletas: number
    saldo: number

    constructor (nome: string, numBicicletas: number, saldo: number) {
        this.nome = nome
        this.numBicicletas = 0
        this.saldo = 0
    }
}

class Bike {
    modelo: string
    cor: string
    disponivel: boolean
    valor: number

    constructor (modelo: string, cor: string, disponivel: boolean, valor: number) {
        this.modelo = modelo
        this.cor = cor
        this.disponivel = true
        this.valor = valor
    }
}

class Rent {
    tempo: number
    bicicleta: Bike

    constructor (tempo: number, bicicleta: Bike) {
        this.tempo = tempo
        this.bicicleta = bicicleta
    }
}