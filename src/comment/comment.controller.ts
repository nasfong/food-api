import { Request, Response } from 'express';
import Comment from './comment.model';


// GET all comment items
export const readAllData = async (req: Request, res: Response) => {
  try {
    let query = {};

    if (req.query) {
      if (req.query.food) {
        query = { food: req.query.food }; // Case-insensitive search for foodType
      }
    }
    const comment = await Comment
      .find(query)
      .select('-__v')
    return res.status(200).json(comment)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createData = async (req: Request, res: Response) => {
  try {
    const comment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      email: req.body.email,
      star: req.body.star,
      food: req.body.food,
    });
    const newFood = await comment.save();
    res.status(201).json(newFood);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const updateData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (req.body.name !== undefined) {
      comment.name = req.body.name;
    }
    if (req.body.comment !== undefined) {
      comment.comment = req.body.comment;
    }
    if (req.body.email !== undefined) {
      comment.email = req.body.email;
    }
    if (req.body.star !== undefined) {
      comment.star = req.body.star;
    }
    const updatedFood = await comment.save();
    return res.status(200).json({
      status: 200,
      data: updatedFood
    });
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}