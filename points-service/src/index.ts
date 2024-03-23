import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service, Action, Event, Method} from 'moleculer-decorators';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import DbService from 'moleculer-db';
import NotFoundError from './CustomErrors/NotFoundError';

require('dotenv')
//.config({path: `.env.${process.env.NODE_ENV}`});

const MONGODB_URL = process.env.MONGODB_URL;
const settingsServiceBroker = {
  nodeID: process.env.POINTS_SERVICE_NODE_ID,
  transporter: process.env.TRANSPORTER,
  requestTimeout: 5 * 1000
};

const broker = new ServiceBroker(settingsServiceBroker);

const settingsCreateService = {
  name: "points",
  mixins: [DbService],
  settings: {
    populates: {
      district: {
        action: "districts.get",
        params: {
          fields: ["_id", "name", "description", "rating"]
        }
      }
    },
    fields: [
      "_id",
      "avatar",
      "orgName",
      "codeOfObject",
      "description",
      "address",
      "sim",
      "district",
      "fireSafetyOfficer",
      "employee",
      "paperAct",
      "electronicAct",
      "notes",
      "rating",
      "active",
      "maintain",
      "inTheTrashCan"
    ],
    // entityValidator: {
    //   orgName: "string",
    //   codeOfObject: "number",
    //   description: "string",
    //   address: "string",
    //   sim: "string",
    //   district: {type: Schema.Types.ObjectId, ref: 'Districts'},
    //   fireSafetyOfficer: "string",
    //   employee: "string",
    //   paperAct: "string",
    //   electronicAct: "string",
    //   notes: "array",
    //   rating: "number",
    //   active: "boolean",
    //   maintain: "boolean",
    //   inTheTrashCan: "boolean"
    // }
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: mongoose.model("Point", new mongoose.Schema({
    avatar: {
      type: String,
      default: '/upload/district.png'
    },
    orgName: String,
    codeOfObject: {
      type: String,
      unique: true
    },
    description: String,
    address: String,
    sim: String,
    district: {
      type: Schema.Types.ObjectId,
      ref: 'District'
    },
    fireSafetyOfficer: String,
    employee: String,
    paperAct: String,
    electronicAct: String,
    notes: Array,
    rating: Number,
    active: Boolean,
    maintain: Boolean,
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
class PointsService extends MoleculerService {
}

broker.createService(PointsService);
broker.start();