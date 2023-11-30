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

exports.addTeacher = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();

  try {
    const data = req.body;

    if (data) {
      const teacherId = await teachersUseCase.addTeacher(data);

      return res.status(200).send(teacherId);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.removeTeacher = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();

  if (req?.query?.id) {
    const id = req.query.id;

    try {
      const teacherId = await teachersUseCase.removeTeacher(id);

      return res.status(200).send(teacherId);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

exports.updateTeacher = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();
  const data = req.body;

  if (data) {
    try {
      const teacher = await teachersUseCase.updateTeacher(data);

      return res.status(200).send(teacher);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
