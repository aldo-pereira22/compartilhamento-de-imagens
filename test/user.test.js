const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

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
                fail(err)
            })

    })
})