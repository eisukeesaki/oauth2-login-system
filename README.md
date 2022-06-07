# MindNet API

An web API for a mind map application. Create/browse private/public/open-source mind maps.

## Table of contents

- [my mind maping style](#my-mind-mapping-style)
- [features](#features)
- [resources](#resources)
- [other ideas](#other-ideas)

## my mind mapping style

In this file, I will be using mind maps to document my ideas, issues, and tasks for this project.
Which means that I'm using mind maps to build a mind map application... How strange and exciting!

Here's how my mind maps are structured.

```text

my mind maps
    collection
        nodes
            representations of relations
                horizontal arrangement
                    parent node
                        contains child
                        abstracts child
                        owns child
                        consists of child
                    child node
                        is contained within parent
                        specifies parent
                        is owned by parent
                        constitues parent
                vertical arrangement
                    node above
                        more abstract
                    node below
                        more specific
                    not always considred
                        just like in this case

```

## features

```text

features
    user registration
    user authentication
    CRUD maps
        create
            select privacy
                private
                public
                open source
        view
            own
            other users'
                public
                open source
        edit
            own
            CRUD nodes
                link node to external maps
                    own
                    other users'
                        public
                        open source
        delete
            own
    search maps
        scopes
            own
            public
                open source
    pull request maps
        send
        merge
    fully manipulatable with keyboard

```

## resources

```text

resources
    tables
        nodes
            record
                node
                    columns
                        unique identifier
                            integer
                            primary key
                        content
                            string
                        reference
                            parent node
                                unique node identifier
                        references
                            child nodes
                                reference
                                    child node
                                      unique node identifier
                                reference
                                    child node
                                      unique node identifier
                                reference
                                    child node
                                      unique node identifier
                                ...
                        timestamps
                            created at
                                date/time
                            updated at
                                date/time
                      representation
                          Content-Type: application/json
                              {
                                "id": 0,
                                "content": "this is a main node",
                                "parent": null,
                                "children" [
                                  {
                                    "id": 1,
                                    "content": "I'm a chlid of node-id 0",
                                    "parent": 0,
                                    "children" [
                                      {
                                        "id": 3,
                                        "content": "I'm a chlid of node-id 1",
                                        "parent": 0,
                                        "children" [{ ... }, ...],
                                        "createdAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                        "updatedAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                      },
                                      {
                                        "id": 4,
                                        "content": "I'm a chlid of node-id 1",
                                        "parent": 0,
                                        "children" [{ ... }, ...],
                                        "createdAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                        "updatedAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                      },
                                      ...
                                    ],
                                    "createdAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                    "updatedAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                  },
                                  {
                                     "id": 2,
                                     "content": "I'm a chlid of node-id 0",
                                     "parent": 0,
                                     "children" [{ ... }, ...],
                                     "createdAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                     "updatedAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                  },
                                  ...
                                ],
                                "createdAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                                "updatedAt": "YYYY-MM-DD HH:MM:SS -/+H:00"
                              }

```

## other ideas

```text

node
    sibilings
        [{ node }, { node }, { node }]

```
