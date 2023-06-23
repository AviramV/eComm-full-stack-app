exports.isMyData = (req, res, next) => {
  const { id } = req.params;
  if (req.user.id != id)
    return res.status(403).send("Can only change your own data");
  next();
};
