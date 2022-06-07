# MindNet API

A mind map application. Create/browse private/public/open-source mind maps.

## Table of contents

- [my mind maping style](#my-mind-mapping-style)

## my mind mapping style

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
    nodes
        node
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

```

