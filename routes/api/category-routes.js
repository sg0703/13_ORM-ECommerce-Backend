const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// return all categories and assoc. product(s)
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    // send user data
    res.status(200).json(catData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

// find category by id
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // send response to user with data
    res.status(200).json(catData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

// create new category
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create({
      name: req.body.name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // attempt to update database
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    // if no data returned, it failed, display error message
    if(updateCat.length === 0) {
      res.status(404).json({ error: 'Invalid category ID! Could not update.' });
    }
    // else send back success message
    res.status(200).json(updateCat);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    // send response to user with data
    res.status(200).json(catData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

module.exports = router;
