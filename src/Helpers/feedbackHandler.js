/* eslint-disable no-unused-vars */
export default class FeedbackHandler {
  static success(data, res, status = 200) {
    res.status(status).json({
      status,
      data,
    });
  }

  static error(err, req, res, next) {
    const { message, status } = err;
    const error = message;
    console.log('ERROR::', error);
    res.status(status).json({
      status,
      error,
    });
  }
}
