import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

//route to test indexes
//services index
//http://localhost:9120/api/v1/util
router.route("/").get(async (req, res) => {
    //get users
    await User.aggregate([
        {
            $match: {
                //services: {$exists: true},
                //firstName: "Dekomori",
                'services.petTypes': {$in: ["Dogs", "Cats"]},
            },
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                services: 1,
            },
        },
    ])
        .hint({ _id: 1, firstName: 1, lastName: 1, services: 1 })
        .explain()
        .then((users) => res.json(users))
        .catch((err) => res.json("Error: " + err));
});

export default router;