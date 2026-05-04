import Task from '../models/Task.js';

const allowedStatuses = ['pending', 'completed'];
const allowedPriorities = ['low', 'medium', 'high'];

const findUserTask = (taskId, userId) => Task.findOne({ _id: taskId, user: userId });

export const getTasks = async (req, res, next) => {
  try {
    const query = { user: req.user._id };

    if (allowedStatuses.includes(req.query.status)) {
      query.status = req.query.status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const title = req.body.title?.trim();

    if (!title) {
      res.status(400);
      throw new Error('Task title is required');
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description: req.body.description?.trim() || '',
      status: allowedStatuses.includes(req.body.status) ? req.body.status : 'pending',
      priority: allowedPriorities.includes(req.body.priority) ? req.body.priority : 'medium',
      dueDate: req.body.dueDate || undefined
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await findUserTask(req.params.id, req.user._id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (req.body.title !== undefined) {
      const title = req.body.title.trim();
      if (!title) {
        res.status(400);
        throw new Error('Task title is required');
      }
      task.title = title;
    }

    if (req.body.description !== undefined) {
      task.description = req.body.description.trim();
    }

    if (allowedStatuses.includes(req.body.status)) {
      task.status = req.body.status;
    }

    if (allowedPriorities.includes(req.body.priority)) {
      task.priority = req.body.priority;
    }

    if (req.body.dueDate !== undefined) {
      task.dueDate = req.body.dueDate || undefined;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
