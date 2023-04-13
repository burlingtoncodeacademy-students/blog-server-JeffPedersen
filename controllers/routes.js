// TODO ROUTES
/*  [x] get - display all comments from db
    [x] get - one comment via post_id
    [x] post - add new to .json file
    [x] put - update an entry
        - done via query parameter
    [x] delete - axe one from the .json file
    This code was completed in the national portrait gallery 
    https://npg.si.edu/sites/default/files/kogod_courtyard_slideshow1_0.jpg
    [x] - FIX WHY NO START - module.exports = router at the end
    [x] - FIX 4003 in use - Solved by closing extra terminals I had running in VSCODE
    [x] - [Error: ENOENT: no such file or directory, open '../api/blog.json']
        - remove extra dot in front of path from fsPath
    [x] - res.status is not a function
        - attempted input of middleware on app.js "app.use(express.json());" unsuccessfully
        - fixed by because req and res switched places (https://stackoverflow.com/questions/44176021/node-js-res-send-is-not-a-function)
    [x] test all endpoints in POSTMAN
*/

const router = require("express").Router();
const db = require("../api/blog.json");
const fs = require("fs");
const fsPath = "./api/blog.json";

// GET all
// http://localhost:4000/blog
router.get("/", (req, res) => {
    try {
        res.status(200).json({
            results: db
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// GET one by id - read
// http://localhost:4000/blog/1
router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;
        let blog = db.filter(obj => obj.id == id);
        res.status(200).json({
            status: `Found blog at id ${id}`, 
            blog,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// POST new one
// http://localhost:4000/blog/create
router.post("/create", (req, res) => {
    try{
        let { title, author, body } = req.body;
        let newId = db.length +1;
        console.log(req.body);
        const newBlog = {
            id: newId,
            title, 
            author,
            body,
        };
        fs.readFile(fsPath, (err, data) => {
            if (err) throw err;
            const database = JSON.parse(data);
            let currentIDs = [];
        });
        if (currentIDs.include(newId)) {
            let maxValue = Math.max(...currentIds);
            newId = maxValue +1;
            newBlog.id = newId;
        }
        database.push(newBlog);
        fs.writeFile(fsPath, JSON.stringify(database), (err) => console.log(err));
        res.status(200).json({
            status: `New blog created ${newBlog.name}`,
            newBlog,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

//! PUT ===============================================
// http://localhost:4000/blog/2
router.put("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const updatedInfo = req.body;

        fs.readFile(fsPath, (err, data) => {
            if (err) throw eww;
            const database = JSON.parse(data);

            let blog;

            database.forEach((obj, i) => {
                if (obj.id === id) {
                    let buildObj = {};
                    for (key in obj) {

                        if (updatedInfo[key]) {
                            console.log('Checked')
                            buildObj[key] = updatedInfo[key];
                        } else {
                            buildObj[key] = obj[key];
                        }

                    }

                    database[i] = buildObj;
                    blog = buildObj;
                }
            });
            // Error if the id isn't in the DB 
            if (Object.keys(blog).length <= 0) res.status(404).json({ message: "No blog in db" });

            fs.writeFile(fsPath, JSON.stringify(database), err => console.log(err));

            res.status(200).json({
                status: `Modified blog at id: ${id}`,
                blog: blog
            })

        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// DELETE one by id 
// http://localhost:4003/blog
router.delete("/:id", (req, res) => {
    try {
        const id = Number(req.params.id); 
        fs.readFile(fsPath, (err,data) => {
            if (err) throw err;

            const db = JSON.parse(data);

            const filterDB = db.filter(i => i.id !== id);
            fs.writeFile(fsPath, JSON.stringify(filterDB), err => console.log(err));
            res.status(200).json({
                status: `blog ${id} was successfully deleted.`
            });
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router ;