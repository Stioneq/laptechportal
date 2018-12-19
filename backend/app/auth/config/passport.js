const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const config = require('../../../config');
console.log(config.app.auth);
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.app.auth.jwt.secret;


passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    done(null, jwtPayload);
}));


passport.use(new AnonymousStrategy());
