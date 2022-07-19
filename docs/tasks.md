# tasks

## controlled vocabularies

```text

IP = in progress

```

```text

API
    endpoints
        GET /api/maps
            modularize query string validation logic
            separate route hanlder logic into controller and service
            chain route handlers to increase readability
            authenticate request
    low priority
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

