# API resources

```text

API resources
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

