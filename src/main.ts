import {NestFactory} from '@nestjs/core';
import {ValidationPipe, HttpAdapterHost} from '@nestjs/common';
import {useContainer, Validator} from 'class-validator';
import {AppModule} from './app.module';
import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify';
import * as hbs from 'hbs';

import {join} from 'path';

import * as bodyParser from "body-parser"

async function bootstrap() {
    let FastifyAdapterHost = new FastifyAdapter();
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        FastifyAdapterHost,
        {
            bodyParser: true,
        },
    );

    app.useStaticAssets({
        root: join(__dirname, '..', 'public'),
    });
    app.setViewEngine({
        engine: hbs,
        templates: join(__dirname, '..', 'views'),
    });
    hbs.registerPartials(
        join(__dirname, '..', '/public/monster-admin/monster-html/common/partials'),
    );
    hbs.registerHelper('setVar', function (varName, varValue, options) {
        options.data.root[varName] = varValue;
    });

    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    await app.init();


    await app.listen(3000);
    console.log("app listen on port 3000")
}

bootstrap()
    .then((e) => {
        console.log('server connected');
    })
    .catch((e) => {
        console.log(e);
    });
