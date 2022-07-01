# issues

```text

issues
    ✓define minimum viable product
        ✓inform UI team
    UI flow
    deployment flow 
        establish
    entity relation diagrams
    data model specifications

issues-deployment
    EC2
        instance
            ✓create AMI
                ✓minimum configuration to start and connect to instance
                in-depth configurations
                    apply best practices
                        Security
                        Storage
                        Resource management
                        Backup and recovery
                        Networking
            ✓start
            ✓connect
                ssh
            Ubuntu server
                configure
                    user
                        ✓create
                        give appropriate priviledges
                            ?sudoer
                    toolset
                        fish
                            install
                        nvim
                        ?Git
                Node.js
                    HTTP server instance
                        handle requests
                            build minimal REST API endpoint
                                install Node.js
                        persist
                            ?PM2

issues-testing
    API
        routing tests
            input
                HTTP message
                    header
                        HTTP method
                        URI
                        query parameters
                    payload
            output
                HTTP message
                    header
                    payload
        unit tests
            route handlers
            helpers
        ...
    UI

issues-deprecated
    CI/CD pipeline
        concerns
            worth the cost to setup?
                no experience
                    requires comprehensive knowledge
                        about a particular software engineering methodology
                        highly costly
                            time
                    very difficult to estimate cost upfront
                difference
                    learn
                        usage
                        configuration
                        maintenance
                        
```

