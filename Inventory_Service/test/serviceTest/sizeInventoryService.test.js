import {expect} from "chai";
import sinon from "sinon";
import sizeInventoryService from "../../service/sizeInventoryService.js";
import sizeInventoryRepository from "../../repository/sizeInventoryRepository.js";

describe('Size Service', () => {
    afterEach(() => {
        sinon.restore();
    });
    describe('add size', () => {
        it('should insert an size and return status 201',
            async () => { 
                let size_id= 1; 
                let size_types =  "Clothing";
                let size_value = "Medium";
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryRepository, "addSize").resolves('Success');

                    await sizeInventoryService.addSize( size_id, size_types, size_value );

                    expect(sizeInventoryRepository.addSize.calledOnce).to.be.true;
            });
    });
    describe('get all sizes', () => {
        it('should get all sizes and return status 200',
            async () => {
                    let testGetAllSizes = [
                        {
                            "size_id": 1,
                            "size_types": "Clothing",
                            "size_value": "Medium",
                            "created_at": "2024-11-24T11:13:25.000Z",
                            "updated_at": "2024-11-24T11:13:25.000Z"
                        },
                        {
                            "size_id": 2,
                            "size_types": "Socks",
                            "size_value": "Small",
                            "created_at": "2024-12-01T04:06:35.000Z",
                            "updated_at": "2024-12-01T04:06:35.000Z"
                        }
                    ];
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryRepository, "getAllSizes").resolves(testGetAllSizes);


                    const result = await sizeInventoryService.getAllSizes();
                    expect(result).to.equal(testGetAllSizes);
                    expect(sizeInventoryRepository.getAllSizes.calledOnce).to.be.true;
            });
    });
    describe('get size by Id', () => {
        it('should check an size by Id and return status 200',
            async () => {
                    let sizeId = 2;
                    let testGetSizeById = 
                    {
                        "size_id": 2,
                        "size_types": "Socks",
                        "size_value": "Small",
                        "created_at": "2024-12-01T04:06:35.000Z",
                        "updated_at": "2024-12-01T04:06:35.000Z"
                    };
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryRepository, "getSizeById").resolves(testGetSizeById);


                    const result = await sizeInventoryService.getSizeById(sizeId);
                    expect(result).to.equal(testGetSizeById);
                    expect(sizeInventoryRepository.getSizeById.calledOnce).to.be.true;
            });
    });
    describe('update size', () => {
        it('should update an size and return status 200',
            async () => {
                let size_id= 1; 
                let size_types =  "Clothing";
                let size_value = "Medium";
                    sinon.stub(sizeInventoryRepository, "updateSize").resolves("success");
                    const result = await sizeInventoryService.updateSize(size_id, size_types, size_value);
                    expect(result).to.equal("success");
                    expect(sizeInventoryRepository.updateSize.calledOnce).to.be.true;

        });
    });
    describe('delete size', () => {
        it('should delete an size and return status 200',
            async () => {
                    let sizeId = 2;
                    sinon.stub(sizeInventoryRepository, "deleteSize").resolves("success");
                    const result = await sizeInventoryService.deleteSize(sizeId);
                    expect(result).to.equal("success");
                    expect(sizeInventoryRepository.deleteSize.calledOnce).to.be.true;
        });
    });
});
