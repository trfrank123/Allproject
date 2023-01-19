import { Request, Response } from 'express'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'

describe('UserController Unit Test', () => {
    let userService: UserService;
    let userController: UserController

    let signupMock: jest.Mock
    let loginMock: jest.Mock

    let req: Request
    let res: Response

    beforeAll(() => {
        userService = {} as any
        signupMock = userService.signup = jest.fn(() => {
        throw new Error('should not be called')
        })
        loginMock = userService.login = jest.fn(() => {
        throw new Error('should not be called')
        })

        userController = new UserController(userService)
    })

    beforeEach(() => {
    req = {} as any
    req.body = {}

    res = {} as any
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn()
    })

    afterEach(() => {
        signupMock.mockReset()
        loginMock.mockReset()
    })

    describe('signup', () => {
        it('should reject if missing username', async () => {
        req.body.password = 'secret'
        req.body.nickname = 'alice'
        await userController.signup(req, res)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith({
            error: 'Invalid object "req.body", missing "username"',
        })
        })

        it('should reject if missing password', async () => {
        req.body.username = 'regenechan'
        req.body.nickname = 'alice'
        await userController.signup(req, res)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith({
            error: 'Invalid object "req.body", missing "password"',
        })
        })

        it('should reject if missing nickname', async () => {
        req.body.username = 'regenechan'
        req.body.password = 'secret'
        await userController.signup(req, res)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith({
            error: 'Invalid object "req.body", missing "nickname"',
        })
        })

        it('should return new user id if signup success', async () => {
        let mockId = Math.random()
        req.body.username = 'regenechan'
        req.body.nickname = 'regene'
        req.body.password = 'secret'
        jest
            .spyOn(userService, 'signup')
            .mockReturnValue(Promise.resolve({ id: mockId }))
        await userController.signup(req, res)
        expect(res.json).toBeCalledWith({
            id: mockId,
        })
        })
    })
})
