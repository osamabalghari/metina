/***
*
*   TESTS
*   Test the API endpoints of your application
*   For full browser integration tests, use Firelab by Gravity
*   https://firelab.io
*
**********/

function importTest(name, path) {

  describe(name, () => { require(path) });

}

describe('Starting Tests', function () {

  beforeEach(function () {

    // silence console during tests
    console.log = function (){};

  });

  importTest('Testing account', './account');
  importTest('Testing user', './user');
  importTest('Testing feedback', './feedback');
  importTest('Testing API keys', './key');
  importTest('Testing event', './event');
  importTest('Cleaning up', './cleanup');

  after(() => {

    delete console.log

  });
});
