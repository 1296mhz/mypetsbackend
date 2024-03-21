import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service, Action, Event, Method} from 'moleculer-decorators';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import mongoose from 'mongoose';
import DbService from 'moleculer-db';
import NotFoundError from './CustomErrors/NotFoundError';
require('dotenv')
//.config({path: `.env.${process.env.NODE_ENV}`});

const MONGODB_URL = process.env.MONGODB_URL;
const settingsServiceBroker = {
  nodeID: process.env.DISTRICTS_SERVICE_NODE_ID,
  transporter: process.env.TRANSPORTER,
  requestTimeout: 5 * 1000
};

const broker = new ServiceBroker(settingsServiceBroker);

const settingsCreateService = {
  name: "districts",
  mixins: [DbService],
  settings: {
    fields: ["_id", "name", "avatar", "rating", "description", "inTheTrashCan"],
    entityValidator: {
      name: "string",
      avatar: "string",
      inTheTrashCan: "boolean",
      rating: "number",
      description: "string",
    }
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: mongoose.model("District", new mongoose.Schema({
    name: String,
    avatar: String,
    rating: Number,
    description: String,
    inTheTrashCan: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })),
};

@Service(settingsCreateService)
class DistrictsService extends MoleculerService {
  // @Action()
  // async setup(ctx: any) {
  //   const user: any = await ctx.call("users.find", {fields: ['email'], query: {email: 'admin@setup'}});
  //   if (!user.length) {
  //     const message = await ctx.call("users.create", {
  //       email: 'admin@setup',
  //       firstName: 'Admin',
  //       lastName: 'Admin',
  //       middleName: 'Admin',
  //       password: '1234567'
  //     });
  //     return Promise.resolve({
  //       status: 'created',
  //       message: message
  //     });
  //   }
  //   throw new NotFoundError("User Found", "USER_FOUND");
  // }
  // @Action()
  // async login(ctx: any) {
  //   const user: any = await ctx.call("users.find", {fields: ['email', 'password', 'lastName', 'firstName', 'middleName'], query: {email: ctx.params.email}});
  //   //const [res, metadata] = await this.adapter.db.query(`SELECT * FROM users WHERE email = '${ctx.params.email}' LIMIT 1`)
  //   if (user.length) {
  //     const password = await hashPassword(ctx.params.password);

  //     const validPassword = await validatePassword(ctx.params.password, password);
  //     if (!validPassword) return new Error('Password is not correct');
  //     const generateAccessToken = await broker.call('jwtaccesstoken.generateAccessToken', 
  //     {
  //       id: user[0].id,
  //       email: user[0].email,
  //       firstName: user[0].firstName,
  //       lastName: user[0].lastName,
  //       middleName: user[0].middleName,
  //     }, {});
  //     return Promise.resolve(generateAccessToken)
  //   }
  //   throw new NotFoundError("User not found", "USER_NOT_FOUND");
  // }

  // @Action()
  // async register(ctx: any) {
  //   const password = await hashPassword(ctx.params.password);
  //   const newUser = {
  //     email: ctx.params.email,
  //     password: password,
  //     firstName: ctx.params.firstName,
  //     lastName: ctx.params.lastName,
  //     middleName: ctx.params.middleName
  //   }
  //   // const [res, metadata] = await this.adapter.db.query(`SELECT email FROM users WHERE email = '${ctx.params.email}' LIMIT 1`)
  //   const user: any = await ctx.call("users.find", {fields: ['email'], query: {email: ctx.params.email}});
  //   interface INewUser {
  //     id: number,
  //     email: string,
  //     password: string,
  //     firstName: string,
  //     lastName: string,
  //     middleName: string
  //   }
  //   let result: any = null;

  //   if (!user.length) {
  //     const _newUser: INewUser = await broker.call("users.create", newUser);
  //     ctx.meta.$statusCode = 201;
  //     return Promise.resolve({
  //       message: 'User created',
  //       code: 201,
  //       type: 'USER_CREATED',
  //       data: _newUser,
  //     })
  //   }

  //   if (user.length) {
  //     ctx.meta.$statusCode = 409;
  //     return Promise.resolve({
  //       message: 'User exist',
  //       code: 409,
  //       type: 'USER_EXIST',
  //       data: {},
  //     })
  //   }
  // }

  // @Action()
  // async getAll(ctx: any) {
  //   try {
  //     const users = await broker.call("users.find");
  //     return Promise.resolve(users);
  //   } catch (err) {
  //     ctx.meta.$statusCode = 500;
  //     return Promise.reject(err);
  //   }
  // }

  // @Action()
  // hello(ctx: any) {
  //   console.log(ctx)
  //   ctx.meta.$statusCode = 409;
  //   return Promise.resolve("Hello");
  // }

  started() { // Reserved for moleculer, fired when started
    console.log("Started!")
  }

  created() { // Reserved for moleculer, fired when created
    console.log("Created")
  }

  stopped() { // Reserved for moleculer, fired when stopped
    console.log("Stopped")
  }
}

broker.createService(DistrictsService);
broker.start();