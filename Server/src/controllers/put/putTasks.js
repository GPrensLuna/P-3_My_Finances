import Tasks from '../../models/Tasks.js';

export const update = async (req, res) => {
  try {
    let id = req.profile;
    req.body = { ...req.body, done: Date.now() };
    await User.findByIdAndUpdate(id._id, { $set: req.body }, { new: true });
    res
      .status(200)
      .json({ message: "the profile has been updated successfuly!" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
