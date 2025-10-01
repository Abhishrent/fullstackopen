## 0.4: new note

```mermaid
    sequenceDiagram
    participant client
    participant server
    
    client->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>client: redirection request (Status code: 302)
    deactivate server
    Note right of client: The browser reloads the notes page
    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>client: html document
    deactivate server
    

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>client: the css file
    deactivate server
    
    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>client: the JavaScript file
    deactivate server
    
    Note right of client: The browser starts executing the JavaScript code that fetches the JSON from the server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>client: [{ "content": "new note", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of client: The browser executes the callback function that renders the notes
```

## 0.5: Single Page App

```mermaid
    sequenceDiagram
    participant client
    participant server
    
    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>client: html document
    deactivate server
    

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>client: the css file
    deactivate server
    
    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>client: the JavaScript file
    deactivate server
    
    Note right of client: The browser starts executing the JavaScript code that fetches the JSON from the server

    client->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>client: [{ "content": "new note", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of client: The browser executes the callback function that renders the notes
```

## 0.6: New note
```mermaid
    sequenceDiagram
    participant client
    participant server

    client->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of client: The data included in the request is in json format already.
    activate server
    server-->>client: The browser renders the note
    Note right of client: The browser uses the corrsponding JS code to do so.