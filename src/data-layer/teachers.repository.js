const knex = require('../config/knex-config');

const TEACHERS_TABLE = 'teachers';

module.exports = class TeachersRepository {
  async getTeachers() {
    try {
      const teachers = await knex(TEACHERS_TABLE)
        .leftOuterJoin('subjects', 'teachers.subject_id', '=', 'subjects.id')
        .select(
          'teachers.name as teacher_name',
          'teachers.id',
          'teachers.is_union_member',
          'teachers.work_experience',
          'subjects.name as subject_name',
        );

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

  async addTeacher(fieldDto) {
    const trx = await knex.transaction({ isolation: 'repeatable read' });

    try {
      const result = await knex(TEACHERS_TABLE)
        .transacting(trx)
        .insert(fieldDto)
        .returning('id');
      await trx.commit();

      return result;
    } catch (error) {
      await trx.rollback();

      throw 'Atomic error' + error;
    }
  }
};
