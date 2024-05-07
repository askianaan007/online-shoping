const sendToken = (user, statusCode, res) => {
  //setting cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //creating JWT token
  const token = user.getJwtToken();
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
