import Comment from '../models/comment';

const getAllCommentsToNews = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'fetched all comments',
      data: await Comment.find({ news: req.params.newsId }).populate('user'),
    });
  } catch (err) {
    return res.status(500).json('Error fetching all comments');
  }
};

const postCommentToNews = async (req, res) => {
  const { id } = req.user;
  const { comment } = req.body;
  try {
    return res.status(201).json({
      message: 'Comment has been added successfully',
      data: await Comment.create({
        comment,
        user: id,
        news: req.params.newsId,
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding Comment' });
  }
};

export { getAllCommentsToNews, postCommentToNews };
