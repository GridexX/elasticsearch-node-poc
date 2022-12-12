#  elasticsearch-node-poc

Simple proof of concept for elasticsearch node.js client

## Testing

This poc is actually deployed under https://poc-elastic.gridexx.fr

It simply shows how to search Polycode `contents` with simple request.

Content is a simple json object, really close from the one we use in our project.

ElasticSearch matches query by relevance score (https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html#relevance-scores).

In this POC, we use the `NAME` and the `DESCRIPTION` fields to search for contents as query parameters :

With those parameters, you can search for contents with the following request:
- GET `https://poc-elastic.gridexx.fr/content?name=react`
- GET `https://poc-elastic.gridexx.fr/content?description=days`

You can also filter contents by author and tags:
- GET `https://poc-elastic.gridexx.fr/content?tags=programming`
- GET `https://poc-elastic.gridexx.fr/content?author=gridexx`

Finally, you can perform for a query matching overall several fields by using the `search` query parameter. It will match the query against the `NAME`, `DESCRIPTION`, `AUTHOR` and `TAGS` fields.
- GET `https://poc-elastic.gridexx.fr/content?search=react`

**Examples** 

- `https://poc-elastic.gridexx.fr/content?tags=programming&name=Golang`

```json
[
    {
        "_index": "content",
        "_id": "2fzZAIUBnz8EDMOWvarJ",
        "_score": 1.0417082,
        "_ignored": [
            "rootComponent.data.components.data.keyword"
        ],
        "_source": {
            "name": "Golang lessons",
            "description": "In this lesson , you will learn the basics of Golang. From functions to types, and many more, check this course to learn Golang",
            "tags": [
                "golang",
                "programming"
            ],
            "author": "Polycode",
            "type": "exercise",
            "reward": 0,
            "rootComponent": {
                "type": "container",
                "data": {
                    "components": [
                        {
                            "name": "First Lesson",
                            "description": "",
                            "type": "markdown",
                            "reward": 0,
                            "data": "Golang is a statically-typed and procedural programming language having syntax similar to C language. It was developed in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson at Google. But they launched it in 2009 as an open-source programming language. It provides a rich standard library, garbage collection, and dynamic-typing capability and also provides support for the environment adopting patterns alike to dynamic languages. The latest version of the Golang is 1.13.1 released on 3rd September 2019. Here, we are providing a complete tutorial of Golang with proper examples."
                        }
                    ]
                }
            },
            "id": "662175db-5a03-43f5-a1ca-4105c9343335"
        }
    }
]
```

- `https://poc-elastic.gridexx.fr/content?tags=programming`

```json
[
    {
        "_index": "content",
        "_id": "2PzZAIUBnz8EDMOWvarJ",
        "_score": 0,
        "_source": {
            "name": "Rust Day 1",
            "author": "GridexX",
            "description": "Learn Rust in 10 days, this is the 1st.",
            "type": "exercise",
            "tags": [
                "rust",
                "programming"
            ],
            "reward": 500,
            "rootComponent": {
                "type": "container",
                "data": {
                    "components": [
                        {
                            "name": "Exercice 1",
                            "description": "",
                            "type": "markdown",
                            "reward": 500,
                            "data": "This is the first exercice of Rust. You should display a 'Hello World!' in the console"
                        }
                    ],
                    "validators": [
                        {
                            "isHidden": true,
                            "expected": {
                                "stdout": [
                                    "Hello World!"
                                ],
                                "checked": true
                            },
                            "input": {
                                "stdin": [
                                    ""
                                ],
                                "id": "Unknown Type: uuid"
                            }
                        }
                    ]
                }
            },
            "id": "3856bd07-02a6-4b43-8a85-62337d45da93"
        }
    },
    {
        "_index": "content",
        "_id": "2fzZAIUBnz8EDMOWvarJ",
        "_score": 0,
        "_ignored": [
            "rootComponent.data.components.data.keyword"
        ],
        "_source": {
            "name": "Golang lessons",
            "description": "In this lesson , you will learn the basics of Golang. From functions to types, and many more, check this course to learn Golang",
            "tags": [
                "golang",
                "programming"
            ],
            "author": "Polycode",
            "type": "exercise",
            "reward": 0,
            "rootComponent": {
                "type": "container",
                "data": {
                    "components": [
                        {
                            "name": "First Lesson",
                            "description": "",
                            "type": "markdown",
                            "reward": 0,
                            "data": "Golang is a statically-typed and procedural programming language having syntax similar to C language. It was developed in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson at Google. But they launched it in 2009 as an open-source programming language. It provides a rich standard library, garbage collection, and dynamic-typing capability and also provides support for the environment adopting patterns alike to dynamic languages. The latest version of the Golang is 1.13.1 released on 3rd September 2019. Here, we are providing a complete tutorial of Golang with proper examples."
                        }
                    ]
                }
            },
            "id": "662175db-5a03-43f5-a1ca-4105c9343335"
        }
    }
]
```

Here is an example of a content:

```json
{
      "name": "Golang lessons",
      "description": "In this lesson , you will learn the basics of Golang. From functions to types, and many more, check this course to learn Golang",
      "tags": [
          "golang",
          "programming"
      ],
      "author": "Polycode",
      "type": "exercise",
      "reward": 0,
      "rootComponent": {
          "type": "container",
          "data": {
              "components": [
                  {
                      "name": "First Lesson",
                      "description": "",
                      "type": "markdown",
                      "reward": 0,
                      "data": "Golang is a statically-typed and procedural programming language having syntax similar to C language. It was developed in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson at Google. But they launched it in 2009 as an open-source programming language. It provides a rich standard library, garbage collection, and dynamic-typing capability and also provides support for the environment adopting patterns alike to dynamic languages. The latest version of the Golang is 1.13.1 released on 3rd September 2019. Here, we are providing a complete tutorial of Golang with proper examples."
                  }
              ]
          }
      },
      "id": "662175db-5a03-43f5-a1ca-4105c9343335"
  }

```



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

###  Installation

```bash
npm install
```

###  Usage

```bash
npm start
```

### Deploy

```bash
docker compose up --build -d 
```


## Authors
Build with ❤️ by [GridexX](github.com/GridexX)