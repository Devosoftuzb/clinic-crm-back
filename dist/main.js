"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const start = async () => {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        });
        const PORT = process.env.API_PORT || 9999;
        app.use(cookieParser());
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use((req, res, next) => {
            const startTime = Date.now();
            res.on('finish', () => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                console.log(`${req.method} ${req.originalUrl} ${res.statusCode}, ${responseTime}ms`);
            });
            next();
        });
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Clinic CRM')
            .setDescription('jurayevdev')
            .setVersion('7.3.1')
            .addTag('NodeJs, NestJs, Postgres, Sequelize')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/api/docs', app, document);
        app.listen(PORT, () => {
            console.log(`Server started on port --- ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
//# sourceMappingURL=main.js.map