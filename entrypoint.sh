#!/bin/sh
npm run db:create:dev
npm run migrate:dev
npm run build:public
npm run start:both