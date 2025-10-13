"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const clientsServices_1 = require("../services/clientsServices");
class ClientsController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async updatePersonal(req, res, next) {
        try {
            const result = await this.userService.updatePersonalInfo(req.userInfo.userId, req.body);
            return res.status(200).json({ success: true, message: "User updated successfully", data: result });
        }
        catch (error) {
            return next(error);
        }
    }
    async getClients(req, res, next) {
        try {
            const info = await this.userService.getClients(req.userInfo.userId, req.userInfo.role, req.query?.specificClientId);
            return res.status(200).json({
                success: true,
                message: "Got information successfully",
                data: info
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.ClientsController = ClientsController;
const clientService = new clientsServices_1.ClientsServices();
const clientController = new ClientsController(clientService);
module.exports = { clientController };
//# sourceMappingURL=clientsController.js.map