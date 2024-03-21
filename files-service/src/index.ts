import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service, Action, Event, Method} from 'moleculer-decorators';
// import multer from 'multer';
const fs = require("fs");
const path = require("path");
const mkdir = require("mkdirp").sync;
const mime = require("mime-types");
const uploadDir = path.join(process.cwd(), "./public/uploads");
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
  // mixins: [DbService],
  // settings: {
  //   fields: ["_id", "email", "firstName", "lastName", "middleName"],
  //   entityValidator: {
  //     email: "string",
  //     password: "string",
  //     firstName: "string",
  //     lastName: "string",
  //     middleName: "string"
  //   }
  // },
  // adapter: new MongooseAdapter(MONGODB_URL as string),
  // model: mongoose.model("User", new mongoose.Schema({
  //   filename: {type: String},
  // }, {
  //   timestamps: {
  //     createdAt: 'createdAt',
  //     updatedAt: 'updatedAt'
  //   }
  // })),
};

@Service(settingsCreateService)
class FilesService extends MoleculerService {
  @Action()
  async save(ctx: any) {
    this.logger.info("Received upload meta:", ctx.meta);
    return new this.Promise((resolve, reject) => {
      //reject(new Error("Disk out of space"));
      const filePath = path.join(uploadDir, ctx.meta.filename || this.randomName());
      const f = fs.createWriteStream(filePath);
      f.on("close", () => {
        // File written successfully
        this.logger.info(`Uploaded file stored in '${filePath}'`);
        resolve({ filePath, meta: ctx.meta });
      });

      ctx.params.on("error", (err: any) => {
        this.logger.info("File error received", err.message);
        reject(err);

        // Destroy the local file
        f.destroy(err);
      });

      f.on("error", () => {
        // Remove the errored file.
        fs.unlinkSync(filePath);
      });

      ctx.params.pipe(f);
    });
    // upload.single('file')
      // return Promise.resolve({
      //   status: 'created',
      // });
    
    // throw new NotFoundError("User Found", "USER_FOUND");
  }

  @Method
  randomName() {
    return "unnamed_" + Date.now() + ".png";
  }
}

broker.createService(FilesService);
broker.start();