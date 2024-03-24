import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service} from 'moleculer-decorators';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import DistrictModel from './models/District';
import fields from './settings/fields';
import entityValidator from './settings/entityValidator';
import DbService from 'moleculer-db';
require('dotenv')

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
    fields: fields,
    entityValidator: entityValidator
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: DistrictModel,
};

@Service(settingsCreateService)
class DistrictsService extends MoleculerService {
}

broker.createService(DistrictsService);
broker.start();