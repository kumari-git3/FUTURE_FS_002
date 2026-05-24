const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const nodemailer =
require("nodemailer");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


// MongoDB Connection

mongoose.connect(
  process.env.MONGO_URI
)

.then(()=>{

  console.log(
    "MongoDB Connected"
  );
});


// Routes

const leadRoutes =
require("./routes/leadRoutes");

app.use("/api/leads",
leadRoutes);


// Email Notification

app.post("/send-email",
async(req,res)=>{

  const transporter =
  nodemailer.createTransport({

    service:"gmail",

    auth:{

      user:
      process.env.EMAIL_USER,

      pass:
      process.env.EMAIL_PASS
    }
  });

  const mailOptions = {

    from:
    process.env.EMAIL_USER,

    to:req.body.email,

    subject:"Lead Created",

    text:"Your lead has been added successfully."
  };

  await transporter.sendMail(
    mailOptions
  );

  res.json({
    message:"Email Sent"
  });
});


// Start Server

app.listen(5000, ()=>{

  console.log(
    "Server Running On Port 5000"
  );
});