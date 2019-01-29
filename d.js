

function requireRole (role) {
    return function (req, res, next) {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.send(403);
        }
    }
}

app.get("/index", index.index);
app.get("/index/:id", requireRole("user"), index.show);
app.post("/index", requireRole("admin"), index.create);

app.all("/index/bar", requireRole("admin"));

app.all("/index/bar/*", requireRole("user"));

