import Playdate from '../models/playdateModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all playdates
// @route   GET /api/playdates
// @access  Public

const getPlaydates = asyncHandler(async (req, res) => {
  // return only playdates with _id, firstName, lastName, profilePic, location, pet image
  // with latest date first
  try {
    const playdates = await Playdate.find({})
      .populate('user', 'firstName lastName profilePic')
      .populate('pets', 'image type')
      .select('_id user location pets')
      .sort({ date: -1 });

    // format of response
    const response = playdates.map((playdate) => {
      return {
        _id: playdate._id,
        profilePic: playdate.user.profilePic,
        name: `${playdate.user.firstName} ${playdate.user.lastName}`,
        location: playdate.location,
        image: playdate.pets[0].image[0],
        type: playdate.pets[0].type
      };
    });
    res.json(response);
  } catch (error) {
    res.status(404);
    throw new Error('Playdates not found');
  }
});

// @desc    Fetch all playdates
// @route   GET /api/playdates/:searchTerm
// @access  Public
const searchPlaydates = asyncHandler(async (req, res) => {
  // return only playdates with _id, firstName, lastName, profilePic, location, pet image
  // with latest date first
  try {
    const playdates = await Playdate.find({ location: req.params.searchTerm })
      .populate('user', 'firstName lastName profilePic')
      .populate('pets', 'image type')
      .select('_id user location pets')
      .sort({ date: -1 });

    // format of response
    const response = playdates.map((playdate) => {
      return {
        _id: playdate._id,
        profilePic: playdate.user.profilePic,
        name: `${playdate.user.firstName} ${playdate.user.lastName}`,
        location: playdate.location,
        image: playdate.pets[0].image[0],
        type: playdate.pets[0].type
      };
    });
    res.json(response);
  } catch (error) {
    res.status(404);
    throw new Error('Playdates not found');
  }
});

// @desc    Fetch single playdate by id
// @route   GET /api/playdates/:id
// @access  Public

const getPlaydateById = asyncHandler(async (req, res) => {
  // return only playdates with playdate details, user details, pet details, request user details and request status
  try {
    const playdate = await Playdate.findById(req.params.id)
      .populate('user', 'firstName lastName profilePic address')
      .populate('pets', 'name breed age weight image')
      .populate('requests.user', 'firstName lastName profilePic address')
      .select('requests user pets date time location description');

    // format of response
    const response = {
      _id: playdate._id,
      date: playdate.date,
      time: playdate.time,
      location: playdate.location,
      description: playdate.description,
      user: {
        _id: playdate.user._id,
        profilePic: playdate.user.profilePic,
        name: `${playdate.user.firstName} ${playdate.user.lastName}`,
        country: playdate.user.address.country
      },
      pets: playdate.pets.map((pet) => {
        return {
          _id: pet._id,
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          weight: pet.weight,
          image: pet.image[0]
        };
      }),
      requests: playdate.requests.map((request) => {
        return {
          _id: request._id,
          user: {
            _id: request.user._id,
            profilePic: request.user.profilePic,
            name: `${request.user.firstName} ${request.user.lastName}`,
            country: request.user.address.country
          },
          status: request.status
        };
      })
    };
    res.json(response);
  } catch (error) {
    res.status(404);
    throw new Error('Playdate not found');
  }
});

// @desc    Fetch all playdates by user
// @route   GET /api/playdates/user/:id
// @access  Private

const getPlaydatesByUser = asyncHandler(async (req, res) => {
  try {
    const playdates = await Playdate.find({ user: req.params.id })
      .populate('user', 'firstName lastName profilePic')
      .populate('pets', 'image type')
      .select('_id user location pets')
      .sort({ date: -1 });

    // format of response
    const response = playdates.map((playdate) => {
      return {
        _id: playdate._id,
        profilePic: playdate.user.profilePic,
        name: `${playdate.user.firstName} ${playdate.user.lastName}`,
        location: playdate.location,
        image: playdate.pets[0].image[0],
        type: playdate.pets[0].type
      };
    });
    res.json(response);
  } catch (error) {
    res.status(404);
    throw new Error('Playdates not found');
  }
});

// @desc    Create a playdate
// @route   POST /api/playdates
// @access  Private

const createPlaydate = asyncHandler(async (req, res) => {
  const { date, time, location, description, pets, user } = req.body;
  try {
    const playdate = await Playdate.create({
      date,
      time,
      location,
      description,
      pets,
      user
    });
    res.status(201).json(playdate);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid playdate data');
  }
});

// @desc    Update a playdate
// @route   PATCH /api/playdates/:id
// @access  Private

const updatePlaydate = asyncHandler(async (req, res) => {
  const { date, time, location, description, pets } = req.body;
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      playdate.date = date || playdate.date;
      playdate.time = time || playdate.time;
      playdate.location = location || playdate.location;
      playdate.description = description || playdate.description;
      playdate.pets = pets || playdate.pets;
      const updatedPlaydate = await playdate.save();
      res.json(updatedPlaydate);
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid playdate data');
  }
});

