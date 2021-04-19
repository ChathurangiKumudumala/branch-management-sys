const router = require("express").Router();
let Branch = require("../models/Branch");

//Create branches
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const telephone = Number(req.body.telephone);
    const email = req.body.email;

    const newBranch = new Branch({
        name,
        address,
        telephone,
        email
    })

    newBranch.save().then(() => {
        res.json("Branch Added")
    }).catch((error) => {
        console.log(error);
    })
})

//Read all
router.route("/"). get((req, res) => {

    Branch.find().then((branches) =>{
        res.json(branches)
    }).catch((error) => {
        console.log(error);
    })
})

//Update
router.route("/update/:id").put(async(req, res) =>{
    let branchId = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const telephone = Number(req.body.telephone);
    const email = req.body.email;

    const updateBranch = {
        name,
        address,
        telephone,
        email
    }

    const update = await Branch.findByIdAndUpdate(branchId, updateBranch).then(() =>{
        res.status(200).send({status:"Branch Updated"})
    }).catch((error) => {
        console.log(error);
        res.status(500).send({status:"Error with updating data!"});
    })   
})

//Delete branch
router.route("/delete/:id").delete(async (req, res) => {
    let branchId = req.params.id;

    await Branch.findByIdAndDelete(branchId).then(() => {
        res.status(200).send({status:"Branch deleted"});
    }).catch((error) => {
        console.log(error);
        res.status(500).send({status:"Error with deleting branch!"});
    })
})

//read data only one branch
router.route("/get/:id").get(async (req, res) => {
    let branchId = req.params.id;

    const onebranch = await Branch.findById(branchId).then((branch) => {
        res.status(200).send({status:"Branch fetched", branch})
    }).catch(() => {
        console.log(err);
        res.status(500).send({status:"Error with get branch!"});
    })
})


module.exports = router;