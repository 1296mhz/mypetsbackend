import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service} from 'moleculer-decorators';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import DbService from 'moleculer-db';
import populates from './settings/populates';
import fields from './settings/fields';
import NoteModel from './models/Note';
require('dotenv')

const MONGODB_URL = process.env.MONGODB_URL;
const settingsServiceBroker = {
  nodeID: process.env.NOTES_SERVICE_NODE_ID,
  transporter: process.env.TRANSPORTER,
  requestTimeout: 5 * 1000
};

const broker = new ServiceBroker(settingsServiceBroker);

const settingsCreateService = {
  name: "notes",
  mixins: [DbService],
  settings: {
    populates: populates,
    fields: fields,
  },
  adapter: new MongooseAdapter(MONGODB_URL as string),
  model: NoteModel,
};

@Service(settingsCreateService)
class NotesService extends MoleculerService {
}

broker.createService(NotesService);
broker.start();