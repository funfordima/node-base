const TeachersUseCase = require('../../domain-layer/use-cases/teachers.use-case');

exports.getTeachers = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();

  try {
    if (req?.query?.id) {
      const id = req.query.id;

      const teacher = await teachersUseCase.getOneTeacher(id);

      return res.status(200).send(teacher);
    }
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const teachers = await teachersUseCase.getTeachers();

    return res.status(200).send(teachers);
  } catch (err) {
    return res.status(400).send(err);
  }
};
