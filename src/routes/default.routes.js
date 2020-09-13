import { Router } from 'express';
const router = Router();

router.all("/", (req, res) => {
    let pkg = req.app.get("pkg");

    res.json({
        application: {
            "name": pkg.name,
            "description": pkg.description,
            "version": pkg.version,
            "author": pkg.author,
            "dependencies": pkg.dependencies.length,
            "dev-dependencies": pkg.devDependencies.length
        },

        server: {
            port: req.app.get("port")
        },

        repository: {
            "host": "github",
            "org": "https://github.com/slicklearn",
            "repo": "https://github.com/slicklearn/rest-api"
        },

        success: true
    })
});

router.all("*", (req, res) => {
    res.json({
        success: false,
        statusCode: 404,
        error: "NOT_FOUND"
    })
})

export default router;