const express = require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const jobRoute = require("./routes/jobRoute");
const termConditionRoute = require("./routes/termConditionRoute");
const companyRoute = require("./routes/companyRoute");
const authRoutes = require("./routes/authRoute.js");
const profileRoute = require("./routes/profileRoute.js");
const jobPreferenceRoute = require("./routes/jobPreferenceRoute.js");
const skillsExperienceRoute = require("./routes/skillsExperienceRoute.js");
const applicationRoute = require("./routes/applicationRoute.js");
const app = express();

app.use(express.json());

connectDB();

app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoute);
app.use("/job-preferences", jobPreferenceRoute);
app.use("/skills-experience", skillsExperienceRoute);

// routes
app.use("/job", jobRoute);
app.use("/terms", termConditionRoute);
app.use("/company", companyRoute);
app.use("/application", applicationRoute);

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});

//settings
app.use('/settings/user', require('./routes/settings/userSettingsRoutes.js'));
app.use('/settings/employer', require('./routes/settings/employerSettingsRoutes.js'));
app.use('/settings/app-preferences', require('./routes/settings/appPreferencesRoutes.js'));
app.use('/settings/notification-settings', require('./routes/settings/notificationSettingsRoutes.js'));
app.use('/settings/sign-in-security', require('./routes/settings/signInSecurityRoutes.js'));
app.use('/settings/change-password', require('./routes/settings/changePasswordRoutes.js'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});
