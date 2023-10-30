const express = require("express");
require("./config/db/db");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const range = require("range-parser");

const instructorRoutes = require("./routes/instructorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const Student = require("./models/student");
const { courseEnroll } = require("./controllers/Course/courseEnroll");
const studentAuthMiddleware = require("./middleware/studentAuthMiddleware");
const Payment = require("./models/payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.get("/success", (req, res) => {
  res.json({ message: "Success" });
});

let endpointSecret = process.env.END_POINT_SECRET;

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      // console.log(event)
    } catch (err) {
      // console.log(err)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded);
        const metadata = paymentIntentSucceeded.metadata;
        const studentId = metadata.studentId;
        const courseId = metadata.courseId;
        const student = await Student.findById(studentId);
        student.enrolled.push({
          id: courseId,
          progress: {
            section: 0,
            videoNumber: 0,
          },
        });

        await student.save();
        const newPayment = new Payment({
          student: studentId,
          course: courseId,
          paymentDetails: {
            checkoutSession: paymentIntentSucceeded.id,
            price: paymentIntentSucceeded.amount,
          },
        });

        await newPayment.save();
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  }),
);

app.use("/api", instructorRoutes);
app.use("/api", studentRoutes);
app.use("/api", otpRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/api", paymentRoutes);

app.post("/api/create-checkout-session", studentAuthMiddleware, courseEnroll);

app.use("/api/course/uploads", express.static("uploads"));

module.exports = app;
