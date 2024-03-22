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
      // avatar: "string",
      name: "string",
      inTheTrashCan: "boolean",
      rating: "number",
      description: "string",
    }
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: mongoose.model("District", new mongoose.Schema({
    name: String,
    avatar: {
      type: String,
      default: '/uploads/district.png'
    },
    rating: {
      type: Number,
      default: 0
    },
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