import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service, Action, Event, Method} from 'moleculer-decorators';
// import multer from 'multer';
const fs = require("fs");
const fsPromises = require("fs").promises
const {access} = require('node:fs/promises');
const path = require("path");
const mkdir = require("mkdirp").sync;
// const mime = require("mime-types");
const uploadDir = path.join(process.cwd(), "./public/uploads");
const {v4: uuidv4} = require('uuid');
mkdir(uploadDir);
// const storage = multer.diskStorage({
//   destination: './public/data/uploads/',
// });

// const upload = multer({ storage: storage })
// import MongooseAdapter from 'moleculer-db-adapter-mongoose';
// import mongoose from 'mongoose';
// import DbService from 'moleculer-db';
// import NotFoundError from './CustomErrors/NotFoundError';

require('dotenv')
//.config({path: `.env.${process.env.NODE_ENV}`});

const MONGODB_URL = process.env.MONGODB_URL;
const settingsServiceBroker = {
  nodeID: process.env.FILES_SERVICE_NODE_ID,
  transporter: process.env.TRANSPORTER,
  requestTimeout: 5 * 1000
};

const broker = new ServiceBroker(settingsServiceBroker);

const settingsCreateService = {
  name: "files",
};

@Service(settingsCreateService)
class FilesService extends MoleculerService {
  @Action()
  async saveDistrict(ctx: any) {
    this.logger.info("Received upload meta:", ctx.meta.user.userId._id);
    return new this.Promise(async (resolve, reject) => {
      //reject(new Error("Disk out of space"));

      // try {
      //   await fs.promises.access(`${uploadDir}/${ctx.meta.fieldname}`);
      // } catch (error) {
      //   await fsPromises.mkdir(`${uploadDir}/${ctx.meta.fieldname}`);
      // }

      const district: any = await ctx.call("districts.get", {id: ctx.meta.fieldname});
      const uuid = uuidv4();
      const updatedDistrict: any = await ctx.call("districts.update",
        {id: ctx.meta.fieldname, ...district, avatar: `/upload/district_${ctx.meta.fieldname}_${uuid}.png`}
      );
      const filePath = path.join(`${uploadDir}`, `district_${ctx.meta.fieldname}_${uuid}.png`);
      const f = fs.createWriteStream(filePath);
      f.on("close", () => {
        this.logger.info(`Uploaded file stored in '${filePath}'`);
        resolve({filePath, meta: ctx.meta});
      });

      ctx.params.on("error", (err: any) => {
        this.logger.info("File error received", err.message);
        reject(err);
        f.destroy(err);
      });

      f.on("error", () => {
        // Remove the errored file.
        fs.unlinkSync(filePath);
      });

      ctx.params.pipe(f);
    });
  }

  @Action()
  async savePoint(ctx: any) {
    // this.logger.info("Received upload meta:", ctx.meta.user.userId._id);
    return new this.Promise(async (resolve, reject) => {

      const point: any = await ctx.call("points.get", {id: ctx.meta.fieldname});
      const uuid = uuidv4();
      const updatedPoint: any = await ctx.call("points.update",
        {id: ctx.meta.fieldname, ...point, avatar: `/upload/point_${ctx.meta.fieldname}_${uuid}.png`}
      );
      const filePath = path.join(`${uploadDir}`, `point_${ctx.meta.fieldname}_${uuid}.png`);
      const f = fs.createWriteStream(filePath);
      f.on("close", () => {
        this.logger.info(`Uploaded file stored in '${filePath}'`);
        resolve({filePath, meta: ctx.meta});
      });

      ctx.params.on("error", (err: any) => {
        this.logger.info("File error received", err.message);
        reject(err);
        f.destroy(err);
      });

      f.on("error", () => {
        // Remove the errored file.
        fs.unlinkSync(filePath);
      });

      ctx.params.pipe(f);
    });
  }

  @Method
  randomName() {
    return "unnamed_" + Date.now() + ".png";
  }
}

broker.createService(FilesService);
broker.start();