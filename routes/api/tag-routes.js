const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// return all tags along w/ product info
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({include: Product, ProductTag});
    // send user data
    res.status(200).json(tagData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

// find tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {include: Product, ProductTag});
    // send response to user with data
    res.status(200).json(tagData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

// create new tag
router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create({tag_name: req.params.tag_name});
      res.status(200).json(newTag);
    }
    catch (error) {
      res.status(400).json(error);
    }
});

// update tag using ID
router.put('/:id', async (req, res) => {
  try {
    // attempt to update database
    const updateTag = await Tag.update(req.body, {where: {id: req.params.id}});
    // if no data returned, it failed, display error message
    if(updateTag.length === 0) {
      res.status(404).json({ error: 'Invalid tag ID! Could not update.' });
    }
    // else send back success message
    res.status(200).json(updateTag);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

// delete tag by its id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({where: {id: req.params.id,}});
    // send response to user with data
    res.status(200).json(tagData);
  }
  catch(error) {
    // send error response
    res.status(500).json(error);
  }
});

module.exports = router;
