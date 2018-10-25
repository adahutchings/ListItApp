const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {

    signUp(req, res, next){
        res.render("users/sign_up");
    },

    create(req, res, next){

        let newUser = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        userQueries.createUser(newUser, (err, user) => {
            if(err){
                console.log(err);
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/");
                })
            }
        });
    },

    signInForm(req, res, next){
        res.render("users/sign_in");
    },

    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function() {
            if(!req.user){
                req.flash("notice", "Sign in failed. Please try again")
                res.redirect("/users/sign_in");
            } else {
                res.redirect("/");
            }
        })
    },

    signOut(req, res, next) {
        req.logout();
        res.redirect("/");
    },

}