const express = require("express");

const router = express.Router();

const Lead =
require("../models/Lead");


// GET ALL LEADS

router.get("/", async(req,res)=>{

  const leads =
  await Lead.find();

  res.json(leads);
});


// ADD LEAD

router.post("/", async(req,res)=>{

  const lead =
  new Lead(req.body);

  await lead.save();

  res.json(lead);
});


// DELETE LEAD

router.delete("/:id",
async(req,res)=>{

  await Lead.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Deleted"
  });
});


// UPDATE LEAD

router.put("/:id",
async(req,res)=>{

  const updatedLead =
  await Lead.findByIdAndUpdate(

    req.params.id,

    req.body,

    {new:true}
  );

  res.json(updatedLead);
});

module.exports = router;