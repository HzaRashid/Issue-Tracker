var Redis = require('redis')
const User = require('../models/User')
const Project = require('../models/Project')
const Sprint = require('../models/Sprint')
const Issue = require('../models/Issue')

const RedisClient = Redis.createClient({  
    url: process.env.REDIS_URL
  });
  
  RedisClient.on('error', err => console.log('Redis Client Error', err));
  RedisClient.on('connect', () => console.log('connected to redis'))
  RedisClient.connect()
  RedisClient.ping('')


const watchActions = ['create', 'delete', 'drop', 'update']

  User.watch()
  .on('change', async (data) => {
    try {
      if (watchActions.includes(data.operationType)) {
        console.log('User doc was updated')
        const Users = await User.find({})
        RedisClient.set("User", JSON.stringify(Users))
        }
    } catch (error) {
      console.log(error)
    }
  })

  Issue.watch()
  .on('change', async (data) => {
    try {
      if (watchActions.includes(data.operationType)) {
        console.log('Issue doc was updated')
        const Issues = await Issue.find({}).lean()
        const IssuesTable = Issue.find({}).lean().populate('assignedTo', 'firstName lastName').populate('project', 'title').lean();
        RedisClient.set("Issue", JSON.stringify(Issues))
        RedisClient.set("IssuesTable", JSON.stringify(IssuesTable))
        }
    } catch (error) {
      console.log(error)
    }
  })

  Project.watch()
  .on('change', async (data) => {
    try {
      if (watchActions.includes(data.operationType)) {
        console.log('Project doc was updated')
        const Projects = await Project.find({})
        RedisClient.set("Project", JSON.stringify(Projects))
        }
    } catch (error) {
      console.log(error)
    }
  })


  Sprint.watch()
  .on('change', async (data) => {
    try {
      if (watchActions.includes(data.operationType)) {
        console.log('Sprint doc was updated')
        const Sprints = await Sprint.find({})
        RedisClient.set("Sprint", JSON.stringify(Sprints))
        }
    } catch (error) {
      console.log(error)
    }
  })

  
module.exports = { RedisClient }