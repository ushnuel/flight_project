import fetch from 'node-fetch';
import FeedbackHandler from '../Helpers/feedbackHandler';

export default class FlightController {
  static search(req, res, next) {
    try {
      const init = {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(req.body),
      };
      fetch('http://www.ije-api.tcore.xyz/v1/flight/search-flight/', init)
        .then((response) => {
          const data = FlightController.checkResponse(response);
          FeedbackHandler.success(data, res, 200);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      next(error);
    }
  }

  static checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}
