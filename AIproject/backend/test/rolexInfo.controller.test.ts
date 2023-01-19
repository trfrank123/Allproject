// import { Request, Response } from 'express'
// import { RolexInfoController } from '../rolexInfo.controller'
// import { RolexInfoService } from '../rolexInfo.service'


// describe('RolexInfoController Unit Test', () => {
//     let rolexInfoService: RolexInfoService
//     let rolexInfoController: RolexInfoController
  
//     let createRolexInfoMock: jest.Mock

//     let req: Request
//     let res: Response
//     // let resJSONMock: jest.Mock    

//     beforeAll(() => {
//         rolexInfoService = {} as any
//       createRolexInfoMock = rolexInfoService.list = jest.fn(() => {
//         throw new Error('RolexInfoService.list() should not be called')
//       })

  
//       rolexInfoController = new RolexInfoController(rolexInfoService)
//     })

//     beforeEach(() => {
//       req = {} as any
//       req.body = {}
//       req.session = {} as any
  
//       res = {} as any
//       res.status = jest.fn().mockReturnValue(res)
//       res.json = jest.fn()
//     })
  
//     afterEach(() => {
//       createRolexInfoMock.mockReset()
//     })

//     describe('list RolexInfo', () => {
//       it('should reject if no Rolex ref number', async () => {

//         await rolexInfoController.list(req, res);
//         expect(res.status).toBeCalledWith(400)
//         expect(res.json).toBeCalledWith({
//             error: 'no refNum',
//         })
//       })
    
//       it('should list RolexInfo', async () => {

//         req.body.refNum = "116900"

//           jest
//             .spyOn(rolexInfoService, 'list')
//             .mockReturnValue(Promise.resolve({
//                 id: 1,
//                 image: 'Rolex+Air-King+ref.jpg',
//                 model: 'AirKing',
//                 year: '2016',
//                 reference_number: 116900,
//                 price_2018:6200,
//                 price_2020:6450,
//                 price_2022:7450,
//             })) 
          
//         await rolexInfoController.list(req, res)

//           expect(res.json).toBeCalledWith({
//             id: 1,
//             image: 'Rolex+Air-King+ref.jpg',
//             model: 'AirKing',
//             year: '2016',
//             reference_number: 116900,
//             price_2018: 6200,
//             price_2020: 6450,
//             price_2022: 7450
//         })

//       })
      
//     })
// })