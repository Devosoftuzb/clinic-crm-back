"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = sendSMS;
const common_1 = require("@nestjs/common");
async function sendSMS(phone, message, token) {
    try {
        const axios = require('axios');
        const FormData = require('form-data');
        const data = new FormData();
        data.append('mobile_phone', phone);
        data.append('message', message);
        data.append('from', 'DevoSoft');
        data.append('callback_url', 'http://0000.uz/test.php');
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://notify.eskiz.uz/api/message/sms/send',
            headers: {
                ...data.getHeaders(),
                Authorization: token,
            },
            data,
        };
        axios(config)
            .then(function (response) {
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    catch (error) {
        throw new common_1.BadRequestException(error.message);
    }
}
//# sourceMappingURL=senSMS.js.map