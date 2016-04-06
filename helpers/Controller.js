import express from 'express';

export class Controller {
  constructor(basePath) {
    this.prvBase = basePath;
    this.prvRouter = express.Router();
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  getPrefix() {
    return this.prefix;
  }

  render(response, data) {
    response.json(viewPath, data);
  }

  get basePath() {
    return this.prvBase;
  }

  get router() {
    return this.prvRouter;
  }
}
