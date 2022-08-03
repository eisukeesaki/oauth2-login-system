# tasks

## controlled vocabularies

```text

IP = in progress

```

```text

API
    endpoints
        view routes
            ?serve React's /public files
        GET /api/maps
            ✓modularize query string validation logic
            ✓separate route hanlder logic into controller and service
            chain route handlers to increase readability
            authenticate request
    low priority
        session management
            Passport.js
                req.session.passport.user not present after done() in serializeUser callback is called
                req.user not present after passport.authenticate() or req.login() is called
        database
            check if default (publid) schema is appropriate
            automate table seeding
                how to automatically generate and INSERT records that conforms to particular table constrains?
        endpoints
            log response headers and bodies within controller functions

Deployment
    ✓establish deployment flow
        push change to EC2
            deploy minimal HTTP server
                ✓create EC2 instance
                ✓connect development machine's terminal to EC2 instance using ssh
                configure Ubuntu
                    user priviledges
                    toolset
                        install
                            fish
                            nvim
                            Git
                configure Node.js
                    install Node.js

```

