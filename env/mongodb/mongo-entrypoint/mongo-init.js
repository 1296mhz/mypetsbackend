db.createUser({
    user: "app",
    pwd: "passv0rd",
    roles: [{
        role: "readWrite",
        db: "app"
    }]
});
