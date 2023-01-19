import { Request, Response } from 'express'
import { SuggestionController } from '../suggestion.controller'
import { SuggestionService } from '../suggestion.service'

describe('SuggestionController Unit Test', () => {
    let suggestionService: SuggestionService
    let suggestionController: SuggestionController
  
    let createSuggestionMock: jest.Mock

    let req: Request
    let res: Response
    // let resJSONMock: jest.Mock    

    beforeAll(() => {
      suggestionService = {} as any
      createSuggestionMock = suggestionService.create = jest.fn(() => {
        throw new Error('suggestionService.create() should not be called')
      })

  
      suggestionController = new SuggestionController(suggestionService)
    })

    beforeEach(() => {
      req = {} as any
      req.body = {}
      req.session = {} as any
  
      res = {} as any
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn()
    })
  
    afterEach(() => {
      createSuggestionMock.mockReset()
    })

    describe('create suggestion', () => {
      it('should reject if not logged in', async () => {
        req.body.suggestion = "suggestion"
        await suggestionController.create(req, res);
        expect(res.status).toBeCalledWith(401)
        expect(res.json).toBeCalledWith({
            "error": "This API is only available to logged users"
        })
      })

      it('should reject if no suggestion', async () => {
      let mockUserId = Math.random()

      req.session.user = {id: mockUserId, username: 'regene'};

        await suggestionController.create(req, res);
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith({
            error: 'no suggestion',
        })
      })
    
      it('should create suggestion', async () => {
        let mockUserId = Math.random()

        req.session.user = {id: mockUserId, username: 'regene'};
        req.body.suggestion = "suggestion"

          jest
            .spyOn(suggestionService, 'create')
            .mockReturnValue(Promise.resolve({ id: mockUserId }))
          await suggestionController.create(req, res)
          expect(res.json).toBeCalledWith({
              id: mockUserId,
          })
      })
      
    })
})