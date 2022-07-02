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

issues task management
    scrum board
        designed & optimized for managing scrum itself
            pros
                easy to grasp sprint cycle's progress
            cons
                

issues deployment
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
                Linux user
                    ✓create
                    ✓give appropriate priviledges
                        ✓sudoer
                DevOps toolset
                    install
                        ✓fish
                        ✓nvim
                JavsScript runtime
                    Node.js
                        nvm
                            ✓install
                        ✓handle HTTP request
                            build minimal REST API endpoint
                                create HTTP server instance
                                    install Node.js
                        persist Node web server process
                            set up PM2
                reverse proxy
                    forward requests that arrives at port 80 to internal ports that Node server listens to
                        ?...
                            intall Nginx
                    understand
                        why it's necessary
                            use cases
                            enable HTTPS communication
                                ?SSL certificates
                            ?load balancing
                            ?maximize performance
                                Node is single threaded
                        basic mechanism
                            act as front-end server for Node web server
                deployment automation
                    automatically pull from GitHub-repository
                        on Git push from development environment to GitHub repository
                            setup Git hooks

issues API

issues UI

issues testing API
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
    
issues testing UI

issues deprecated
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

