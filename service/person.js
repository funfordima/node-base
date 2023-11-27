const personDAO = require('../dao/person');

class PersonService {
  createPerson(personDTO) {
    const { firstName, lastName, email } = personDTO;
    
    return personDAO.createPerson(firstName, lastName, email);
  }
}

module.exports = new PersonService();
