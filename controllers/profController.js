const User = require('../models/User');
const Note = require('../models/Note')

// eslint-disable-next-line require-jsdoc
class ProfController {
  // eslint-disable-next-line require-jsdoc
  async getProfileInfo(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findOne({_id: id});
      if (!user) {
        res.status(404).json('Not found');
      }
      const {_id, username, createdDate} = user;
      const modifiedUser = {
        user: {_id, username, createdDate},
      };
      res.status(200).json(modifiedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'GET profile error'});
    }
  }

  // eslint-disable-next-line require-jsdoc
  async deleteProfile(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findOne({_id: id});
      if (!user) {
        res.status(404).json('Not found');
      }
      await User.deleteOne({_id: id})
      await Note.deleteMany({userId: id})
      res.json({message: 'Success'})
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'ProfileController Error'});
    }
  }

  // eslint-disable-next-line require-jsdoc
  async changePassword(req, res) {
    try {
      // const id = req.user.id
      // const user = await User.findOne({_id: id})
      // if (!user) {
      //     res.status(404).json('Not found')
      // }
      // const {oldPassword, newPassword} = req.body
      // const validPassword = bcrypt.compare(oldPassword, user.password)
      // if (!validPassword) {
      //     res.status('400').json({message: 'Password is not correct'})
      // }

      res.json({message: 'Success'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'ProfileController Error'});
    }
  }
}

module.exports = new ProfController();
