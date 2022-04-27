const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)
let mainUser = { name: "Aldo Pereira", email: "aldo@gmail.com", password: "123456" }


beforeAll(() => {
    // inserir Usuário no banco de dados
    return request.post("/user")
        .send(mainUser)
        .then(res => {

        })
        .catch(err => { console.log(err) })

})

afterAll(() => {
    // Remover do banco
    return request.delete("/user/" + mainUser.email)
        .then(res => {})
        .catch(err => {
            console.log(err)
        })

})



describe("Cadastro de usuário", () => {
    test("Deve cadastrar um usuário com sucesso!", () => {
        let time = Date.now()
        let email = ` ${time}@gmail.com`

        let user = { name: "Aldo", email, password: "123456" }

        return request.post("/user")
            .send(user)
            .then(res => {
                // res.statusCode === 200
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)

            }).catch(err => {
                console.log(err)
                fail(err)
            })

    })

    test("Deve impedir que um usuário se cadastre com os dados vazios", () => {

        let user = { name: "", email: "", password: "" }

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400) //400 = bad request

            }).catch(err => {
                fail(err)
            })
    })


    test("Deve impedir que um usuário se cadastre com um e-mail repetido", () => {
        let time = Date.now()
        let email = ` ${time}@gmail.com`

        let user = { name: "Aldo", email, password: "123456" }

        return request.post("/user")
            .send(user)
            .then(res => {
                // res.statusCode === 200
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)

                return request.post("/user")
                    .send(user)
                    .then(res => {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body.error).toEqual("E-mail já cadastrado")
                    })
                    .catch(err => {
                        fail(err)
                    })

            }).catch(err => {
                console.log(err)
                fail(err)
            })
    })
})

describe("Autenticação", () => {
    test("Deve retornar um token quando logar", () => {
        return request.post("/auth")
            .send({ email: mainUser.email, password: mainUser.password })
            .then(res => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.token).toBeDefined()
            })
            .catch(err => {
                fail(err)
            })
    })
})