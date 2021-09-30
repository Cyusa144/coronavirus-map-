import mongoose from 'mongoose';
import News from '../models/news';
import { uploadToCloudinary, removeFileCloudinary } from '../util/cloudinary';

const getNews = async (req, res) => {
  const news = await News.findById(req.params.id).populate('author');
  if (!news) {
    return res.status(404).json('News with that ID is not found');
  }
  try {
    return res.status(200).json({
      message: 'fetched news',
      data: news,
    });
  } catch (err) {
    return res.status(500).json('Error fetching news');
  }
};

const getAllNews = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'fetched all news',
      data: await News.find({}).populate('author').sort({ _id: -1 }),
    });
  } catch (err) {
    return res.status(500).json('Error fetching all news');
  }
};
const addNews = async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;
  try {
    const newsImage = await uploadToCloudinary(req.file);
    return res.status(201).json({
      message: 'News has been added successfully',
      data: await News.create({
        title,
        content,
        image: newsImage.url,
        author: id,
        favoriteCount: 0,
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding news' });
  }
};

const updateNews = async (req, res) => {
  const { user } = req;
  const { title, content } = req.body;
  const news = await News.findById(req.params.id);
  if (news && String(news.author) !== user.id && user.userType !== 1) {
    return res
      .status(404)
      .json("You don't have permissions to update the news");
  }
  removeFileCloudinary(news.image);
  try {
    const newsImage = await uploadToCloudinary(req.file);
    return res.status(201).json({
      message: 'News has been updated successfully',
      data: await News.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            title,
            content,
            image: newsImage.url || news.image,
          },
        },
        {
          new: true,
        }
      ).populate('author'),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error updating news' });
  }
};

const toggleFavorite = async (req, res) => {
  const { user } = req;

  const news = await News.findById(req.params.id);
  const hasUser = news.favoritedBy.indexOf(user.id);

  try {
    if (hasUser >= 0) {
      return res.status(201).json({
        message: 'Favorite has been removed',
        data: await News.findByIdAndUpdate(
          req.params.id,
          {
            $pull: {
              favoritedBy: mongoose.Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: -1,
            },
          },
          {
            // Set new to true to return the updated doc
            new: true,
          }
        ),
      });
    }
    return res.status(201).json({
      message: 'Favorite has been added',
      data: await News.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        {
          new: true,
        }
      ),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error add favorite to news');
  }
};

const deleteNews = async (req, res) => {
  const { user } = req;
  const news = await News.findById(req.params.id);
  if (news && String(news.author) !== user.id && user.userType !== 1) {
    return res
      .status(404)
      .json("You don't have permissions to delete the news");
  }
  removeFileCloudinary(news.image);
  try {
    return res.status(200).json({
      message: 'news has been deleted successfully',
      data: await news.remove(),
    });
  } catch (err) {
    return res.status(500).json('Error deleting news');
  }
};

export { addNews, updateNews, getNews, getAllNews, deleteNews, toggleFavorite };
