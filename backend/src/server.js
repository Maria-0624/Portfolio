import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("EMAIL_USER:", process.env.EMAIL_USER || "MISSING");

console.log(
  "EMAIL_APP_PASSWORD:",
  process.env.EMAIL_APP_PASSWORD ? "LOADED" : "MISSING"
);

console.log(
  "CONTACT_RECEIVER:",
  process.env.CONTACT_RECEIVER || "MISSING"
);

const app = express();

const PORT = Number(process.env.PORT || 5000);

const allowedOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://maria-ansari-portfolio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50kb" }));


/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
  });
});


/*
|--------------------------------------------------------------------------
| Contact Form
|--------------------------------------------------------------------------
*/

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body ?? {};

    const cleanName =
      typeof name === "string" ? name.trim() : "";

    const cleanEmail =
      typeof email === "string" ? email.trim() : "";

    const cleanSubject =
      typeof subject === "string" ? subject.trim() : "";

    const cleanMessage =
      typeof message === "string" ? message.trim() : "";


    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, subject and message are required.",
      });
    }


    if (
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 200 ||
      cleanMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields are too long.",
      });
    }


    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!emailIsValid) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }


    /*
    |--------------------------------------------------------------------------
    | Environment Variables
    |--------------------------------------------------------------------------
    */

    const {
      EMAIL_USER,
      EMAIL_APP_PASSWORD,
      CONTACT_RECEIVER,
    } = process.env;

    if (
      !EMAIL_USER ||
      !EMAIL_APP_PASSWORD ||
      !CONTACT_RECEIVER
    ) {
      console.error(
        "Missing email environment variables."
      );

      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }


    /*
    |--------------------------------------------------------------------------
    | Gmail Transporter
    |--------------------------------------------------------------------------
    */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD,
  },
});

    /*
    |--------------------------------------------------------------------------
    | Send Email
    |--------------------------------------------------------------------------
    */

    await transporter.sendMail({

      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,

      to: CONTACT_RECEIVER,

      replyTo: cleanEmail,

      subject: `[Portfolio] ${cleanSubject}`,

      text: [
        "New message from your portfolio",
        "",
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Subject: ${cleanSubject}`,
        "",
        "Message:",
        cleanMessage,
      ].join("\n"),

      html: `
        <h2>New message from your portfolio</h2>

        <p>
          <strong>Name:</strong>
          ${escapeHtml(cleanName)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(cleanEmail)}
        </p>

        <p>
          <strong>Subject:</strong>
          ${escapeHtml(cleanSubject)}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${escapeHtml(cleanMessage).replace(
            /\n/g,
            "<br />"
          )}
        </p>
      `,
    });


    /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

    return res.json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {

    console.error(
      "Contact email error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to send your message. Please try again.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| Escape HTML
|--------------------------------------------------------------------------
*/

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(
    `Portfolio API running at http://localhost:${PORT}`
  );
});