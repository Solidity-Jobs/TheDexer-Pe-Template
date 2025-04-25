const { MongoClient } = require("mongodb");
const { NODE_ENV, MONGODB_NAME, MONGODB_URI } = require("../config/index");

let MONGODB = NODE_ENV == "development" ? "mongodb://localhost:27017" : MONGODB_URI;

class DbService {
  static connected = false;

  static async connect() {
    try {
      if (!this.connected) {
        this.client = new MongoClient(MONGODB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        this.client.on("open", () => {
          console.log("Db opened");
          this.connected = true;
        });
        this.client.on("topologyClosed", () => {
          console.log("Db closed");
          this.connected = false;
        });

        this.connection = await this.client.connect();
      }
      return this.connection;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async insert(data, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .insertOne(data)
      .then((result) => {
        return result;
      });
  }

  static async insertAll(data, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .insertMany(data)
      .then((result) => {
        return result;
      });
  }

  static async deleteAll(condition, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .deleteMany(condition)
      .then((result) => {
        return result;
      });
  }

  static async delete(condition, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .deleteOne(condition)
      .then((result) => {
        return result;
      });
  }

  static async updateOne(updateCondition, data, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .updateOne(updateCondition, { $set: data }, { upsert: true })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("Error in updateOne", err);
      });
  }
  static async updateAll(updateCondition, data, collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .updateMany(updateCondition, data, { upsert: true })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("Error in updateAll", err);
      });
  }

  static async close() {
    let dbClose = await this.connection.close();
    this.connection = null;
    return dbClose;
  }

  static async findCount(filters, collection) {
    await this.connect();

    if (!filters) filters = {};
    return (
      this.connection
        .db(MONGODB_NAME)
        .collection(collection)
        .find(filters)
        //.limit(10)
        .sort({ id: -1 })
        .count()
        .then((results) => {
          return results;
        })
        .catch((err) => {
          console.log("Error in find", err);
        })
    );
  }

  static async collectionCount(collection) {
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .count()
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log("Error in find", err);
      });
  }

  static async findLimitSort(filters, collection, limit = 0) {
    await this.connect();

    if (!filters) filters = {};
    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .find(filters)
      .limit(limit)
      .sort({ date: -1 })
      .toArray()
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log("Error in find", err);
      });
  }

  static async find(filters, collection, project = {}, sort) {
    await this.connect();

    if (!filters) filters = {};
    return (
      this.connection
        .db(MONGODB_NAME)
        .collection(collection)
        .find(filters)
        .sort(sort || {})
        .project(project || {})
        //.limit(100)
        .toArray()
        .then((results) => {
          return results;
        })
        .catch((err) => {
          console.log("Error in find", err);
        })
    );
  }
  static async findSelect(filters, collection, project = {}) {
    await this.connect();

    if (!filters) filters = {};
    return (
      this.connection
        .db(MONGODB_NAME)
        .collection(collection)
        .find(filters)
        .project(project)
        //.limit(100)
        .toArray()
        .then((results) => {
          return results;
        })
        .catch((err) => {
          console.log("Error in find", err);
        })
    );
  }

  static async findOne(info, collection, projection) {
    console.log(this.connected, this.connection);
    await this.connect();

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .findOne(info, { projection: projection })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log("Error in getOne", err);
      });
  }
  static async getLastField(filters, sort, collection) {
    await this.connect();

    if (!filters) filters = {};

    return this.connection
      .db(MONGODB_NAME)
      .collection(collection)
      .find(filters)
      .sort(sort)
      .limit(1)
      .toArray()
      .then((results) => {
        return results;
      })
      .catch((err) => {
        console.log("Error in getOne", err);
      });
  }
}

module.exports = { DbService };
