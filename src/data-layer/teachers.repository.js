const knex = require('../config/knex-config');

const TEACHERS_TABLE = 'teachers';

module.exports = class TeachersRepository {
  async getTeachers() {
    try {
      console.log(1);
      const teachers = await knex(TEACHERS_TABLE)
        .leftOuterJoin('subjects', 'teachers.subject_id', '=', 'subjects.id')
        .select(
          'teachers.name as teacher_name',
          'teachers.id',
          'teachers.is_union_member',
          'teachers.work_experience',
          'subjects.name as subject_name',
        );
      console.log(teachers);

      if (!teachers.length) {
        throw 'Teachers list is empty';
      }

      return teachers;
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    try {
      const teacher = await knex(TEACHERS_TABLE)
        .innerJoin('subjects', 'teachers.subject_id', 'subjects.id')
        .select(
          'teachers.name as teacher_name',
          'teachers.id',
          'teachers.is_union_member',
          'teachers.work_experience',
          'subjects.name as subject_name',
        )
        .where({ 'teachers.id': id });

      if (!teacher[0]) {
        throw 'Teacher not found';
      }

      return teacher[0];
    } catch (error) {
      throw error;
    }
  }
};
