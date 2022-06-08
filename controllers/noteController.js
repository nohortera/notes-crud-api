const Note = require('../models/Note');
// const User = require('../models/User');

// eslint-disable-next-line require-jsdoc
class NoteController {
  // eslint-disable-next-line require-jsdoc
  async getNotes(req, res) {
    try {
      const userId = req.user.id;
      // const user = await User.findOne({_id: userId})
      // if (!user) {
      // eslint-disable-next-line max-len
      //     res.status(500).json({message: 'Server error. PLease, login again'})
      // }
      const {offset = 0, limit = 0} = req.query;
      const notes = await Note.find({userId}).skip(offset).limit(limit);
      const count = await Note.countDocuments({userId});
      res.json({offset, limit, count, notes});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }


  // eslint-disable-next-line require-jsdoc
  async addNote(req, res) {
    try {
      const userId = req.user.id;
      // const user = await User.findOne({_id: userId})
      // if (!user) {
      // eslint-disable-next-line max-len
      //     res.status(500).json({message: 'Server error. PLease, login again'})
      // }
      const text = req.body.text;
      const note = new Note({userId, text});
      await note.save();
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }


  // eslint-disable-next-line require-jsdoc
  async getNote(req, res) {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      const note = await Note.findOne({userId, _id: noteId});
      if (!note) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `Note with id '${noteId}' was not found`});
      }
      res.json({note});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }


  // eslint-disable-next-line require-jsdoc
  async updateNote(req, res) {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      const text = req.body.text;
      if (!await Note.findOne({userId, _id: noteId})) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `Note with id '${noteId}' was not found`});
      }
      try {
        await Note.updateOne({userId, _id: noteId}, {$set: {text}});
      } catch (e) {
        res.status(500).json({message: 'Server error'});
      }
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }


  // eslint-disable-next-line require-jsdoc
  async changeFlag(req, res) {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      const note = await Note.findOne({userId, _id: noteId});
      if (!note) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `Note with id '${noteId}' was not found`});
      }
      try {
        // eslint-disable-next-line max-len
        await Note.updateOne({userId, _id: noteId}, {completed: !note.completed});
      } catch (e) {
        res.status(500).json({message: 'Server error'});
      }
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }


  // eslint-disable-next-line require-jsdoc
  async deleteNote(req, res) {
    try {
      const userId = req.user.id;
      const noteId = req.params.id;
      if (!await Note.findOne({userId, _id: noteId})) {
        // eslint-disable-next-line max-len
        res.status(400).json({message: `Note with id '${noteId}' was not found`});
      }
      try {
        await Note.deleteOne({userId, _id: noteId});
      } catch (e) {
        res.status(500).json({message: 'Server error'});
      }
      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'NoteController error'});
    }
  }
}

module.exports = new NoteController();
