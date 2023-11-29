const TeacherRepository = require('../../data-layer/teachers.repository');
const Teacher = require('../entities/teachers.entity');

module.exports = class TeachersUseCase {
  async getTeachers() {
    const teacherRepository = new TeacherRepository();

    try {
      const teachersDb = await teacherRepository.getTeachers();
      console.log(teachersDb);
      const teachers = teachersDb.map(
        (teacherItem) => new Teacher(teacherItem),
      );

      return teachers;
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    const teacherRepository = new TeacherRepository();

    try {
      const teacherDb = await teacherRepository.getOneTeacher(id);

      return new Teacher(teacherDb);
    } catch (error) {
      throw error;
    }
  }
};
