class CustomProjectError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CustomProjectError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CustomProjectError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends CustomProjectError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends CustomProjectError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  CustomProjectError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ConflictError,
};
