# issues

```text

issues
    data
        serialization
            how to serialize data in request?
            how to desrialize data retrieved from database?

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
                ✓Linux user
                    ✓create
                    ✓give appropriate priviledges
                        ✓sudoer
                ✓DevOps toolset
                    install
                        ✓fish
                        ✓nvim
                ✓JavsScript runtime
                    Node.js
                        nvm
                            ✓install
                            ✓set default node version to "use" in shell
                        ✓handle HTTP request
                            build minimal REST API endpoint
                                create HTTP server instance
                                    install Node.js
                        persist Node web server process
                            set up PM2
                database
                    ✓run test query from Node app
                        AWS Relational Database Service
                            ?start instance
                            AWS Aurora
                                ?create cluster
                                ?connect interface to cluster
                                    ?web UI
                                    CLI
                                    node-postgres
                                PostgreSQL
                point domain name to EC2 instance
                ?reverse proxy
                    forward requests that arrives at port 80 to internal ports that Node server listens to
                        ?...
                            intall Nginx
                    understand
                        what problem it solves
                            enable HTTPS communication
                                ?SSL certificates
                            ?load balancing
                            ?maximize performance
                                Node is single threaded
                        basic mechanism
                            act as front-end server for Node web server
                ?containerization
                    ?containerize application
                        ?
                            ?Dockerization
                            ?docker-compose
                    understand
                        what problem it solves
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

issues
    ✓define minimum viable product
        ✓inform UI team

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

