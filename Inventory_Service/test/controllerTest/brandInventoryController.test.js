import {expect} from "chai"
import sinon from "sinon"
import brandInventoryService from "../../service/brandInventoryService.js";
import brandInventoryController from "../../controller/brandInventoryController.js";

describe('Brand Inventory Controller', () => {
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
    describe('add brand', () => {
        it('should insert an brand and return status 201',
            async () => {
                req.body = {
                    "brand_id": 1,
                    "brand_name": "Nike"
                };
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(brandInventoryService, "addBrand").resolves('Success');

                    await brandInventoryController.addBrand(req,res,next);
                    expect(res.status.calledWith(201)).to.be.true;
            });
    });
    describe('getAll brands', () => {
        it('should fetch all existing brands and return status 200',
            async () => {
                const brands = [
                    {
                        "brand_id": 1,
                        "brand_name": "Jordan",
                        "created_at": "2024-11-24T11:26:15.000Z",
                        "updated_at": "2024-11-24T11:31:28.000Z"
                    },
                    {
                        "brand_id": 2,
                        "brand_name": "Nike",
                        "created_at": "2024-11-24T12:36:15.000Z",
                        "updated_at": "2024-11-24T11:31:28.000Z"
                    }
                ];
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(brandInventoryService, "getAllBrands").resolves(brands);


                    await brandInventoryController.getAllBrands(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(brands)).to.be.true;
            });
    });
    describe('get brand by Id', () => {
        it('should fetch an existing brand and return status 200',
            async () => {
                const brand = {
                    "brand_id": 1,
                    "brand_name": "Jordan",
                    "created_at": "2024-11-24T11:26:15.000Z",
                    "updated_at": "2024-11-24T11:31:28.000Z"
                };
                req.params = { brandId : 1 };
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(brandInventoryService, "getBrandById").resolves(brand);


                    await brandInventoryController.getBrandById(req,res,next);
                    expect(res.status.calledWith(200)).to.be.true;
                    expect(res.json.calledWith(brand)).to.be.true;
            });
    });
    describe('Update brand by Id', () => {
        it('should update an existing brand and return status 200 with updated message',
            async () => {
                const updatedBrand = { message: 'Brand updated successfully.'};
                req.params = { brandId: 1 };
                req.body = {
                    "brand_name": "Jordan"
                };
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(brandInventoryService, "updateBrand").resolves(updatedBrand);
                    await brandInventoryController.updateBrandById(req,res,next);
                    expect(res.status.calledWith(202)).to.be.true;
                    expect(res.json.calledWith(updatedBrand)).to.be.true;
            });
    });
    describe('delete brand', () => {
        it('should delete an existing brand and return status 200 with delete message',
            async () => {
                const brand = {"message": "Brand deleted successfully."};
                req.params = { brandId: 1 };
                req.body = {};
                    // Stub the correct method: addUserService from UserService
                    sinon.stub(brandInventoryService, "deleteBrand").resolves(brand);
                    await brandInventoryController.deleteBrandById(req,res,next);
                    expect(res.status.calledWith(202)).to.be.true;
                    expect(res.json.calledWith(brand)).to.be.true;
            });
    });
});
