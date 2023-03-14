var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

var { User, Profile } = require('../models');

var config = require('./oauth.js');

module.exports =
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(clientID, clientSecret, callbackURL);
            console.log('PROFILE: ', profile);
            User.findOne({ oauthID: profile.id }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                if (!err && user !== null) {
                    done(null, user)
                } else {
                    //add same parameters definted in the model User.js
                    user = new User({
                        oauthID: profile.id,
                        name: profile.displayName
                    });
                    user.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Saving user...");
                            done(null, user)
                        }
                    })
                }
            })
        }
    ));
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('PROFILE!: ', profile);
        User.findOne({ oauthID: profile.id }, function (err, user) {
            console.log("USER!: ", user);
            if (err) {
                console.log(err)
            }
            if (!err && user !== null) {
                done(null, user)
            } else {
                // add parameters of user model
                user = new User({
                    oauthID: profile.id,
                    firstname: "test",
                    lastname: "test",
                    username: profile.displayName
                })
                user.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Saving user...");
                        done(null, user)
                    }
                })
            }
        })
    }
    ));