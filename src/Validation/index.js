import ErrorHandler from '../Helpers/errorHandler';

/* eslint-disable camelcase */
export default class Validation {
  static validate(req, res, next) {
    const currentDate = new Date();
    const departureDate = new Date(req.body.departure_date);
    const returnDate = new Date(req.body.return_date);
    console.log('RETURN DATE', returnDate, 'DEPARTURE DATE:', departureDate);
    try {
      if (!req.body) {
        throw new ErrorHandler(422, 'Some fields must not be vacant');
      }
      const {
        departure_city,
        destination_city,
        departure_date,
        no_of_adult,
        no_of_child,
        no_of_infant,
        cabin,
      } = req.body;
      if (departure_city.length > 3) {
        throw new ErrorHandler(422, 'Departure city Input should not be more than 3');
      }
      if (destination_city.length > 3) {
        throw new ErrorHandler(422, 'Destination city Input should not be more than 3');
      }
      if (
        departureDate.getTime() < currentDate.getTime()
        && departure_date > currentDate.setDate(currentDate.getMonth() + 6)
      ) {
        throw new ErrorHandler(
          422,
          'Departure date should not be greater than 6 months from now or less than current date',
        );
      }
      if (returnDate.getTime() < departureDate.getTime()) {
        throw new ErrorHandler(422, 'Invalid return date, should be greater than departure date');
      }
      if (parseInt(no_of_adult, 10) > 9 || parseInt(no_of_adult, 10) < 0) {
        throw new ErrorHandler(422, 'Number of adults should be between 0 and 9');
      }
      if (parseInt(no_of_child, 10) > 9 || parseInt(no_of_child, 10) < 0) {
        throw new ErrorHandler(422, 'Number of children should be between 0 and 9');
      }
      if (parseInt(no_of_infant, 10) > 9 || parseInt(no_of_infant, 10) < 0) {
        throw new ErrorHandler(422, 'Number of infants should be between 0 and 9');
      }
      if (cabin.length <= 0) {
        throw new ErrorHandler(422, 'Choose a cabin to continue');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