// @desc    Delete a playdate
// @route   DELETE /api/playdates/:id
// @access  Private

const deletePlaydate = asyncHandler(async (req, res) => {
  try {
    const playdate = await Playdate.findByIdAndDelete(req.params.id);
    if (playdate) res.json({ message: 'Playdate removed' });
    else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Create a request
//@route    POST /api/playdates/:id/request
//@access   Private

const createRequest = asyncHandler(async (req, res) => {
  const { user, pets, status, description, contactNo } = req.body;
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      const request = {
        user,
        pets,
        status,
        description,
        contactNo
      };
      playdate.requests.push(request);
      const updatedPlaydate = await playdate.save();
      res.status(201).json(updatedPlaydate);
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

//@desc     Update a request
//@route    PATCH /api/playdates/:id/request/:requestId
//@access   Private

const updateRequest = asyncHandler(async (req, res) => {
  const { user, pets, status, description, contactNo } = req.body;
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      const request = playdate.requests.find(
        (request) => request._id == req.params.requestId
      );
      if (request) {
        request.user = user || request.user;
        request.pets = pets || request.pets;
        request.status = status || request.status;
        request.description = description || request.description;
        request.contactNo = contactNo || request.contactNo;
        const updatedPlaydate = await playdate.save();
        res.json(updatedPlaydate);
      } else {
        res.status(404);
        throw new Error('Request not found');
      }
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

//@desc     Delete a request
//@route    DELETE /api/playdates/:id/request/:requestId
//@access   Private

const deleteRequest = asyncHandler(async (req, res) => {
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      playdate.requests = playdate.requests.filter(
        (request) => request._id != req.params.requestId
      );
      const updatedPlaydate = await playdate.save();
      res.json(updatedPlaydate);
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

const getRequestById = asyncHandler(async (req, res) => {
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      const request = playdate.requests.find(
        (request) => request._id == req.params.requestId
      );
      if (request) {
        res.json(request);
      } else {
        res.status(404);
        throw new Error('Request not found');
      }
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

const getPlaydateByIdFullDetails = asyncHandler(async (req, res) => {
  // return the only request details by request id
  // router.route('/:id/fullRequest/:requestId')

  try {
    const playdate = await Playdate.findById(req.params.id).populate({
      path: 'requests',
      match: { _id: req.params.requestId },
      populate: [
        { path: 'user', select: 'firstName lastName profilePic address' },
        { path: 'pets', select: 'name breed age weight image' }
      ],
      select: '_id user pets status description contactNo'
    });

    if (playdate) {
      const request = playdate.requests.find(
        (request) => request._id == req.params.requestId
      );
      console.log('requestId', req.params.requestId);
      console.log('request', request._id);
      if (request) {
        // format of response
        const response = {
          _id: request._id,
          userId: playdate.user._id,
          user: {
            _id: request.user._id,
            profilePic: request.user.profilePic,
            name: `${request.user.firstName} ${request.user.lastName}`,
            country: request.user.address.country
          },
          pets: request.pets.map((pet) => {
            return {
              _id: pet._id,
              name: pet.name,
              breed: pet.breed,
              age: pet.age,
              weight: pet.weight,
              image: pet.image[0]
            };
          }),
          status: request.status,
          description: request.description,
          contactNo: request.contactNo
        };
        res.json(response);
      } else {
        res.status(404);
        throw new Error('Request not found');
      }
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

const approveRequest = asyncHandler(async (req, res) => {
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      const request = playdate.requests.find(
        (request) => request._id == req.params.requestId
      );
      if (request) {
        request.status = 'Approved';
        const updatedPlaydate = await playdate.save();
        res.json(updatedPlaydate);
      } else {
        res.status(404);
        throw new Error('Request not found');
      }
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

const rejectRequest = asyncHandler(async (req, res) => {
  try {
    const playdate = await Playdate.findById(req.params.id);
    if (playdate) {
      const request = playdate.requests.find(
        (request) => request._id == req.params.requestId
      );
      if (request) {
        request.status = 'Rejected';
        const updatedPlaydate = await playdate.save();
        res.json(updatedPlaydate);
      } else {
        res.status(404);
        throw new Error('Request not found');
      }
    } else {
      res.status(404);
      throw new Error('Playdate not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

export {
  getPlaydates,
  getPlaydateById,
  getPlaydatesByUser,
  createPlaydate,
  updatePlaydate,
  deletePlaydate,
  createRequest,
  updateRequest,
  deleteRequest,
  getRequestById,
  getPlaydateByIdFullDetails,
  approveRequest,
  rejectRequest,
  searchPlaydates
};
