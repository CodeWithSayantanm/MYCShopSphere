import {expect} from "chai"
import sinon from "sinon"
import sizeInventoryService from "../../service/sizeInventoryService.js";
import sizeInventoryController from "../../controller/sizeInventoryController.js";

describe('Size Inventory Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub();
    });
    afterEach(() => {
        sinon.restore();
    });
    describe('add size', () => {
        it('should insert an size and return status 201',
            async () => {
                req.body = {
                    "size_id": 1,
                    "size_types": "Clothing",
                    "size_value": "Medium"
                };
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryService, "addSize").resolves('Success');

                    await sizeInventoryController.addSize(req,res,next);
                    expect(res.status.calledWith(201)).to.be.true;
            });
    });
    describe('getAll sizes', () => {
        it('should fetch all existing sizes and return status 200',
            async () => {
                const sizes = [
                    {
                        "size_id": 1,
                        "size_types": "Clothing",
                        "size_value": "Medium",
                        "created_at": "2024-11-24T11:13:25.000Z",
                        "updated_at": "2024-11-24T11:13:25.000Z"
                    },
                    {
                        "size_id": 2,
                        "size_types": "socks",
                        "size_value": "Small",
                        "created_at": "2024-11-23T11:13:25.000Z",
                        "updated_at": "2024-11-24T12:13:35.000Z"
                    }
                ];
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryService, "getAllSizes").resolves(sizes);


                    await sizeInventoryController.getAllSizes(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(sizes)).to.be.true;
            });
    });
    describe('get size by Id', () => {
        it('should fetch an existing size and return status 200',
            async () => {
                const size = {
                    "size_id": 1,
                    "size_types": "Clothing",
                    "size_value": "Medium",
                    "created_at": "2024-11-24T11:13:25.000Z",
                    "updated_at": "2024-11-24T11:13:25.000Z"
                };
                req.params = { sizeId: 1 };
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryService, "getSizeById").resolves(size);


                    await sizeInventoryController.getSizeById(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(size)).to.be.true;
            });
    });
    describe('Update size by Id', () => {
        it('should update an existing size and return status 200 with updated message',
            async () => {
                const updatedSize = { message: 'Size updated successfully.'};
                req.params = { sizeId: 1 };
                req.body = {
                    "size_types": "Clothing",
                    "size_value": "Small"
                };
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryService, "updateSize").resolves(updatedSize);
                    await sizeInventoryController.updateSizeById(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(updatedSize)).to.be.true;
            });
    });
    describe('delete size', () => {
        it('should delete an existing size and return status 200 with delete message',
            async () => {
                const size = {"message": "Size deleted successfully."};
                req.params = { sizeId: 2 };
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(sizeInventoryService, "deleteSize").resolves(size);
                    await sizeInventoryController.deleteSizeById(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(size)).to.be.true;
            });
    });
});
