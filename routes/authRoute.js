const router = require("express").Router();

const { login, me } = require("../controllers/auth");

router.post("/api/v1/user/login", login);
router.get("/api/v1/user/me", me);

module.exports = router;
