import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/db/TasksCollection';
import { Accounts } from 'meteor/accounts-base';
import {ServiceConfiguration} from "meteor/service-configuration"
import '../imports/api/tasksMethode';
import '../imports/api/tasksPublication'

const insertTask = taskText => {
  console.log({ taskText });
  return TasksCollection.insert({ text: taskText })
}


// create now collection in our database
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask)
  }
})

// create user credential 
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  
});

// create github credential to login with github account 

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'insert your clientId here', // insert your clientId here
      secret: ' insert your secret here', // insert your secret here
    },
  }
);