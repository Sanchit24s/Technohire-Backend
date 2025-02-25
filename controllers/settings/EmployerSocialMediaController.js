const SocialMediaLinks = require('../../models/settings/EmployerSocialLink')


// ✅ GET: Retrieve social media links
exports.getSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialMediaLinks.findOne({ employerId: req.user.id });

        if (!socialLinks) {
            return res.status(404).json({ msg: "No social links found" });
        }

        res.json(socialLinks);
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error });
    }
};

// ✅ POST: Create social media links
exports.createSocialLinks = async (req, res) => {
    try {
        const { facebook, twitter, instagram, youtube } = req.body;

        let existingLinks = await SocialMediaLinks.findOne({ employerId: req.user.id });

        if (existingLinks) {
            return res.status(400).json({ msg: "Social links already exist. Use PUT to update." });
        }

        const newSocialLinks = new SocialMediaLinks({
            employerId: req.user.id,
            facebook,
            twitter,
            instagram,
            youtube
        });

        await newSocialLinks.save();
        res.status(201).json({ msg: "Social links created successfully", newSocialLinks });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error });
    }
};

// ✅ PUT: Update existing social media links
exports.updateSocialLinks = async (req, res) => {
    try {
        const { facebook, twitter, instagram, youtube } = req.body;

        let socialLinks = await SocialMediaLinks.findOne({ employerId: req.user.id });

        if (!socialLinks) {
            return res.status(404).json({ msg: "No social links found to update" });
        }

        socialLinks.facebook = facebook || socialLinks.facebook;
        socialLinks.twitter = twitter || socialLinks.twitter;
        socialLinks.instagram = instagram || socialLinks.instagram;
        socialLinks.youtube = youtube || socialLinks.youtube;

        await socialLinks.save();
        res.json({ msg: "Social links updated successfully", socialLinks });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error });
    }
};