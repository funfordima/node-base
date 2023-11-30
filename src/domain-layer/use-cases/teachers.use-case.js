const TeacherRepository = require('../../data-layer/teachers.repository');
const Teacher = require('../entities/teachers.entity');

module.exports = class TeachersUseCase {
  mapFields = {
    id: 'id',
    name: 'name',
    work_experience: 'work_experience',
    phone_number: 'phone_number',
    subject_id: 'subject_id',
    is_union_member: 'is_union_member',
  };

  async getTeachers() {
    const teacherRepository = new TeacherRepository();

    try {
      const teachersDb = await teacherRepository.getTeachers();
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

  async addTeacher(data) {
    const teacherRepository = new TeacherRepository();
    const fields = data?.fields;

    if (!Array.isArray(fields) || !fields?.length) {
      throw 'There is no data for update';
    }

    const isStringChecked = this.checkStringFieldInsert(fields);

    if (!isStringChecked) {
      throw 'Wrong fields received';
    }

    try {
      const teacherId = await teacherRepository.addTeacher(
        this.mapToFieldsDto(fields),
      );

      return teacherId;
    } catch (error) {
      throw error;
    }
  }

  async removeTeacher(id) {
    const teacherRepository = new TeacherRepository();

    try {
      const result = await teacherRepository.removeOneTeacher(id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(data) {
    const teacherRepository = new TeacherRepository();
    const fields = data?.fields;

    if (!Array.isArray(fields) || !fields?.length) {
      throw 'Fields is not defined';
    }

    const itemId = fields.find((item) => item.id)?.id;

    if (!itemId) {
      throw "Filed 'id' is not defined";
    }

    const isStringChecked = this.checkStringFieldInsert(fields);

    if (!isStringChecked) {
      throw 'Wrong fields received';
    }

    try {
      const result = await teacherRepository.updateOneTeacher(
        itemId,
        this.mapToFieldsDto(fields),
      );
      const updatedTeacher = new Teacher(result);

      return updatedTeacher;
    } catch (error) {
      throw error;
    }
  }

  checkStringFieldInsert(fields) {
    const keys = fields.map((field) => Object.entries(field)[0][0]);

    return keys.every((key) => key in this.mapFields);
  }

  mapToFieldsDto(fields) {
    return fields.reduce((acc, el) => {
      const entriesEl = Object.entries(el);
      acc[entriesEl[0][0]] = entriesEl[0][1];

      return acc;
    }, {});
  }
};
