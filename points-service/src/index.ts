import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service} from 'moleculer-decorators';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import DbService from 'moleculer-db';
import populates from './settings/populates';
import fields from './settings/fields';
import PointModel from './models/Point';
require('dotenv')

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
    populates: populates,
    fields: fields,
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: PointModel,
};

@Service(settingsCreateService)
class PointsService extends MoleculerService {
}

broker.createService(PointsService);
broker.start();